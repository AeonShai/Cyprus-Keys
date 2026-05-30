export const NORTH_CYPRUS_CITIES = [
  "Girne",       // Kyrenia
  "Gazimağusa",  // Famagusta
  "Lefkoşa",     // Nicosia (North)
  "Güzelyurt",   // Morphou
  "İskele",      // Trikomo
  "Lefke",
  "Alsancak",
  "Lapta",
  "Karaoğlanoğlu",
  "Çatalköy",
  "Esentepe",
  "Tatlısu",
  "Boğaz",
  "Yeni Erenköy",
  "Karpaz",
] as const;

export type NorthCyprusCity = (typeof NORTH_CYPRUS_CITIES)[number];
