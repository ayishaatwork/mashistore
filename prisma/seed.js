import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.colorVariant.deleteMany();
  await prisma.gSMVariant.deleteMany();
  await prisma.product.deleteMany();

  /* =========================
     COPTIC BOUND (COLOR OPTIONS)
  ========================= */
  await prisma.product.create({
    data: {
      name: "Coptic Bound",
      images: [
        "/products/copticbound/main.jpg",
        "/products/copticbound/lemongrass.jpg",
        "/products/copticbound/terracotta.jpg",
        "/products/copticbound/gulaab.jpg",
      ],
      sizes: ["6 INCH X 8 INCH"],
      description:
        "Hand-stitched with the traditional Coptic binding technique, this sketchbook opens completely flat — perfect for wide spreads and seamless sketching. The exposed spine highlights its handcrafted detail, while the sturdy pages make it ideal for drawing, journaling, or mixed media work. Each book is bound with care, designed to last and to grow beautifully with your creative process.",
      variants: {
        create: [
          {
            gsm: "180 GSM",
            price: 600,
            colors: {
              create: [
                { name: "Lemongrass", type: "COLOR" },
                { name: "Terracotta", type: "COLOR" },
                { name: "Gulaab", type: "COLOR" },
              ],
            },
          },
          {
            gsm: "90 GSM",
            price: 400,
            colors: {
              create: [
                { name: "Lemongrass", type: "COLOR" },
                { name: "Terracotta", type: "COLOR", soldOut: true },
              ],
            },
          },
        ],
      },
    },
  });

  /* =========================
     CASE BOUND (COLOR OPTIONS)
  ========================= */
  await prisma.product.create({
    data: {
      name: "Case Bound",
      images: [
        "/products/casebound/main.jpg",
        "/products/casebound/lemongrass.jpg",
        "/products/casebound/terracotta.jpg",
        "/products/casebound/gulaab.jpg",
        "/products/casebound/book1.jpg",
        "/products/casebound/book2.jpg",
        "/products/casebound/book3.jpg",
      ],
      sizes: ["6 INCH X 8 INCH"],
      description:
        "Crafted with a classic hardbound cover, this sketchbook is built to last. The case binding keeps your pages secure while giving the book a sturdy, timeless form. It opens neatly and stays flat enough for comfortable sketching and writing. Durable on the outside and smooth on the inside — it’s made to travel with you and hold your ideas for years to come.",
      variants: {
        create: [
          {
            gsm: "120 GSM",
            price: 450,
            colors: {
              create: [
                { name: "Lemongrass", type: "COLOR" },
                { name: "Terracotta", type: "COLOR" },
                { name: "Gulaab", type: "COLOR" },
              ],
            },
          },
        ],
      },
    },
  });

  /* =========================
     FIELD BOOK (NO OPTIONS)
  ========================= */
  await prisma.product.create({
    data: {
      name: "Field Book",
      images: [
        "/products/fieldbook/main.jpg",
        "/products/fieldbook/orange.jpg",
        "/products/fieldbook/black.jpg",
        "/products/fieldbook/green.jpg",
        "/products/fieldbook/yellow.jpg",
        "/products/fieldbook/book1.jpg",
      ],
      sizes: ["4 INCH X 6 INCH"],
      description:
        "Our pocket size Field Note bundle is a set of four vibrant, everyday notebooks designed for quick ideas, sketches, and thoughts on the go. Each book comes in a bright, cheerful colour, making the set both functional and fun to carry. Compact, lightweight, and easy to slip into any pocket or bag, they are perfect for anyone who loves jotting things down wherever inspiration strikes.",
      variants: {
        create: [
          {
            gsm: "120 GSM",
            price: 400,
            colors: {
              create: [], // IMPORTANT: explicitly empty
            },
          },
        ],
      },
    },
  });

/* =========================
   ROUGH PAD (FORMAT OPTIONS — DIFFERENT PRICES)
========================= */
await prisma.product.create({
  data: {
    name: "Rough Pad",
    images: [
      "/products/roughpad/main.jpg",
      "/products/roughpad/compacta4.jpg",
      "/products/roughpad/compacta3.jpg",
      "/products/roughpad/book1.jpg",
      "/products/roughpad/book2.jpg",
      "/products/roughpad/book3.jpg",
    ],
    sizes: ["21.5CM X 28CM", "28CM X 43CM"],
    description:
      "Crafted with a classic hardbound cover, this sketchbook is built to last. The case binding keeps your pages secure while giving the book a sturdy, timeless form. It opens neatly and stays flat enough for comfortable sketching and writing. Durable on the outside and smooth on the inside — it’s made to travel with you and hold your ideas for years to come.",
    variants: {
      create: [
        {
          gsm: "50 GSM",
          price: 0, // base price not used
          colors: {
            create: [
              { name: "COMPACT A3", type: "FORMAT", price:200 },
              { name: "COMPACT A4", type: "FORMAT", price:300 },
            ],
          },
        },
      ],
    },
  },
});



  console.log("✅ Database seeded correctly");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

