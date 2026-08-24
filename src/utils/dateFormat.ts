type DateFormat = "date" | "time";

export function formatDate(
  date: string | Date,
  format: DateFormat
): string {
  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    return "";
  }

  switch (format) {
    case "date":
      return `${String(parsedDate.getDate()).padStart(2, "0")}/${String(
        parsedDate.getMonth() + 1
      ).padStart(2, "0")}/${parsedDate.getFullYear()}`;

    case "time":
      return `${String(parsedDate.getHours()).padStart(2, "0")}:${String(
        parsedDate.getMinutes()
      ).padStart(2, "0")}`;

    default:
      return "";
  }
}