/** Map API café fields onto the existing card/detail UI vocabulary. */
export function featureTags(cafe) {
  const tags = [];
  if (cafe.wifi) tags.push("wifi");
  if (cafe.powerOutlets) tags.push("power outlets");
  if (cafe.airConditioning) tags.push("A/C");
  if (cafe.outdoorSeating) tags.push("outdoor");
  if (cafe.studyFriendly) tags.push("study-friendly");
  return tags;
}

export function featureBadges(cafe) {
  const badges = [];
  if (cafe.studyFriendly) badges.push("Study Spot");
  if (cafe.wifi && cafe.powerOutlets) badges.push("Work Friendly");
  if (cafe.outdoorSeating) badges.push("Outdoor");
  if (Number(cafe.rating) >= 4.6) badges.push("Popular Choice");
  return badges;
}

export function formatOpeningHours(openingHours) {
  if (!openingHours) return "Hours unavailable";
  if (typeof openingHours === "string") return openingHours;
  const order = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  const labels = {
    monday: "Mon",
    tuesday: "Tue",
    wednesday: "Wed",
    thursday: "Thu",
    friday: "Fri",
    saturday: "Sat",
    sunday: "Sun",
  };
  return order
    .map((day) => `${labels[day]}: ${openingHours[day] || "Closed"}`)
    .join(" · ");
}

export function whySuitYou(cafe) {
  const reasons = [];
  if (cafe.studyFriendly) {
    reasons.push("Marked study-friendly — solid for focus sessions.");
  }
  if (cafe.wifi) {
    reasons.push("Wi-Fi available for remote work or studying.");
  }
  if (cafe.powerOutlets) {
    reasons.push("Power outlets so you can stay plugged in.");
  }
  if (cafe.outdoorSeating) {
    reasons.push("Outdoor seating brings Colombo's tropical energy.");
  }
  if (cafe.airConditioning) {
    reasons.push("Air-conditioned interiors for hot Colombo afternoons.");
  }
  if (Number(cafe.rating) >= 4.5) {
    reasons.push("Highly rated by local café-goers.");
  }
  if (!reasons.length) {
    reasons.push(`A solid pick in ${cafe.area}.`);
  }
  return reasons.slice(0, 4);
}
