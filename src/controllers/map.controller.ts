import { Request, Response } from 'express';
import prisma from '../../prisma/client';

export const showMap = async (req: Request, res: Response): Promise<void> => {
  const idParam = req.query.restaurantId as string | undefined;
  const restaurantId = idParam ? parseInt(idParam, 10) : undefined;

  if (!restaurantId) {
    res.status(400).send('No restaurantId provided');
    return;
  }

  const restaurant = await prisma.restaurant.findUnique({
    where: { id: restaurantId },
    select: { latitude: true, longitude: true, name: true }
  });

  if (!restaurant) {
    res.status(404).send('Restaurant not found');
    return;
  }

  res.render('map', {
    resto: {
      lat: restaurant.latitude,
      lng: restaurant.longitude,
      name: restaurant.name
    }
  });
};
