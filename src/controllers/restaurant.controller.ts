import type { Request, Response } from 'express';
import prisma from "../../prisma/client";


export const getRestaurant = async (req: Request, res: Response) => {
    try {
        const restaurant = await prisma.restaurant.findUnique({
            where: {
                id: parseInt(req.params.id)
            },
            include: {
                menu: {
                    include: {
                        dishes: {
                            include: {
                                ingredients: true
                            }
                        }
                    }
                }
            }
        });

        if (!restaurant) {
            return res.status(404).send('Restaurant not found');
        }

        res.render('restaurant', { restaurant });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
