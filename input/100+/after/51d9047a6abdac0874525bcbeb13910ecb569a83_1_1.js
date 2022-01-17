function () {
      //set internal state
      self.dateFilteringEnabled = !self.dateFilteringEnabled;
      //if (self.dateFilteringEnabled) {
      //   self.dateFilteringEnabled = false;
      //}
      //else {
      //   self.dateFilteringEnabled = true;
      //}
      //change checkbox state
      setCheckboxState($(this), self.dateFilteringEnabled);

      //get the values for start/end date
      var startDatePicker = $("#startDateTimePicker");
      var newStartDate = $.datepicker.formatDate(dateFormatForDatePicker, startDatePicker.datepicker("getDate"));
      var endDatePicker = $("#endDateTimePicker");
      var newEndDate = $.datepicker.formatDate(dateFormatForDatePicker, endDatePicker.datepicker("getDate"));
      //trigger filtering if required
      if (self.defaultStartDate !== newStartDate || self.defaultEndDate !== newEndDate) {
         self.startDate = newStartDate;
         self.endDate = newEndDate;
         $(document).trigger('refreshConversationList');
      }
   }