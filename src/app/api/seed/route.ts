import { NextRequest, NextResponse } from 'next/server';
import db, { initDb } from '../db';

initDb();

export async function POST(req: NextRequest) {
  const sampleListings = [
    {
      title: '2020 Toyota Camry',
      description: 'Excellent condition, low mileage, perfect for daily commute',
      price: 25000,
      status: 'pending'
    },
    {
      title: '2019 Honda Civic',
      description: 'Well maintained, great fuel economy, reliable transportation',
      price: 22000,
      status: 'approved'
    },
    {
      title: '2021 Ford Mustang',
      description: 'Sporty performance car, premium features, leather interior',
      price: 35000,
      status: 'rejected'
    },
    {
      title: '2018 BMW 3 Series',
      description: 'Luxury sedan, advanced technology, comfortable ride',
      price: 28000,
      status: 'pending'
    },
    {
      title: '2020 Tesla Model 3',
      description: 'Electric vehicle, autopilot, zero emissions',
      price: 45000,
      status: 'approved'
    }
  ];

  const stmt = db.prepare('INSERT INTO listings (title, description, price, status) VALUES (?, ?, ?, ?)');
  
  for (const listing of sampleListings) {
    stmt.run(listing.title, listing.description, listing.price, listing.status);
  }

  return NextResponse.json({ message: 'Database seeded with sample data' });
} 