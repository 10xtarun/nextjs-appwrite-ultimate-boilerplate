// Login API route - placeholder as per structure
// TODO: Implement login logic
import { NextRequest, NextResponse } from 'next/server';

// eslint-disable-next-line
export async function POST(req: NextRequest) {
  return NextResponse.json(
    { error: null, data: null, message: 'Login not implemented' },
    { status: 501 },
  );
}
