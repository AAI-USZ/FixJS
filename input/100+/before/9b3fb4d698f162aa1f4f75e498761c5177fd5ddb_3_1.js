function () {
           
           //only perform the changes if we have more than 1 number selected
           var counterForAlreadySelectedNumbers = 0;
           _.each(checkedPhoneNumbers.models, function (wp) {
              if (wp.get('CheckedStatus') === true) {
                 counterForAlreadySelectedNumbers++;
              }
           });
           if ((this.model.attributes.CheckedStatus && counterForAlreadySelectedNumbers >= 2) || !this.model.attributes.CheckedStatus) {
              //change the checkedStatus
              this.model.attributes.CheckedStatus = !this.model.get('CheckedStatus');
              var checkboxImg = $("img", this.$el);

              if (this.model.get('CheckedStatus') === true) {
                 this.$el.removeClass('phoneNumberUnselected');
                 this.$el.addClass('phoneNumberSelected');
                 setCheckboxState(checkboxImg, true);
              }
              else {
                 this.$el.removeClass('phoneNumberSelected');
                 this.$el.addClass('phoneNumberUnselected');

                 setCheckboxState(checkboxImg, false);
              }
              //make sure we start from the initial view where all the phone numbers are selected
              var checkedPhoneNumbersArray = [];
              _.each(checkedPhoneNumbers.models, function (wp) {
                 if (wp.get('CheckedStatus') === true) {
                    checkedPhoneNumbersArray.push(wp.get('TelNumber'));
                 }
              });
              $(document).trigger('selectedWPsChanged', { 'checkedPhoneNumbers': checkedPhoneNumbersArray });
           }
         
          
        }