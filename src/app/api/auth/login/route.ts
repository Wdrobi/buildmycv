import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { comparePassword, generateToken } from '@/lib/auth';
import { successResponse, errorResponse, serverErrorResponse, unauthorizedResponse } from '@/lib/response';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return errorResponse(
        'Missing required fields',
        'Email and password are required',
        400
      );
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
      },
    });

    if (!user) {
      return unauthorizedResponse('Invalid email or password');
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return unauthorizedResponse('Invalid email or password');
    }

    // Generate token
    const token = generateToken(user.id, user.email);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return successResponse(
      {
        user: userWithoutPassword,
        token,
      },
      'Login successful'
    );
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error : new Error('Unknown error');
    return serverErrorResponse(errorMsg, 'Login failed');
  }
}
