function _renderDay(date) {
      var hours,
          month = Calendar.Calc.today.getMonth(),
          id = Calendar.Calc.getDayId(date),
          state,
          units,
          busytimes = this.app.store('Busytime');

      hours = busytimes.getHours(date);
      units = this._getBusyUnits(hours);
      state = Calendar.Calc.relativeState(
        date,
        this.controller.currentMonth
      );

      return template.day.render({
        id: this._dayId(id),
        dateString: id,
        state: state,
        date: date.getDate(),
        busy: this._renderBusyUnits(id, units)
      });
    }