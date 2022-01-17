function() {
  $.datepicker.setDefaults( $.datepicker.regional[ gon.locale ] );
  $('input.date_picker').live('focus', function(){
    $(this).datepicker({ dateFormat: "yy-mm-dd" });
  });
}