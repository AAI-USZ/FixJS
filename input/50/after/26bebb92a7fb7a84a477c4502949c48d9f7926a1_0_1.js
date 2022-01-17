function(dateText, inst) {
      var date = $(this).datepicker('getDate');
      setCurrentWeek($(this), date, inst);
      selectCurrentWeek();
      $('#week-tab-trigger').trigger('click');
    }