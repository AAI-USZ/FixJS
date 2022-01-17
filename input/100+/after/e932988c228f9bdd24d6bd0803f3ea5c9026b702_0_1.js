function() {
    $.datepicker.setDefaults({
      closeText: i18n.close,
      prevText: '&lt;',
      nextText: '&gt;',
      currentText: i18n.today,
      monthNames: i18n.months.full,
      monthNamesShort: i18n.months.trunc,
      dayNames: i18n.days.full,
      dayNamesShort: i18n.days.trunc,
      dayNamesMin: i18n.days.trunc,
      weekHeader: 'Wo',
      dateFormat: i18n.date.XS.replace(/D/g, "d").replace(/M/g, "m").replace(/Y/g, "y"), //note jquery uses small m for months
      firstDay: i18n.days.first,
      isRTL: false,
      showMonthAfterYear: false,
      yearSuffix: ''
    });
    
    $('#daily .content_navigation #datepicker').datepicker({
      minDate: new Date(),
      defaultDate: DailyNavigator.current_date,
      onClose: function(dateText, inst) {
        if(typeof(dateText) == "string" && dateText.search(/{.*?}/) == -1 && dateText != ""){
          date = moment(dateText,i18n.date.L).toDate();
          DailyNavigator.gotoDate(date);
        }
      }
    });
    
    $('#daily .content_navigation .datepicker').bind("click", function() {
      $('#daily .content_navigation #datepicker').datepicker("show");
    });
  }