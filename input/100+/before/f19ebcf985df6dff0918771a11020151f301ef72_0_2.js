function(field_id) {
      $('#'+field_id).ColorPicker({
        onSubmit: function(hsb, hex, rgb) {
          $('#'+field_id).val('#'+hex);
        },
        onBeforeShow: function () {
          $(this).ColorPickerSetColor(this.value);
          return false;
        },
        onChange: function (hsb, hex, rgb) {
          var bc = $.inArray(hex, [ 'FFFFFF', 'FFF', 'ffffff', 'fff' ]) != -1 ? 'ccc' : hex;
          $('#cp_'+field_id).css({'backgroundColor':'#'+hex,'borderColor':'#'+bc});
          $('#cp_'+field_id).prev('input').attr('value', '#'+hex);
        }
      })	
      .bind('keyup', function(){
        $(this).ColorPickerSetColor(this.value);
      });
    }