import {PrismaClient} from './generated'

const prisma = new PrismaClient()

async function main() {
    const restaurants = [
        {
            name: "Pierogi Palace",
            latitude: 50.0647,
            longitude: 19.9450,
            dishes: [
                {
                    price: 10,
                    name: "Pierogi Ruskie",
                    timeToPrepare: 25,
                    ingredients: ["Potato", "Onion", "Cottage Cheese", "Flour"]
                },
                {
                    price: 10,
                    name: "Pierogi z Mięsem",
                    timeToPrepare: 30,
                    ingredients: ["Ground Pork", "Onion", "Flour", "Butter"]
                },
                {
                    price: 10,
                    name: "Pierogi z Kapustą i Grzybami",
                    timeToPrepare: 35,
                    ingredients: ["Sauerkraut", "Mushrooms", "Onion", "Flour"]
                },
                {
                    price: 10,
                    name: "Pierogi z Jagodami",
                    timeToPrepare: 20,
                    ingredients: ["Blueberries", "Flour", "Sugar", "Sour Cream"]
                },
                {
                    price: 10,
                    name: "Żurek",
                    timeToPrepare: 45,
                    ingredients: ["Sour Rye", "Sausage", "Potatoes", "Egg"]
                },
                {
                    price: 10,
                    name: "Bigos",
                    timeToPrepare: 60,
                    ingredients: ["Sauerkraut", "Fresh Cabbage", "Various Meats", "Mushrooms"]
                },
                {
                    price: 10,
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
                    price: 10,
                    name: "Margherita Pizza",
                    timeToPrepare: 15,
                    ingredients: ["Tomato", "Mozzarella", "Basil", "Flour"]
                },
                {
                    price: 10,
                    name: "Pizza Napoletana",
                    timeToPrepare: 20,
                    ingredients: ["Tomato", "Mozzarella", "Anchovies", "Olives"]
                },
                {
                    price: 10,
                    name: "Pasta Carbonara",
                    timeToPrepare: 25,
                    ingredients: ["Pasta", "Egg", "Pancetta", "Parmesan"]
                },
                {
                    price: 10,
                    name: "Lasagna",
                    timeToPrepare: 40,
                    ingredients: ["Pasta Sheets", "Bolognese", "Béchamel", "Parmesan"]
                },
                {
                    price: 10,
                    name: "Risotto ai Funghi",
                    timeToPrepare: 35,
                    ingredients: ["Arborio Rice", "Mushrooms", "White Wine", "Parmesan"]
                },
                {
                    price: 10,
                    name: "Bruschetta",
                    timeToPrepare: 10,
                    ingredients: ["Bread", "Tomato", "Garlic", "Basil"]
                },
                {
                    price: 10,
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
                    price: 10,
                    name: "Chicken Tikka Masala",
                    timeToPrepare: 40,
                    ingredients: ["Chicken", "Tomato", "Cream", "Spices"]
                },
                {
                    price: 10,
                    name: "Butter Chicken",
                    timeToPrepare: 45,
                    ingredients: ["Chicken", "Tomato", "Butter", "Cream"]
                },
                {
                    price: 10,
                    name: "Palak Paneer",
                    timeToPrepare: 35,
                    ingredients: ["Spinach", "Paneer", "Cream", "Garlic"]
                },
                {
                    price: 10,
                    name: "Chana Masala",
                    timeToPrepare: 30,
                    ingredients: ["Chickpeas", "Tomato", "Onion", "Spices"]
                },
                {
                    price: 10,
                    name: "Biryani",
                    timeToPrepare: 60,
                    ingredients: ["Rice", "Chicken", "Yogurt", "Saffron"]
                },
                {
                    price: 10,
                    name: "Samosa",
                    timeToPrepare: 25,
                    ingredients: ["Potato", "Peas", "Pastry", "Spices"]
                },
                {
                    price: 10,
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
                    price: 10,
                    name: "Salmon Nigiri",
                    timeToPrepare: 20,
                    ingredients: ["Rice", "Salmon", "Vinegar", "Wasabi"]
                },
                {
                    price: 10,
                    name: "Tuna Sashimi",
                    timeToPrepare: 15,
                    ingredients: ["Tuna", "Soy Sauce", "Wasabi", "Ginger"]
                },
                {
                    price: 10,
                    name: "California Roll",
                    timeToPrepare: 25,
                    ingredients: ["Rice", "Crab", "Avocado", "Cucumber"]
                },
                {
                    price: 10,
                    name: "Dragon Roll",
                    timeToPrepare: 30,
                    ingredients: ["Rice", "Eel", "Avocado", "Cucumber"]
                },
                {
                    price: 10,
                    name: "Miso Soup",
                    timeToPrepare: 15,
                    ingredients: ["Miso Paste", "Tofu", "Seaweed", "Green Onion"]
                },
                {
                    price: 10,
                    name: "Tempura",
                    timeToPrepare: 20,
                    ingredients: ["Shrimp", "Batter", "Vegetables", "Dipping Sauce"]
                },
                {
                    price: 10,
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
                price: 10,
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
                price: 10,
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
                price: 10,
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
                price: 10,
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
                price: 10,
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
                price: 10,
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
                    price: d.price,
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
