function getYearFromAbbreviation(year) {
    return (new date().getFullYear() / 100).round() * 100 - (year / 100).round() * 100 + year;
  }