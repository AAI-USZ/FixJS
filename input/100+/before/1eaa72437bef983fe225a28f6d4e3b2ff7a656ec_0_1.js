function() {
            // todays date values
        var todayDate = new Date(),
            todayYear = todayDate.getFullYear(),
            todayMonth = todayDate.getMonth() + 1,
            todayDay = todayDate.getDate(),
            // currently selected values
            selectedYear = parseInt($year.val(), 10),
            selectedMonth = parseInt($month.val(), 10),
            selectedDay = parseInt($day.val(), 10),
            // number of days in currently selected year/month
            actMaxDay = (new Date(selectedYear, selectedMonth, 0)).getDate(),
            // max values currently in the markup
            curMaxMonth = parseInt($month.children(":last").val()),
            curMaxDay = parseInt($day.children(":last").val());

        // Dealing with the number of days in a month
        // http://bugs.jquery.com/ticket/3041
        if (curMaxDay > actMaxDay) {
          while (curMaxDay > actMaxDay) {
            $day.children(":last").remove();
            curMaxDay--;
          }
        } else if (curMaxDay < actMaxDay) {
          while (curMaxDay < actMaxDay) {
            curMaxDay++;
            $day.append("<option value=" + curMaxDay + ">" + curMaxDay + "</option>");
          }
        }

        // Dealing with future months/days in current year
        // or months/days that fall after the minimum age
        if (!settings["futureDates"] && selectedYear == startYear) {
          if (curMaxMonth > todayMonth) {
            while (curMaxMonth > todayMonth) {
              $month.children(":last").remove();
              curMaxMonth--;
            }
            // reset the day selection
            $day.children(":first").attr("selected", "selected");
          }
          if (selectedMonth === todayMonth) {
              while (curMaxDay > todayDay) {
                  $day.children(":last").remove();
                  curMaxDay -= 1;
              }
          }
        }

        // Adding months back that may have been removed
        // http://bugs.jquery.com/ticket/3041
        if (selectedYear != startYear && curMaxMonth != 12) {
          while (curMaxMonth < 12) {
            $month.append("<option value=" + (curMaxMonth+1) + ">" + months[settings["monthFormat"]][curMaxMonth] + "</option>");
            curMaxMonth++;
          }
        }

        // update the hidden date
        if ((selectedYear * selectedMonth * selectedDay) != 0) {
          hiddenDate = selectedYear + "-" + selectedMonth + "-" + selectedDay;
          $(this).find('#'+settings["fieldId"]).val(hiddenDate);
          if (settings["onChange"] != null) {
            settings["onChange"](hiddenDate);
          }
        }
      }