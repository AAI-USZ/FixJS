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
   var startDatePicker =   $("#startDateTimePicker");
   startDatePicker.datepicker({ currentText: "Now", dateFormat: "dd-mm-yy", showButtonPanel: true });   
   this.defaultStartDate = $.datepicker.formatDate('yy-mm-dd', startDatePicker.datepicker("getDate"));
   var endDatePicker  = $("#endDateTimePicker");
   endDatePicker.datepicker({ dateFormat: "dd-mm-yy" });
   this.defaultEndDate = $.datepicker.formatDate('yy-mm-dd',endDatePicker.datepicker("getDate"));
   this.dateFilteringEnabled = false;

   this.startDate = null;
   this.endDate = null;
   $("#includeDateInFilter").bind('click', function () {
      //set internal state
      if (self.dateFilteringEnabled) {
         self.dateFilteringEnabled = false;
      }
      else {
         self.dateFilteringEnabled = true;
      }
      //change checkbox state
      setCheckboxState($(this), self.dateFilteringEnabled);

      //get the values for start/end date
      var startDatePicker = $("#startDateTimePicker");
      var newStartDate = $.datepicker.formatDate('yy-mm-dd', startDatePicker.datepicker("getDate"));
      var endDatePicker = $("#endDateTimePicker");
      var newEndDate = $.datepicker.formatDate('yy-mm-dd', endDatePicker.datepicker("getDate"));
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