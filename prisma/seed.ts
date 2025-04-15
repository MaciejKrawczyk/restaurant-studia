import {PrismaClient} from '../generated/prisma'

const prisma = new PrismaClient()

async function main() {
    const restaurants = [
        {
            name: "Pierogi Palace",
            latitude: 50.0647,
            longitude: 19.9450,
            dishes: [
                {
                    name: "Pierogi Ruskie",
                    timeToPrepare: 25,
                    ingredients: ["Potato", "Onion", "Cottage Cheese", "Flour"]
                },
                {
                    name: "Pierogi z Mięsem",
                    timeToPrepare: 30,
                    ingredients: ["Ground Pork", "Onion", "Flour", "Butter"]
                },
                {
                    name: "Pierogi z Kapustą i Grzybami",
                    timeToPrepare: 35,
                    ingredients: ["Sauerkraut", "Mushrooms", "Onion", "Flour"]
                },
                {
                    name: "Pierogi z Jagodami",
                    timeToPrepare: 20,
                    ingredients: ["Blueberries", "Flour", "Sugar", "Sour Cream"]
                },
                {
                    name: "Żurek",
                    timeToPrepare: 45,
                    ingredients: ["Sour Rye", "Sausage", "Potatoes", "Egg"]
                },
                {
                    name: "Bigos",
                    timeToPrepare: 60,
                    ingredients: ["Sauerkraut", "Fresh Cabbage", "Various Meats", "Mushrooms"]
                },
                {
                    name: "Kotlet Schabowy",
                    timeToPrepare: 30,
                    ingredients: ["Pork Chop", "Breadcrumbs", "Egg", "Potatoes"]
                }
            ]
        },
        {
            name: "Neapolitan Nights",
            latitude: 50.0651,
            longitude: 19.9448,
            dishes: [
                {
                    name: "Margherita Pizza",
                    timeToPrepare: 15,
                    ingredients: ["Tomato", "Mozzarella", "Basil", "Flour"]
                },
                {
                    name: "Pizza Napoletana",
                    timeToPrepare: 20,
                    ingredients: ["Tomato", "Mozzarella", "Anchovies", "Olives"]
                },
                {
                    name: "Pasta Carbonara",
                    timeToPrepare: 25,
                    ingredients: ["Pasta", "Egg", "Pancetta", "Parmesan"]
                },
                {
                    name: "Lasagna",
                    timeToPrepare: 40,
                    ingredients: ["Pasta Sheets", "Bolognese", "Béchamel", "Parmesan"]
                },
                {
                    name: "Risotto ai Funghi",
                    timeToPrepare: 35,
                    ingredients: ["Arborio Rice", "Mushrooms", "White Wine", "Parmesan"]
                },
                {
                    name: "Bruschetta",
                    timeToPrepare: 10,
                    ingredients: ["Bread", "Tomato", "Garlic", "Basil"]
                },
                {
                    name: "Tiramisu",
                    timeToPrepare: 30,
                    ingredients: ["Ladyfingers", "Mascarpone", "Coffee", "Cocoa"]
                }
            ]
        },
        {
            name: "Curry Kingdom",
            latitude: 50.0639,
            longitude: 19.9446,
            dishes: [
                {
                    name: "Chicken Tikka Masala",
                    timeToPrepare: 40,
                    ingredients: ["Chicken", "Tomato", "Cream", "Spices"]
                },
                {
                    name: "Butter Chicken",
                    timeToPrepare: 45,
                    ingredients: ["Chicken", "Tomato", "Butter", "Cream"]
                },
                {
                    name: "Palak Paneer",
                    timeToPrepare: 35,
                    ingredients: ["Spinach", "Paneer", "Cream", "Garlic"]
                },
                {
                    name: "Chana Masala",
                    timeToPrepare: 30,
                    ingredients: ["Chickpeas", "Tomato", "Onion", "Spices"]
                },
                {
                    name: "Biryani",
                    timeToPrepare: 60,
                    ingredients: ["Rice", "Chicken", "Yogurt", "Saffron"]
                },
                {
                    name: "Samosa",
                    timeToPrepare: 25,
                    ingredients: ["Potato", "Peas", "Pastry", "Spices"]
                },
                {
                    name: "Gulab Jamun",
                    timeToPrepare: 30,
                    ingredients: ["Milk Powder", "Flour", "Sugar Syrup", "Cardamom"]
                }
            ]
        },
        {
            name: "Sushi Garden",
            latitude: 50.0643,
            longitude: 19.9452,
            dishes: [
                {
                    name: "Salmon Nigiri",
                    timeToPrepare: 20,
                    ingredients: ["Rice", "Salmon", "Vinegar", "Wasabi"]
                },
                {
                    name: "Tuna Sashimi",
                    timeToPrepare: 15,
                    ingredients: ["Tuna", "Soy Sauce", "Wasabi", "Ginger"]
                },
                {
                    name: "California Roll",
                    timeToPrepare: 25,
                    ingredients: ["Rice", "Crab", "Avocado", "Cucumber"]
                },
                {
                    name: "Dragon Roll",
                    timeToPrepare: 30,
                    ingredients: ["Rice", "Eel", "Avocado", "Cucumber"]
                },
                {
                    name: "Miso Soup",
                    timeToPrepare: 15,
                    ingredients: ["Miso Paste", "Tofu", "Seaweed", "Green Onion"]
                },
                {
                    name: "Tempura",
                    timeToPrepare: 20,
                    ingredients: ["Shrimp", "Batter", "Vegetables", "Dipping Sauce"]
                },
                {
                    name: "Matcha Ice Cream",
                    timeToPrepare: 10,
                    ingredients: ["Matcha Powder", "Cream", "Sugar", "Milk"]
                }
            ]
        },
        {
            name: "Tex Mex Grill",
            latitude: 50.0645,
            longitude: 19.9444,
            dishes: [{
                name: "Beef Tacos",
                timeToPrepare: 18,
                ingredients: ["Beef", "Tortilla", "Lettuce", "Cheddar"]
            }]
        },
        {
            name: "Burger Barn",
            latitude: 50.0650,
            longitude: 19.9460,
            dishes: [{
                name: "Classic Cheeseburger",
                timeToPrepare: 20,
                ingredients: ["Beef Patty", "Cheddar", "Lettuce", "Bun"]
            }]
        },
        {
            name: "Pho Haven",
            latitude: 50.0646,
            longitude: 19.9458,
            dishes: [{
                name: "Beef Pho",
                timeToPrepare: 45,
                ingredients: ["Beef", "Noodles", "Broth", "Herbs"]
            }]
        },
        {
            name: "Kebab Spot",
            latitude: 50.0652,
            longitude: 19.9449,
            dishes: [{
                name: "Lamb Doner",
                timeToPrepare: 25,
                ingredients: ["Lamb", "Pita", "Lettuce", "Sauce"]
            }]
        },
        {
            name: "Falafel Feast",
            latitude: 50.0642,
            longitude: 19.9453,
            dishes: [{
                name: "Falafel Wrap",
                timeToPrepare: 20,
                ingredients: ["Chickpeas", "Garlic", "Parsley", "Pita"]
            }]
        },
        {
            name: "Ramen Republic",
            latitude: 50.0649,
            longitude: 19.9456,
            dishes: [{
                name: "Tonkotsu Ramen",
                timeToPrepare: 50,
                ingredients: ["Pork", "Noodles", "Egg", "Broth"]
            }]
        },
    ]

    for (const r of restaurants) {
        const menuDishes = [];

        for (const d of r.dishes) {
            const ingredients = await Promise.all(
                d.ingredients.map(name =>
                    prisma.ingredient.upsert({
                        where: {name},
                        update: {},
                        create: {name},
                    })
                )
            )

            const dish = await prisma.dish.create({
                data: {
                    name: d.name,
                    timeToPrepare: d.timeToPrepare,
                    ingredients: {
                        connect: ingredients.map(i => ({id: i.id}))
                    }
                }
            })

            menuDishes.push(dish);
        }

        const menu = await prisma.menu.create({
            data: {
                dishes: {
                    connect: menuDishes.map(d => ({id: d.id}))
                }
            }
        })

        await prisma.restaurant.create({
            data: {
                name: r.name,
                latitude: r.latitude,
                longitude: r.longitude,
                menuId: menu.id
            }
        })
    }
}

main()
.then(() => prisma.$disconnect())
.catch(e => {
    console.error(e)
    prisma.$disconnect()
    process.exit(1)
})
