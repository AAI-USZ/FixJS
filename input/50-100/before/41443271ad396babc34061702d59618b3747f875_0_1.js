function(){
        $('#pools-information').fadeIn('fast');

        that.plateElement.find('.aliquot').
          removeClass(that.plate.state);

        that.colourPools();

        that.control.find('input:radio[name=radio-choice-1]:eq(1)').
          attr('checked',true);

        that.control.find('input:radio').checkboxradio("refresh");
      }