// Agro produce from the Fidus Global catalogue: fruits, spices and food
// commodities sourced from the North East and other Indian growing regions.
// Images live in /public/productimages/agro.
// Each entry is [image slug (null = no photo yet), product name, category id, origin, description].
const AGRO_ITEMS = [
  // Fresh fruits
  ["kew-pineapple", "Kew Pineapple", "fruits", "Meghalaya & Tripura", "Famous for exceptional sweetness, low fiber and juicy texture — considered one of India's finest pineapple varieties."],
  ["queen-pineapple", "Queen Pineapple", "fruits", "Nagaland & Tripura", "Naturally sweet and aromatic with low acidity. Highly valued for fresh consumption and processing."],
  ["khasi-mandarin-oranges", "Khasi Mandarin Oranges", "fruits", "Meghalaya", "Known for their bright color, sweetness and rich citrus aroma — a premium orange once exported to the UK."],
  ["kaji-nimbu", "Kaji Nimbu (Assam Lemon)", "fruits", "Assam", "A giant aromatic lemon variety with strong fragrance and high juice content, widely used in cuisine and beverages."],
  ["kiwi", "Kiwi", "fruits", "Nagaland & Arunachal Pradesh", "Juicy, nutrient-rich kiwis with balanced sweetness and acidity, grown in Nagaland's cool climate."],
  ["passion-fruit", "Passion Fruit", "fruits", "Mizoram, Odisha & Arunachal Pradesh", "Intense tropical aroma and refreshing tangy taste. Widely used in juices, concentrates, desserts and processing."],
  ["dragon-fruit", "Dragon Fruit", "fruits", "Mizoram & Odisha", "Rich in antioxidants and visually striking; valued for health products, premium wine production and export."],
  ["strawberries", "Strawberries", "fruits", "Uttarakhand", "Known for natural sweetness, bright color and freshness thanks to cool Himalayan growing conditions."],
  ["alphonso-mangoes", "Alphonso Mangoes", "fruits", "Maharashtra", "Globally famous for rich aroma, creamy texture and exceptional sweetness — among India's most premium mango varieties."],
  ["mangoes", "Mangoes", "fruits", "Uttarakhand", "Flavorful, juicy mangoes grown in fertile valleys with excellent natural sweetness."],
  ["grapes", "Grapes", "fruits", "Maharashtra", "Sweet, juicy, export-quality grapes from one of India's leading grape-producing states."],
  ["pomegranates", "Pomegranates", "fruits", "Maharashtra, Karnataka, Gujarat & Rajasthan", "Deep red arils, natural sweetness and high juice content. Dry growing climates improve shelf life and export quality."],
  ["avocado", "Avocado", "fruits", "Kerala", "Avocados grown in Kerala's tropical hill climate, supplied in bulk for fresh and processing buyers."],

  // Spices & herbs
  ["lakadong-turmeric-powder", "Lakadong Turmeric Powder", "spices", "Meghalaya", "Renowned for exceptionally high curcumin content and vibrant golden color; valued in wellness, ayurvedic and premium spice markets."],
  ["dry-ginger-slices", "Dry Ginger Slices", "spices", "Meghalaya", "Strong aroma and medicinal value. The high-altitude climate enhances the ginger's natural oil content and flavor."],
  ["ginger", "Ginger", "spices", "Assam, Odisha & Karnataka", "Fiber-rich ginger with strong pungency and distinct aroma, preferred for spice blends, ayurvedic use and processed products."],
  ["black-pepper", "Black Pepper", "spices", "Kerala", "The \"King of Spices\" — prized globally for its strong aroma and sharp flavor."],
  ["cinnamon", "Cinnamon", "spices", "Meghalaya", "Valued for its strong aroma, warm flavor and high essential oil content, for culinary, wellness and spice markets."],
  ["bhut-jolokia", "Bhut Jolokia (Ghost Chilli)", "spices", "Assam", "One of the world's hottest chillies, famous for extreme pungency and smoky flavor, with strong export and culinary value."],
  ["birds-eye-chilli", "Bird's Eye Chilli", "spices", "Mizoram", "Also known as Mizo Chilli — intense heat, sharp pungency and a rich flavor profile, in demand in premium spice markets."],
  ["cardamom", "Cardamom", "spices", "Sikkim", "Highly aromatic large and small cardamom with rich flavor and premium export quality, grown in India's first fully organic state."],
  ["garlic", "Garlic", "spices", "Kota, Rajasthan", "Superior-quality garlic from the Garlic Capital of India, with strong pungency, rich flavor and excellent storage life."],

  // Food commodities
  ["black-rice", "Black Rice (Chak-Hao)", "food", "Manipur", "Manipur's traditional heritage black rice, prized for its rich antioxidants, unique aroma and cultural significance."],
  ["red-rice", "Red Rice", "food", "Uttarakhand", "A nutritious rice variety rich in antioxidants and minerals, grown naturally in the Himalayan ecosystem."],
  ["makhana", "Makhana (Fox Nuts)", "food", "Bihar", "Grown in Bihar's pond ecosystems, which contribute the majority of India's production; valued for nutrition and superior quality."],
  ["honey", "Honey", "food", "Meghalaya", "Naturally sourced honey known for its purity, floral aroma and rich nutritional value, from Meghalaya's dense forests."],
  ["assam-tea", "Assam Tea", "food", "Assam", "Globally famous for its bold flavor, rich color and strong aroma, from one of the world's largest tea-producing regions."],
  ["sikkim-organic-produce", "Organic Vegetables & Greens", "food", "Sikkim", "From India's first fully organic state, known for chemical-free and sustainable farming."],
  ["sweet-potatoes", "Sweet Potatoes", "food", "West Bengal & Assam", "Farm-sourced sweet potatoes supplied in bulk for domestic and processing buyers."],
];

export const agroProducts = AGRO_ITEMS.map(([slug, name, category, origin, description], i) => ({
  id: 301 + i,
  name,
  category,
  type: "Export",
  origin,
  destination: "Global Markets",
  image: slug ? `/productimages/agro/${slug}.jpg` : undefined,
  description,
  details: [
    `Sourced from: ${origin}`,
    "Direct from farmers & FPOs",
    "Lab-tested, traceable supply",
    "Bulk B2B orders",
  ],
  certifications: [],
}));
