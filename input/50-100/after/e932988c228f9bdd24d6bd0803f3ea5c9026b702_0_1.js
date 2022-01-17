function(dateText, inst) {
        if(typeof(dateText) == "string" && dateText.search(/{.*?}/) == -1 && dateText != ""){
          date = moment(dateText,i18n.date.L).toDate();
          DailyNavigator.gotoDate(date);
        }
      }