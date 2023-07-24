import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';
export async function GET(request: Request) {
  const client = await clientPromise;
  const db = client.db('park_dev');
  const facilities = await db.collection('facilities').find().toArray();
  return NextResponse.json({ facilities });
}
