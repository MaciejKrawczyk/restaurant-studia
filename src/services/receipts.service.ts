import {Dish, Order, OrderItem, Restaurant} from "../db/generated";
import path from "path";
import fs from "node:fs";
import PDFDocument from "pdfkit";

const VAT_RATE = 0.23;

export const generateFile = async (newOrder: Order & {
    items: (OrderItem & {
        dish: Dish;
        restaurant: Restaurant;
    })[];
}) => {
    const ordersDir = path.join(process.cwd(), "public", "orders");
    if (!fs.existsSync(ordersDir)) {
        fs.mkdirSync(ordersDir, {recursive: true});
    }

    const filename = `order_${newOrder.id}.pdf`;
    const filePath = path.join(ordersDir, filename);

    await new Promise<void>((resolve, reject) => {
        const doc = new PDFDocument({
            size: "A4",
            margins: {top: 50, bottom: 50, left: 50, right: 50},
        });
        const writeStream = fs.createWriteStream(filePath);
        doc.pipe(writeStream);

        // === HEADER ===
        doc.fontSize(20).text(`Order #${newOrder.id}`, {align: "center"});
        doc.moveDown(0.5);
        doc
        .fontSize(12)
        .text(
            `Date: ${newOrder.createdAt.toLocaleString("pl-PL", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
            })}`
        );
        doc.moveDown(1);

        // === TABLE OF ITEMS ===
        doc.fontSize(14).text("Items:", {underline: true});
        doc.moveDown(0.5);

        let subtotal = 0;

        newOrder.items.forEach((item, idx) => {
            const dishName = item.dish.name;
            const restaurantName = item.restaurant.name;
            const quantity = item.quantity;
            const unitPrice = item.dish.price; // assume price is in same currency
            const lineTotal = quantity * unitPrice;
            subtotal += lineTotal;

            const lineText = `${idx + 1}. ${dishName} (${restaurantName}) × ${quantity} = ${lineTotal
            .toFixed(2)
            .replace(".", ",")} PLN`;
            doc.fontSize(12).text(lineText);
        });

        doc.moveDown(1);

        // === PRICE SUMMARY ===
        const vatAmount = subtotal * VAT_RATE;
        const grandTotal = subtotal + vatAmount;

        // Subtotal
        doc
        .fontSize(12)
        .text(
            `Subtotal:   ${subtotal.toFixed(2).replace(".", ",")} PLN`,
            {align: "right"}
        );
        // VAT line
        doc
        .fontSize(12)
        .text(
            `VAT (${Math.round(VAT_RATE * 100)} %):   ${vatAmount
            .toFixed(2)
            .replace(".", ",")} PLN`,
            {align: "right"}
        );
        // Grand total
        doc
        .fontSize(14)
        .text(
            `Total:   ${grandTotal.toFixed(2).replace(".", ",")} PLN`,
            {align: "right"}
        );

        doc.end();

        writeStream.on("finish", () => resolve());
        writeStream.on("error", (err) => reject(err));
    });

    return `/p12/orders/${filename}`;
};
