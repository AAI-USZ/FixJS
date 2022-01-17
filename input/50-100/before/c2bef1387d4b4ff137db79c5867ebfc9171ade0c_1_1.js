function (index, elem) {
      var options = core.getCommentedData(elem);

      jQuery('input', elem).datepicker(
        {
          dateFormat:        options.dateFormat,
          gotoCurrent:       true,
          yearRange:         options.highYear + '-' + options.lowYear,
          showButtonPanel:   false,
          beforeShow:        datePickerPostprocess,
          selectOtherMonths: true
        }
      );
    }