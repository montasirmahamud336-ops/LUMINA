import express from 'express';
import prisma from '../../shared/database';

const router = express.Router();

// Get all published services
router.get('/', async (req, res) => {
  try {
    const services = await prisma.service.findMany({
      where: { published: true },
      orderBy: { createdAt: 'asc' }
    });
    res.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: 'Error fetching services' });
  }
});

// Get service by slug
router.get('/:slug', async (req, res) => {
  try {
    const service = await prisma.service.findUnique({
      where: { slug: req.params.slug }
    });
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching service details' });
  }
});

// Admin: Create service
router.post('/', async (req, res) => {
  try {
    const { name, slug, iconName, shortDescription, longDescription, processJson, featuresJson, image } = req.body;
    const service = await prisma.service.create({
      data: { name, slug, iconName, shortDescription, longDescription, processJson: JSON.stringify(processJson), featuresJson: JSON.stringify(featuresJson), image }
    });
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: 'Error creating service' });
  }
});

// Admin: Update service
router.put('/:id', async (req, res) => {
  try {
    const { name, slug, iconName, shortDescription, longDescription, processJson, featuresJson, image, published } = req.body;
    const service = await prisma.service.update({
      where: { id: req.params.id },
      data: { name, slug, iconName, shortDescription, longDescription, processJson: typeof processJson === 'string' ? processJson : JSON.stringify(processJson), featuresJson: typeof featuresJson === 'string' ? featuresJson : JSON.stringify(featuresJson), image, published }
    });
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: 'Error updating service' });
  }
});

// Admin: Delete service
router.delete('/:id', async (req, res) => {
  try {
    await prisma.service.delete({ where: { id: req.params.id } });
    res.json({ message: 'Service deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting service' });
  }
});

export default router;
