import { NextRequest, NextResponse } from 'next/server';
import db from '../db';

export async function GET(req: NextRequest) {
  const logs = db.prepare(`
    SELECT 
      al.id,
      al.listing_id,
      al.action,
      al.admin,
      al.timestamp,
      l.title as listing_title
    FROM audit_logs al
    LEFT JOIN listings l ON al.listing_id = l.id
    ORDER BY al.timestamp DESC
  `).all();
  
  return NextResponse.json({ logs });
} 