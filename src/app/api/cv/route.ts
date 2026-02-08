import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth';
import { successResponse, errorResponse, unauthorizedResponse, serverErrorResponse } from '@/lib/response';

// GET all CVs for current user
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      return unauthorizedResponse('No authentication token provided');
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return unauthorizedResponse('Invalid or expired token');
    }

    // Get CVs for authenticated user
    const cvs = await prisma.cV.findMany({
      where: { userId: decoded.userId },
      include: {
        sections: {
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    return successResponse({ cvs }, 'CVs retrieved successfully');
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error : new Error('Unknown error');
    return serverErrorResponse(errorMsg, 'Failed to retrieve CVs');
  }
}

// POST - Create or update CV
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      return unauthorizedResponse('No authentication token provided');
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return unauthorizedResponse('Invalid or expired token');
    }

    const body = await request.json();
    const { id, title, template, sections, metadata } = body;

    // If CV ID provided, update existing CV
    if (id) {
      // Verify user owns this CV
      const existingCV = await prisma.cV.findUnique({
        where: { id },
      });

      if (!existingCV || existingCV.userId !== decoded.userId) {
        return errorResponse('CV not found or unauthorized', 'You do not have permission to update this CV', 403);
      }

      // Delete existing sections
      await prisma.section.deleteMany({
        where: { cvId: id },
      });

      // Update CV with new data
      const updatedCV = await prisma.cV.update({
        where: { id },
        data: {
          title: title || existingCV.title,
          template: template || existingCV.template,
          sections: {
            create: sections?.map((section: any, index: number) => ({
              type: section.type,
              title: section.title,
              content: section.content,
              order: index + 1,
              visible: section.visible !== false,
            })) || [],
          },
        },
        include: {
          sections: { orderBy: { order: 'asc' } },
        },
      });

      return successResponse({ cv: updatedCV }, 'CV updated successfully');
    }

    // Create new CV
    const newCV = await prisma.cV.create({
      data: {
        userId: decoded.userId,
        title: title || 'Untitled CV',
        template: template || 'modern',
        sections: {
          create: sections?.map((section: any, index: number) => ({
            type: section.type,
            title: section.title,
            content: section.content,
            order: index + 1,
            visible: section.visible !== false,
          })) || [],
        },
      },
      include: {
        sections: { orderBy: { order: 'asc' } },
      },
    });

    return successResponse({ cv: newCV }, 'CV created successfully', 201);
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error : new Error('Unknown error');
    return serverErrorResponse(errorMsg, 'Failed to save CV');
  }
}
