import { NextRequest } from 'next/server';
import { analyzeATS } from '@/utils/atsAnalyzer';
import { successResponse, errorResponse, serverErrorResponse } from '@/lib/response';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cv } = body;

    if (!cv) {
      return errorResponse('No CV data provided', 'CV data is required', 400);
    }

    // Analyze CV for ATS compatibility
    const result = analyzeATS(cv);

    return successResponse(
      { analysis: result },
      'ATS analysis completed successfully'
    );
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error : new Error('Unknown error');
    return serverErrorResponse(errorMsg, 'Failed to analyze CV');
  }
}
