import { NextRequest, NextResponse } from 'next/server';
import { exportAsJSON, exportAsText } from '@/utils/pdfGenerator';
import { errorResponse, serverErrorResponse } from '@/lib/response';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cv, format } = body;

    if (!cv) {
      return errorResponse('No CV data provided', 'CV data is required', 400);
    }

    if (format === 'json') {
      const jsonStr = exportAsJSON(cv);
      return new NextResponse(jsonStr, {
        headers: {
          'Content-Type': 'application/json',
          'Content-Disposition': 'attachment; filename="cv.json"',
        },
      });
    }

    if (format === 'text' || format === 'txt') {
      const text = exportAsText(cv);
      return new NextResponse(text, {
        headers: {
          'Content-Type': 'text/plain',
          'Content-Disposition': 'attachment; filename="cv.txt"',
        },
      });
    }

    return errorResponse(
      'Invalid format',
      'Supported formats: json, text. PDF export is done client-side.',
      400
    );
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error : new Error('Unknown error');
    return serverErrorResponse(errorMsg, 'Export failed');
  }
}
