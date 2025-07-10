import { NextRequest, NextResponse } from 'next/server';
import db, { initDb } from '../db';

initDb();

export async function GET() {
  const listings = db.prepare('SELECT * FROM listings ORDER BY created_at DESC').all();
  return NextResponse.json({ listings });
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const stmt = db.prepare('INSERT INTO listings (title, description, price, status) VALUES (?, ?, ?, ?)');
  const info = stmt.run(data.title, data.description, data.price, data.status || 'pending');
  const listing = db.prepare('SELECT * FROM listings WHERE id = ?').get(info.lastInsertRowid);
  return NextResponse.json({ listing });
} 