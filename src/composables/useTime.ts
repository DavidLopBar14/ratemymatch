export function useTime() {
  function formatTime(time: string): string {
    if (!time) return "";

    const [hourStr, minuteStr] = time.split(":");
    let hour = parseInt(hourStr, 10);
    const minutes = parseInt(minuteStr, 10);

    hour = (hour + 2) % 24;

    const formattedHour = hour.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");

    return `${formattedHour}:${formattedMinutes}`;
  }
  return { formatTime };
}
