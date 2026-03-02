const PLATFORMS = [
  "Trip Advisor",
  "Google",
  "MakeMyTrip",
  "Oyo",
  "Booking.com",
  "Agoda",
];

const REVIEW_POOL = {
  "Trip Advisor": [
    "Great heritage vibe, very clean rooms and courteous staff in central Lucknow.",
    "Excellent breakfast spread and smooth check-in near Hazratganj.",
  ],
  Google: [
    "Comfortable stay with quick room service and easy metro connectivity.",
    "Family-friendly property and good value for a Lucknow city trip.",
  ],
  MakeMyTrip: [
    "Easy booking confirmation and fair tariff compared to nearby hotels.",
    "Neat rooms and polite front desk; ideal for business travelers.",
  ],
  Oyo: [
    "Budget-friendly option in Lucknow with decent amenities.",
    "Good for short stays, clean washroom and prompt support.",
  ],
  "Booking.com": [
    "Highly rated for location and guest hospitality.",
    "Reliable Wi-Fi and modern interiors made the stay pleasant.",
  ],
  Agoda: [
    "Competitive pricing and quick check-in for late arrivals.",
    "Spacious room layout and peaceful environment within city limits.",
  ],
};

const buildPlatformReviews = () => {
  return PLATFORMS.map((platform) => {
    const quotes = REVIEW_POOL[platform];
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    const rating = Number((3.9 + Math.random() * 1.0).toFixed(1));

    return {
      platform,
      rating,
      quote,
      sourceUrl: "",
    };
  });
};

module.exports = {
  PLATFORMS,
  buildPlatformReviews,
};
