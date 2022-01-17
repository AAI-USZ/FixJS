function (index, elem) {
      var options = core.getCommentedData(elem);

      jQuery('input', jQuery(elem)).datepicker(
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