import { NextRequest, NextResponse } from 'next/server';
import db from '../../../db';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { admin } = await req.json();
  
  // Update listing status
  const updateStmt = db.prepare('UPDATE listings SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?');
  const updateInfo = updateStmt.run('approved', id);
  
  if (updateInfo.changes === 0) {
    return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
  }
  
  // Log the action
  const logStmt = db.prepare('INSERT INTO audit_logs (listing_id, action, admin) VALUES (?, ?, ?)');
  logStmt.run(id, 'approved', admin);
  
  const listing = db.prepare('SELECT * FROM listings WHERE id = ?').get(id);
  return NextResponse.json({ listing });
} 