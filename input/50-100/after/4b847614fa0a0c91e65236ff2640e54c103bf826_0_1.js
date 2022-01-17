function(){
        $('#pools-information').fadeIn('fast');

        $('#pools-information li').fadeIn('fast');

        that.plateElement.find('.aliquot').
          removeClass(that.plate.state).
          removeClass('selected-aliquot dimmed');

        that.colourPools();

        that.control.find('input:radio[name=radio-choice-1]:eq(1)').
          attr('checked',true);


        that.control.find('input:radio').checkboxradio("refresh");
      }