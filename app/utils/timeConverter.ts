export default function convertTimeString(timeStr: string): string | null {
  if (!timeStr) return null;
  if (timeStr === "Promoted") return "No time/Promoted";
  if (timeStr === "hier") {
    return "1d";
  } else if (timeStr === "avant-hier") {
    return "2d";
  } else if (timeStr.endsWith("heures")) {
    return timeStr;
  } else {
    const match = timeStr.match(/il y a (\d+) (jour|mois)/);
    if (match) {
      const num = parseInt(match[1]);
      const unit = match[2];
      if (unit === "jour") {
        return `${num}d`;
      } else if (unit === "mois") {
        return `${num} mois`;
      }
    }
  }

  return timeStr;
}
