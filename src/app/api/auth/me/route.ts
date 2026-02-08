import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth';
import { successResponse, unauthorizedResponse, serverErrorResponse } from '@/lib/response';

export async function GET(request: NextRequest) {
  try {
    // Extract token from Authorization header
    const authHeader = request.headers.get('authorization');
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      return unauthorizedResponse('No authentication token provided');
    }

    // Verify token
    const decoded = verifyToken(token);
    if (!decoded) {
      return unauthorizedResponse('Invalid or expired token');
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return unauthorizedResponse('User not found');
    }

    return successResponse(
      { user },
      'User retrieved successfully'
    );
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error : new Error('Unknown error');
    return serverErrorResponse(errorMsg, 'Failed to retrieve user');
  }
}
