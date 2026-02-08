import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, generateToken } from '@/lib/auth';
import { successResponse, errorResponse, serverErrorResponse } from '@/lib/response';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    // Validate input
    if (!email || !password || !name) {
      return errorResponse(
        'Missing required fields',
        'Email, password, and name are required',
        400
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return errorResponse('Invalid email format', 'Please provide a valid email', 400);
    }

    // Validate password strength
    if (password.length < 6) {
      return errorResponse(
        'Password too short',
        'Password must be at least 6 characters',
        400
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return errorResponse(
        'User already exists',
        'An account with this email already exists',
        409
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    // Generate token
    const token = generateToken(user.id, user.email);

    return successResponse(
      {
        user,
        token,
      },
      'User registered successfully',
      201
    );
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error : new Error('Unknown error');
    return serverErrorResponse(errorMsg, 'Registration failed');
  }
}
