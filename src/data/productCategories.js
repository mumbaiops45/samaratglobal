// Product categories, grouped the way the navbar's Products menu shows them.
// The ids match `category` on each product and the `?category=` URL param
// the Products page reads.
export const PRODUCT_CATEGORY_GROUPS = [
  {
    title: "Natural & Agro Products",
    categories: [
      { id: "medicinal", label: "Medicinal Plants" },
      { id: "food", label: "Food & Beverages" },
      { id: "spices", label: "Spices & Herbs" },
      { id: "textiles", label: "Textiles" },
    ],
  },
  {
    title: "Stainless Steel Equipment",
    categories: [
      { id: "process", label: "Process Equipment" },
      { id: "cleanroom", label: "Cleanroom Equipment" },
      { id: "handling", label: "Material Handling & Storage" },
      { id: "lab", label: "Lab & QC Accessories" },
      { id: "fabrication", label: "SS Furniture & Fabrication" },
    ],
  },
  {
    title: "Metals & Industrial",
    categories: [
      { id: "metal", label: "Metals & Steel" },
      { id: "industrial", label: "Industrial Equipment" },
    ],
  },
];

export const PRODUCT_CATEGORIES = PRODUCT_CATEGORY_GROUPS.flatMap((g) => g.categories);

export const productCategoryHref = (id) => `/product?category=${id}`;
