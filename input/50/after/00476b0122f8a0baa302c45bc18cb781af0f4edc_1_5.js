function getYearFromAbbreviation(year) {
    return round(new date().getFullYear() / 100) * 100 - round(year / 100) * 100 + year;
  }