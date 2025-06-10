import path from "path";
import fs from "fs";

type PopulatedOrder = {
    id: number;
    createdAt: Date;
    items: {
        quantity: number;
        dish: { name: string; price: number };
        restaurant: { name: string };
    }[];
};

export const generateFile = async (newOrder: PopulatedOrder) => {
    const ordersDir = path.join(process.cwd(), "public", "orders");
    if (!fs.existsSync(ordersDir)) {
        fs.mkdirSync(ordersDir, { recursive: true });
    }

    const filename = `order_${newOrder.id}.html`;
    const filePath = path.join(ordersDir, filename);

    const formatPLN = (value: number) =>
        `${value.toFixed(2).replace(".", ",")} PLN`;

    const createdAtPL = newOrder.createdAt.toLocaleString("pl-PL", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });

    const subtotal = newOrder.items.reduce(
        (sum, item) => sum + item.quantity * item.dish.price,
        0,
    );
    const grandTotal = subtotal;

    const itemsRows = newOrder.items
    .map(
        (item, i) => `
        <tr>
          <td>${i + 1}</td>
          <td>${item.dish.name}</td>
          <td>${item.restaurant.name}</td>
          <td class="txt-right">${item.quantity}</td>
          <td class="txt-right">${formatPLN(item.dish.price)}</td>
          <td class="txt-right">${formatPLN(
            item.quantity * item.dish.price,
        )}</td>
        </tr>`,
    )
    .join("");

    const html = `
<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="utf-8" />
  <title>Zamówienie #${newOrder.id}</title>
  <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; font-family: "Lato", sans-serif; }
    body { max-width: 720px; margin: 0 auto; padding: 40px 24px; color: #222; }
    h1 { text-align: center; margin: 0 0 4px; }
    h1 span { font-weight: normal; font-size: 0.6em; }
    table { width: 100%; border-collapse: collapse; margin-top: 16px; }
    th, td { padding: 8px 6px; border-bottom: 1px solid #ddd; }
    th { text-align: left; background: #fafafa; }
    .txt-right { text-align: right; }
    .summary { margin-top: 24px; width: 100%; }
    .summary td { padding: 4px 6px; }
    .summary .label { width: 75%; }
    .total { font-size: 1.2rem; font-weight: 700; }
  </style>
</head>
<body>
  <h1>Order #${newOrder.id} <span>(${createdAtPL})</span></h1>

  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Dish</th>
        <th>Restaurant</th>
        <th class="txt-right">Qty</th>
        <th class="txt-right">Unit&nbsp;Price</th>
        <th class="txt-right">Line&nbsp;Total</th>
      </tr>
    </thead>
    <tbody>
      ${itemsRows}
    </tbody>
  </table>

  <table class="summary">
    <tr>
      <td class="label txt-right">Total:</td>
      <td class="txt-right">${formatPLN(grandTotal)}</td>
    </tr>
  </table>
</body>
</html>
`;

    await fs.promises.writeFile(filePath, html, "utf8");
    return `/orders/${filename}`;
};
