import { Response } from 'express';
import { AuthRequest } from '../../shared/middleware/auth';
import prisma from '../../shared/database';

export const createRequest = async (req: AuthRequest, res: Response) => {
  try {
    const { content } = req.body;
    const userId = req.user!.userId;

    const request = await prisma.request.create({
      data: {
        userId,
        content,
        status: 'PENDING'
      }
    });

    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ message: 'Error creating request' });
  }
};

export const getMyRequests = async (req: AuthRequest, res: Response) => {
  try {
    const requests = await prisma.request.findMany({
      where: { userId: req.user!.userId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching requests' });
  }
};

export const getAllRequests = async (req: AuthRequest, res: Response) => {
  try {
    const requests = await prisma.request.findMany({
      include: { user: { select: { name: true, email: true } } },
      orderBy: { createdAt: 'desc' }
    });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching all requests' });
  }
};

export const updateRequestStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status, adminResponse } = req.body;

    const request = await prisma.request.update({
      where: { id },
      data: { status, adminResponse }
    });

    // Notify user (could be via WebSocket or just in DB)
    await prisma.notification.create({
      data: {
        userId: request.userId,
        title: `Request ${status.toLowerCase()}`,
        content: adminResponse || `Your request has been ${status.toLowerCase()}.`,
        type: 'REQUEST_UPDATE'
      }
    });

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: 'Error updating request' });
  }
};
