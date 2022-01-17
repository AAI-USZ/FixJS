function(dateText, inst) {
        if(typeof(dateText) == "string" && dateText.search(/{.*?}/) == -1 && dateText != ""){
          date = $.datepicker.parseDate(i18n.date.L, dateText);
          DailyNavigator.gotoDate(date);
        }
      }