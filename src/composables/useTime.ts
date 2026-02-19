export function useTime() {
  function formatTime(time: string): string {
    if (!time) return "";

    const [hourStr, minuteStr] = time.split(":");

    // Creamos fecha en UTC
    const date = new Date();
    date.setUTCHours(Number(hourStr));
    date.setUTCMinutes(Number(minuteStr));
    date.setUTCSeconds(0);
    date.setUTCMilliseconds(0);

    // Formateamos en zona horaria España
    return new Intl.DateTimeFormat("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Europe/Madrid",
    }).format(date);
  }

  return { formatTime };
}

