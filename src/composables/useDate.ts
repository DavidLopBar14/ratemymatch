export function useDate() {
  function formatDate(dateStr: string): string {
    if (!dateStr) return "";

    const date = new Date(dateStr);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);

    return `${day}/${month}/${year}`;
  }

  return { formatDate };
}
