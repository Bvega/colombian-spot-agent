import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const PORT = 3000;

const CATALOG = [
  { id: "arepa_paisa", name: "Arepa Paisa", price: 13.99, category: "Arepas", dietary: ["Gluten-Free"], desc: "Grilled white cornmeal arepa filled with shredded beef, sweet plantains, black beans, and queso fresco." },
  { id: "arepa_veggie", name: "Arepa Veggie Reina", price: 12.50, category: "Arepas", dietary: ["Gluten-Free", "Vegetarian", "Vegan-Option"], desc: "Stuffed with seasoned black beans, fresh avocado, sweet plantains, and cilantro garlic sauce." },
  { id: "empanadas_beef", name: "Empanadas de Carne (3 pcs)", price: 9.50, category: "Appetizers", dietary: ["Gluten-Free"], desc: "Crispy yellow corn flour pastry filled with spiced Colombian shredded beef and potatoes. Served with house Ají sauce." },
  { id: "bandeja_paisa", name: "Bandeja Paisa Tradicional", price: 19.99, category: "Entrees", dietary: ["Gluten-Free"], desc: "The Colombian flagship platter: grilled steak, crispy chicharrón, Colombian chorizo, fried egg, white rice, red beans, sweet plantain, avocado, and arepita." },
  { id: "patacones_hogao", name: "Patacones con Hogao", price: 8.50, category: "Appetizers", dietary: ["Gluten-Free", "Vegan"], desc: "Crispy double-fried green plantain rounds served with warm tomato-onion hogao sauce." }
];

app.get('/llms.txt', (req, res) => {
  res.type('text/plain').send(`# The Colombian Spot\n> Authentic, homemade Colombian cuisine specializing in 100% naturally gluten-free corn arepas, crispy empanadas, and traditional Bandeja Paisa.\n\n## Location & Hours\n- Address: 2019 E Carson St, Pittsburgh, PA 15203 (South Side)\n- Hours: Tue-Thu 11:30AM-8:30PM | Fri-Sat 11:30AM-9:30PM | Sun 11:30AM-7:30PM (Mon Closed)\n\n## Direct Actions\n- GET /api/menu : Query live catalog\n- POST /api/delivery/quote : Live delivery quote\n- POST /api/orders/delivery : Direct kitchen ticket (0% marketplace commission)`);
});

app.get('/schema.json', (req, res) => {
  res.json({
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "The Colombian Spot",
    "address": { "@type": "PostalAddress", "streetAddress": "2019 E Carson St", "addressLocality": "Pittsburgh", "addressRegion": "PA", "postalCode": "15203", "addressCountry": "US" },
    "servesCuisine": ["Colombian", "Latin American"],
    "hasMenu": CATALOG.map(i => ({ "@type": "MenuItem", "name": i.name, "description": i.desc, "offers": { "@type": "Offer", "price": i.price, "priceCurrency": "USD" }, "suitableForDiet": i.dietary }))
  });
});

app.post('/api/delivery/quote', (req, res) => {
  const { address } = req.body;
  if (!address) return res.status(400).json({ error: "Address is required" });
  res.json({ success: true, destination: address, estimated_arrival_minutes: 28, delivery_fee: 3.99, service_fee: 1.00 });
});

app.post('/api/orders/delivery', (req, res) => {
  const { customer, items, address } = req.body;
  if (!customer || !items || !items.length || !address) return res.status(400).json({ error: "Incomplete order data" });

  const subtotal = items.reduce((sum, item) => {
    const dish = CATALOG.find(c => c.id === item.id);
    return sum + (dish ? dish.price * (item.quantity || 1) : 0);
  }, 0);

  const deliveryFee = 3.99;
  const taxes = Number((subtotal * 0.07).toFixed(2));
  const total = Number((subtotal + deliveryFee + taxes).toFixed(2));
  const orderId = `TCS-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

  res.json({
    success: true,
    orderId,
    restaurant: "The Colombian Spot (South Side)",
    status: "DISPATCHED_TO_KITCHEN",
    dispatchPartner: "Direct White-Label Delivery (DoorDash Drive / Uber Direct)",
    estimatedDeliveryTime: "25-35 minutes",
    receipt: {
      subtotal,
      deliveryFee,
      tax: taxes,
      totalCharged: total,
      marketplaceCommissionPaid: "$0.00 (100% Margin Retained)"
    }
  });
});

app.post('/api/chat', (req, res) => {
  const { message } = req.body;
  const text = (message || '').toLowerCase();

  if (text.includes('gluten') || text.includes('celiac') || text.includes('allergy') || text.includes('diet')) {
    return res.json({ response: "¡Hola! Great news: Almost our entire menu at The Colombian Spot is naturally 100% Gluten-Free! Our arepas, empanadas, and patacones are made from pure corn flour dough." });
  }

  if (text.includes('hour') || text.includes('open') || text.includes('time') || text.includes('location') || text.includes('address')) {
    return res.json({ response: "We are located at 2019 E Carson St in Pittsburgh's South Side. We are open Tuesday to Saturday (11:30 AM - 8:30/9:30 PM) and Sunday until 7:30 PM (Closed Mondays)." });
  }

  if (text.includes('order') || text.includes('arepa') || text.includes('empanada') || text.includes('bandeja') || text.includes('hungry')) {
    return res.json({
      response: "I can prepare a direct delivery order for you right now! Here are our most popular gluten-free favorites:",
      actionSuggested: {
        action: "PROMPT_ORDER",
        items: [
          { id: "arepa_paisa", name: "Arepa Paisa", price: "$13.99" },
          { id: "empanadas_beef", name: "Empanadas de Carne (3x)", price: "$9.50" },
          { id: "bandeja_paisa", name: "Bandeja Paisa Tradicional", price: "$19.99" }
        ]
      }
    });
  }

  return res.json({ response: "¡Bienvenidos a The Colombian Spot! I can answer dietary questions, give hours/location info, or take a direct delivery order. What would you like to do?" });
});

app.get('/api/menu', (req, res) => {
  res.json(CATALOG);
});

app.listen(PORT, () => {
  console.log(`\n🇨🇴 The Colombian Spot AI Agent is live at http://localhost:${PORT}`);
});

export default app;
