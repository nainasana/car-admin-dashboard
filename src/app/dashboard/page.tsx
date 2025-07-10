'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import ListingsTable from '@/components/ListingsTable';
import EditModal from '@/components/EditModal';

type Listing = {
  id: number;
  title: string;
  description: string;
  price: number;
  status: string;
  created_at: string;
  updated_at: string;
};

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchListings();
  }, [user]);

  const fetchListings = async () => {
    try {
      const response = await fetch('/api/listings');
      const data = await response.json();
      setListings(data.listings || []);
    } catch (err) {
      setError('Failed to fetch listings');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: number) => {
    try {
      const response = await fetch(`/api/listings/${id}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ admin: user?.username || 'admin' })
      });
      if (response.ok) {
        fetchListings();
      }
    } catch (err) {
      setError('Failed to approve listing');
    }
  };

  const handleReject = async (id: number) => {
    try {
      const response = await fetch(`/api/listings/${id}/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ admin: user?.username || 'admin' })
      });
      if (response.ok) {
        fetchListings();
      }
    } catch (err) {
      setError('Failed to reject listing');
    }
  };

  const handleEdit = (listing: Listing) => {
    setSelectedListing(listing);
    setShowEditModal(true);
  };

  const handleEditSave = async (updatedListing: Partial<Listing>) => {
    if (!selectedListing) return;
    
    try {
      const response = await fetch(`/api/listings/${selectedListing.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...updatedListing, 
          admin: user?.username || 'admin'
        })
      });
      if (response.ok) {
        setShowEditModal(false);
        setSelectedListing(null);
        fetchListings();
      }
    } catch (err) {
      setError('Failed to update listing');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Car Listings Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Welcome, {user?.username || 'Admin'}</span>
            <button
              onClick={() => router.push('/audit-logs')}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              View Audit Logs
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <ListingsTable
          listings={listings}
          onApprove={handleApprove}
          onReject={handleReject}
          onEdit={handleEdit}
        />

        {showEditModal && selectedListing && (
          <EditModal
            listing={selectedListing}
            onSave={handleEditSave}
            onClose={() => {
              setShowEditModal(false);
              setSelectedListing(null);
            }}
          />
        )}
      </div>
    </div>
  );
} 