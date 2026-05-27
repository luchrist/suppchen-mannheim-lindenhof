// Bridge file: re-exports factory-generated data in the shape components expect.
// The factory writes lib/restaurant.ts, lib/reviews-data.ts, and lib/menu-data.ts.
// This file maps those into a single config object so component imports stay clean.

import { restaurant } from "@/lib/restaurant";
import { reviewsData } from "@/lib/reviews-data";
import { menuCategories } from "@/lib/menu-data";

export type OpeningHoursEntry = {
  day: string;
  hours: string;
};

export type ReviewExcerpt = {
  name: string;
  rating: number;
  date: string;
  text: string;
};

export type MenuItemConfig = {
  name: string;
  description: string;
  price: string;
};

export type MenuCategoryConfig = {
  category: string;
  subtitle: string;
  items: MenuItemConfig[];
};

export type RestaurantConfigBridge = {
  name: string;
  tagline: string;
  intro: string;
  address: {
    street: string;
    city: string;
    country: string;
  };
  contact: {
    phone: string;
    email: string;
    instagram: string;
  };
  openingHours: OpeningHoursEntry[];
  reviews: {
    rating: number;
    count: number;
    source: string;
    excerpts: ReviewExcerpt[];
  };
  menu: MenuCategoryConfig[];
  socialMedia: typeof restaurant.socialMedia;
  legal: typeof restaurant.legal;
  mapsUrl: string;
};

const MENU_SUBTITLES: Record<string, string> = {};

// Menu data from the acquisition source is not detailed enough to publish a real
// Speisekarte (only price brackets were captured). We hide the Speisekarte section
// rather than invent prices and dishes. Filter out any category that looks like a
// generic price-bracket list.
const looksLikeRealMenu = menuCategories.every((c) =>
  c.items.every((i) => /[a-zA-ZäöüÄÖÜß]/.test(i.name))
);

const config: RestaurantConfigBridge = {
  name: restaurant.name,
  tagline: "Kneipe in Mannheim-Lindenhof",
  intro: "Das Süppchen ist die Kneipe in der Meerfeldstraße im Mannheimer Lindenhof. Kühle Getränke, gute Musik und ein Tresen, an dem Geselligkeit Vorrang hat.",
  address: {
    street: restaurant.address.street,
    city: restaurant.address.cityLine,
    country: "Deutschland",
  },
  contact: {
    phone: restaurant.phone,
    email: restaurant.email,
    instagram: restaurant.socialMedia.hidden.instagram
      ? ""
      : restaurant.socialMedia.instagram,
  },
  openingHours: restaurant.hours.map((h) => {
    // Normalize verbose combined labels like "Montag, Dienstag, ... & Freitag" to "Mo – Fr"
    const dayMap: Record<string, string> = {
      Montag: "Mo",
      Dienstag: "Di",
      Mittwoch: "Mi",
      Donnerstag: "Do",
      Freitag: "Fr",
      Samstag: "Sa",
      Sonntag: "So",
    };
    const present = Object.keys(dayMap).filter((k) => h.day.includes(k));
    const label =
      present.length > 1
        ? `${dayMap[present[0]]} – ${dayMap[present[present.length - 1]]}`
        : h.day;
    return {
      day: label,
      hours: h.closed ? "Ruhetag" : h.time,
    };
  }),
  reviews: {
    rating: reviewsData.overallRating,
    count: reviewsData.totalRatings,
    source: "Google",
    excerpts: reviewsData.reviews.map((r) => ({
      name: r.author,
      rating: r.rating,
      date: r.time,
      text: r.text,
    })),
  },
  menu: looksLikeRealMenu
    ? menuCategories.map((c) => ({
        category: c.label,
        subtitle: c.intro || MENU_SUBTITLES[c.id] || "",
        items: c.items.map((i) => ({
          name: i.name,
          description: i.description || "",
          price: i.price,
        })),
      }))
    : [],
  socialMedia: restaurant.socialMedia,
  legal: restaurant.legal,
  mapsUrl: restaurant.mapsUrl,
};

export default config;
