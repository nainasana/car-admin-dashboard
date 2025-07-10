import { NextRequest, NextResponse } from 'next/server';
import db from '../../db';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const listing = db.prepare('SELECT * FROM listings WHERE id = ?').get(id);
  if (!listing) {
    return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
  }
  return NextResponse.json({ listing });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await req.json();
  
  const stmt = db.prepare('UPDATE listings SET title = ?, description = ?, price = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?');
  const info = stmt.run(data.title, data.description, data.price, data.status, id);
  
  if (info.changes === 0) {
    return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
  }
  
  // Log the edit action
  const logStmt = db.prepare('INSERT INTO audit_logs (listing_id, action, admin) VALUES (?, ?, ?)');
  logStmt.run(id, 'edited', data.admin || 'admin');
  
  const listing = db.prepare('SELECT * FROM listings WHERE id = ?').get(id);
  return NextResponse.json({ listing });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const stmt = db.prepare('DELETE FROM listings WHERE id = ?');
  const info = stmt.run(id);
  if (info.changes === 0) {
    return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
  }
  return NextResponse.json({ message: 'Listing deleted' });
} 