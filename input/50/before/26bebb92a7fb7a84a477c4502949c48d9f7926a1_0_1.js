function(dateText, inst) {
      var date = $(this).datepicker('getDate');
      setCurrentWeek($(this), date, inst);
      selectCurrentWeek();
      $('#date-nav-tab li.week').trigger('click');
    }