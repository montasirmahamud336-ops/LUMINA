import { Server as SocketIOServer } from 'socket.io';
import { Server as HttpServer } from 'http';
import { verifyAccessToken } from './utils/tokens';
import prisma from './database';

export function setupWebSockets(server: HttpServer) {
  const io = new SocketIOServer(server, {
    cors: {
      origin: '*', // In production, restrict this
      methods: ['GET', 'POST']
    }
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error('Authentication error'));
    
    try {
      const decoded = verifyAccessToken(token) as any;
      (socket as any).userId = decoded.userId;
      next();
    } catch (err) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    const userId = (socket as any).userId;
    console.log(`User connected: ${userId}`);
    socket.join(userId);

    socket.on('send_message', async (data) => {
      const { conversationId, content, type, fileUrl } = data;
      
      try {
        const message = await prisma.message.create({
          data: {
            conversationId,
            senderId: userId,
            content,
            type,
            fileUrl
          },
          include: { sender: { select: { name: true, avatar: true } } }
        });

        // Get conversation participants to notify
        const conversation = await prisma.conversation.findUnique({
          where: { id: conversationId },
          include: { participants: { select: { id: true } } }
        });

        if (conversation) {
          conversation.participants.forEach(p => {
            io.to(p.id).emit('new_message', message);
          });
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${userId}`);
    });
  });

  return io;
}
