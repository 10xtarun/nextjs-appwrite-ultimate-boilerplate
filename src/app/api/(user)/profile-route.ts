// Profile API route - placeholder as per structure
// TODO: Implement profile logic
import { NextRequest, NextResponse } from 'next/server';

// eslint-disable-next-line
export async function GET(req: NextRequest) {
  return NextResponse.json(
    { error: null, data: null, message: 'Profile not implemented' },
    { status: 501 },
  );
}
