function FilterArea() {
   var self = this;
   $("#filterTag").tagsInput({
      'height': '22px',
      'width': 'auto',
      'autocomplete_url': "Tags/FindMatchingTags",
      'onAddTag': function (tagValue) {
         var delimiter = ',';
         self.tagsForFiltering = $("#filterTag").val().split(delimiter);
         if (self.tagFilteringEnabled) {
            $(document).trigger('refreshConversationList');
         }
      },
      'onRemoveTag': function(tagValue) {
         var delimiter = ',';
         self.tagsForFiltering = $("#filterTag").val().split(delimiter);
         //if there are no tags the split will return [""] and this will be sent to the server
         //we guard agains this
         if ("" === self.tagsForFiltering[0]) {
            self.tagsForFiltering = [];
         }
         if (self.tagFilteringEnabled) {
            $(document).trigger('refreshConversationList');
         }
      }
   });  
   this.tagsForFiltering = [];

   this.tagFilteringEnabled = false;
   $("#includeTagsInFilter").bind('click', function () {
      //set internal state
      if (self.tagFilteringEnabled) {
         self.tagFilteringEnabled = false;       
      }
      else {
         self.tagFilteringEnabled = true;        
      }
      //change checkbox state
      setCheckboxState($(this), self.tagFilteringEnabled);
      //trigger filtering if required
      if (self.tagsForFiltering.length != 0) {
         $(document).trigger('refreshConversationList');
      }
   });

   
   //TODO add option to specify which language to use (according to selected language)
   var startDatePicker = $("#startDateTimePicker");
   this.previousStartDate = $.datepicker.formatDate(dateFormatForDatePicker, startDatePicker.datepicker("getDate"))
   startDatePicker.datepicker({
      dateFormat: dateFormatForDatePicker,
      onClose: function (dateText, inst) {
         //compare the new value with the previous value
         //if changed and date filtering is checked, trigger refreshConversationList
         if (self.previousStartDate !== dateText)
         {
            //the date has been modified
            self.previousStartDate = dateText;
            self.startDate = dateText;
            if (self.dateFilteringEnabled) {
               $(document).trigger('refreshConversationList');
            }
         }
         
      }
   });
   this.defaultStartDate = $.datepicker.formatDate(dateFormatForDatePicker, startDatePicker.datepicker("getDate"));
   var endDatePicker = $("#endDateTimePicker");
   this.previousEndDate = $.datepicker.formatDate(dateFormatForDatePicker, endDatePicker.datepicker("getDate"))
   endDatePicker.datepicker({
      dateFormat: dateFormatForDatePicker,
      onClose: function (dateText, inst) {
         //compare the new value with the previous value
         //if changed and date filtering is checked, trigger refreshConversationList
         if (self.previousEndDate !== dateText) {
            //the date has been modified
            self.previousEndDate = dateText;
            self.endDate = dateText;
            if (self.dateFilteringEnabled) {
               $(document).trigger('refreshConversationList');
            }
         }

      }
   });
   this.defaultEndDate = $.datepicker.formatDate(dateFormatForDatePicker,endDatePicker.datepicker("getDate"));
   this.dateFilteringEnabled = false;

   this.startDate = null;
   this.endDate = null;
   $("#includeDateInFilter").bind('click', function () {
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
   });

   this.starredFilteringEnabled = false;
  
   $("#includeStarredInFilter").bind('click', function () {
      //set internal state
      if (self.starredFilteringEnabled) {
         self.starredFilteringEnabled = false;
      }
      else {
         self.starredFilteringEnabled = true;
      }
      //change checkbox state
      setCheckboxState($(this), self.starredFilteringEnabled);      
      //trigger filtering if required
      $(document).trigger('refreshConversationList');     
   });

}