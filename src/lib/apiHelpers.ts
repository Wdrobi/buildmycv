/**
 * API Response Helper Functions
 */

import { NextResponse } from 'next/server';
import { APIResponse } from '@/types/api';

export const successResponse = <T,>(
  data: T,
  message: string = 'Success'
): NextResponse<APIResponse<T>> => {
  return NextResponse.json({
    success: true,
    data,
    message,
  });
};

export const errorResponse = (
  error: string,
  status: number = 400
): NextResponse<APIResponse> => {
  return NextResponse.json(
    {
      success: false,
      error,
    },
    { status }
  );
};

export const createdResponse = <T,>(
  data: T,
  message: string = 'Created successfully'
): NextResponse<APIResponse<T>> => {
  return NextResponse.json(
    {
      success: true,
      data,
      message,
    },
    { status: 201 }
  );
};
