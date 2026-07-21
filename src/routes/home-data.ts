import suite1 from "@/assets/suite-1.jpg";
import suite2 from "@/assets/suite-2.jpg";
import suite3 from "@/assets/suite-3.jpg";

export type Suite = {
  id: string;
  name: string;
  image: string;
  beds: number;
  baths: number;
  sqft: number;
  price: number;
  balcony: boolean;
  petFriendly: boolean;
  available: string;
  status: "Available" | "Few Left" | "Waitlist";
};

export const suites: Suite[] = [
  {
    id: "s1",
    name: "The Rive Loft",
    image: suite1,
    beds: 1,
    baths: 1,
    sqft: 712,
    price: 2450,
    balcony: true,
    petFriendly: true,
    available: "Immediate",
    status: "Available",
  },
  {
    id: "s2",
    name: "Sage Two-Bed",
    image: suite2,
    beds: 2,
    baths: 2,
    sqft: 1104,
    price: 3395,
    balcony: true,
    petFriendly: true,
    available: "Feb 2026",
    status: "Few Left",
  },
  {
    id: "s3",
    name: "Marble Kitchen",
    image: suite3,
    beds: 2,
    baths: 2,
    sqft: 985,
    price: 3120,
    balcony: false,
    petFriendly: true,
    available: "Mar 2026",
    status: "Available",
  },
  {
    id: "s4",
    name: "Corner Studio",
    image: suite1,
    beds: 0,
    baths: 1,
    sqft: 548,
    price: 1895,
    balcony: true,
    petFriendly: false,
    available: "Immediate",
    status: "Few Left",
  },
  {
    id: "s5",
    name: "Skyline Three",
    image: suite2,
    beds: 3,
    baths: 2,
    sqft: 1420,
    price: 4280,
    balcony: true,
    petFriendly: true,
    available: "Apr 2026",
    status: "Waitlist",
  },
  {
    id: "s6",
    name: "Garden Suite",
    image: suite3,
    beds: 1,
    baths: 1,
    sqft: 795,
    price: 2620,
    balcony: true,
    petFriendly: true,
    available: "Immediate",
    status: "Available",
  },
];

export const largestSuites = [
  { name: "1 Bedroom + Den", beds: "1 bed", baths: "1 bath", price: "$1,999", image: suite1 },
  { name: "2 Bedroom + Den", beds: "2 bed", baths: "2 bath", price: "$2,499", image: suite2 },
  {
    name: "3 Bedroom + 2 Bathroom",
    beds: "3 bed",
    baths: "2 bath",
    price: "$3,795",
    image: suite3,
  },
];

export type LargestSuite = (typeof largestSuites)[number];
