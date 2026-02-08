import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Clear auth token
  return NextResponse.json({
    success: true,
    message: 'Logged out successfully',
  });
}
