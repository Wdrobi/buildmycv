import { NextResponse } from "next/server";

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// Success response
export function successResponse<T>(
  data: T,
  message: string = "Success",
  status: number = 200
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
    },
    { status }
  );
}

// Error response
export function errorResponse(
  error: string,
  message: string = "Error",
  status: number = 400
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      message,
      error,
    },
    { status }
  );
}

// Not found response
export function notFoundResponse(
  message: string = "Resource not found"
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      message,
      error: "NOT_FOUND",
    },
    { status: 404 }
  );
}

// Unauthorized response
export function unauthorizedResponse(
  message: string = "Unauthorized"
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      message,
      error: "UNAUTHORIZED",
    },
    { status: 401 }
  );
}

// Forbidden response
export function forbiddenResponse(
  message: string = "Forbidden"
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      message,
      error: "FORBIDDEN",
    },
    { status: 403 }
  );
}

// Server error response
export function serverErrorResponse(
  error: Error | string,
  message: string = "Internal server error"
): NextResponse<ApiResponse> {
  const errorMessage =
    error instanceof Error ? error.message : String(error);
  console.error("Server error:", errorMessage);

  return NextResponse.json(
    {
      success: false,
      message,
      error: errorMessage,
    },
    { status: 500 }
  );
}
