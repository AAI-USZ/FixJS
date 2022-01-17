function() {
  if (!this.getElement()) {
    return;
  }

  var date = this.activeMonth_.clone();
  date.setDate(1);

  // Show year name of select month
  if (this.elMonthYear_) {
    goog.dom.setTextContent(this.elMonthYear_,
        goog.date.formatMonthAndYear(
            this.symbols_.STANDALONEMONTHS[date.getMonth()],
            date.getFullYear()));
  }
  if (this.elMonth_) {
    goog.dom.setTextContent(this.elMonth_,
        this.symbols_.STANDALONEMONTHS[date.getMonth()]);
  }
  if (this.elYear_) {
    goog.dom.setTextContent(this.elYear_, String(date.getFullYear()));
  }

  var wday = date.getWeekday();
  var days = date.getNumberOfDaysInMonth();

  // Determine how many days to show for previous month
  date.add(new goog.date.Interval(goog.date.Interval.MONTHS, -1));
  date.setDate(date.getNumberOfDaysInMonth() - (wday - 1));

  if (this.showFixedNumWeeks_ && !this.extraWeekAtEnd_ && days + wday < 33) {
    date.add(new goog.date.Interval(goog.date.Interval.DAYS, -7));
  }

  // Create weekday/day grid
  var dayInterval = new goog.date.Interval(goog.date.Interval.DAYS, 1);
  this.grid_ = [];
  for (var y = 0; y < 6; y++) { // Weeks
    this.grid_[y] = [];
    for (var x = 0; x < 7; x++) { // Weekdays
      this.grid_[y][x] = date.clone();
      date.add(dayInterval);
    }
  }

  this.redrawCalendarGrid_();
}