import { Request, Response } from 'express';
import prisma from '../../shared/database';

export const getGlobalSettings = async (req: Request, res: Response) => {
  try {
    let settings = await prisma.globalSetting.findUnique({
      where: { id: 'site-settings' }
    });

    if (!settings) {
      settings = await prisma.globalSetting.create({
        data: {
          id: 'site-settings',
          primaryColor: '#ea580c',
          secondaryColor: '#2563eb',
          siteName: 'Lumina Digital Agency'
        }
      });
    }

    res.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ message: 'Error fetching global settings' });
  }
};

export const updateGlobalSettings = async (req: Request, res: Response) => {
  try {
    const { primaryColor, secondaryColor, siteName } = req.body;
    
    const settings = await prisma.globalSetting.upsert({
      where: { id: 'site-settings' },
      update: { primaryColor, secondaryColor, siteName },
      create: { 
        id: 'site-settings',
        primaryColor: primaryColor || '#ea580c',
        secondaryColor: secondaryColor || '#2563eb',
        siteName: siteName || 'Lumina Digital Agency'
      }
    });

    res.json(settings);
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ message: 'Error updating global settings' });
  }
};
