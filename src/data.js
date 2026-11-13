export const MAX_CART_QUANTITY = 99;

export const categories = [
  {
    name: "Accessories",
    image: "/images/photo-1511499767150-a48a237f0083.webp"
  },
  {
    name: "Audio",
    image: "/images/photo-1505740420928-5e560c06d30e.webp"
  },
  {
    name: "Beauty",
    image: "/images/photo-1596462502278-27bfdc403348.webp"
  },
  {
    name: "Best Deals",
    image: "/images/photo-1607082349566-187342175e2f.webp"
  },
  {
    name: "Best Seller",
    image: "/images/photo-1542291026-7eec264c27ff.webp"
  },
  {
    name: "Cameras",
    image: "/images/photo-1516035069371-29a1b244cc32.webp"
  },
  {
    name: "Chair",
    image: "/images/photo-1505693416388-ac5ce068fe85.webp"
  },
  {
    name: "Clothing",
    image: "/images/photo-1483985988355-763728e1935b.webp"
  },
  {
    name: "Computer & Laptop",
    image: "/images/photo-1496181133206-80ce9b88a853.webp"
  },
  {
    name: "Electronics",
    image: "/images/photo-1497644083578-611b798c60f3.webp"
  }
];

export const premiumProducts = [
  {
    id: 1,
    name: "Inkjet Photo Printer",
    price: 89,
    oldPrice: null,
    image: "/images/photo-1612815154858-60aa4c59eaa6.webp",
    categories: ["Electronics"],
    tag: "Office"
  },
  {
    id: 2,
    name: "Studio DSLR Camera",
    price: 127,
    oldPrice: 155,
    image: "/images/photo-1516035069371-29a1b244cc32.webp",
    categories: ["Cameras", "Electronics"],
    tag: "Photography"
  },
  {
    id: 3,
    name: "4K Smart Television",
    price: 79,
    oldPrice: null,
    image: "/images/photo-1593359677879-a4bb92f829d1.webp",
    categories: ["Electronics"],
    tag: "Electronics"
  },
  {
    id: 4,
    name: "Modern Pendant Lamp",
    price: 45,
    oldPrice: 65,
    image: "/images/photo-1507473885765-e6ed057f782c.webp",
    categories: ["Accessories"],
    tag: "Home"
  },
  {
    id: 5,
    name: "Wireless Game Controller",
    price: 99,
    oldPrice: 109,
    image: "/images/photo-1592840496694-26d035b52b48.webp",
    categories: ["Accessories", "Electronics"],
    tag: "Gaming"
  }
];

export const womenProducts = [
  {
    id: 6,
    name: "Golden Summer Dress",
    price: 80,
    oldPrice: 100,
    image: "/images/photo-1539109136881-3be0616acf4b.webp",
    categories: ["Clothing"]
  },
  {
    id: 7,
    name: "Red Evening Gown",
    price: 142,
    oldPrice: 160,
    image: "/images/photo-1566174053879-31528523f8ae.webp",
    categories: ["Clothing"]
  },
  {
    id: 8,
    name: "Floral Occasion Dress",
    price: 300,
    oldPrice: null,
    image: "/images/photo-1595777457583-95e059d581b8.webp",
    categories: ["Clothing"]
  },
  {
    id: 9,
    name: "Pink Party Dress",
    price: 89,
    oldPrice: null,
    image: "/images/photo-1596783074918-c84cb06531ca.webp",
    categories: ["Clothing"]
  },
  {
    id: 10,
    name: "Red Statement Outfit",
    price: 119,
    oldPrice: null,
    image: "/images/photo-1496747611176-843222e1e57c.webp",
    categories: ["Clothing"]
  },
  {
    id: 11,
    name: "Mustard Casual Set",
    price: 122,
    oldPrice: null,
    image: "/images/photo-1483985988355-763728e1935b.webp",
    categories: ["Clothing"]
  }
];

export const menProducts = [
  {
    id: 12,
    name: "Classic White T-shirt",
    price: 35,
    image: "/images/photo-1521572163474-6864f9cf17ab.webp",
    categories: ["Clothing"]
  },
  {
    id: 13,
    name: "Formal Navy Suit",
    price: 180,
    image: "/images/photo-1591047139829-d91aecb6caea.webp",
    categories: ["Clothing"]
  }
];

export function matchesCategory(product, category) {
  if (!category) return true;
  if (category === "Best Deals") {
    return product.oldPrice !== null && product.oldPrice > product.price;
  }
  return product.categories?.includes(category) ?? false;
}