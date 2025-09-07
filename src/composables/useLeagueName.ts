export function useLeagueName() {
  function formatLeagueName(name: string) {
    switch (name) {
      case "English Premier League":
        return "Premier League";
      case "Spanish La Liga":
        return "La Liga";
      case "Italian Serie A":
        return "Serie A";
      case "German Bundesliga":
        return "Bundesliga";
      case "French Ligue 1":
        return "Ligue 1";
      case "Spanish La Liga 2":
        return "La Liga 2";
      case "English League Championship":
        return "Championship";
      case "Italian Serie B":
        return "Serie B";
      case "German 2. Bundesliga":
        return "2. Bundesliga";
      case "French Ligue 2":
        return "Ligue 2";
      case "UEFA Champions League":
        return "Champions League";
      case "UEFA Europa League":
        return "Europa League";
      case "UEFA Conference League":
        return "Conference League";
      case "Spanish Primera RFEF Group 1":
        return "1ª RFEF Grupo 1";
      case "Spanish Primera RFEF Group 2":
        return "1ª RFEF Grupo 2";
    }
  }
  return { formatLeagueName };
}
