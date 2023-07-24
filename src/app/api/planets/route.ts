import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';
export async function GET(request: Request) {
  const client = await clientPromise;
  const db = client.db('sample_guides');
  const planets = await db.collection('planets').find().toArray();
  return NextResponse.json({ planets });
}
