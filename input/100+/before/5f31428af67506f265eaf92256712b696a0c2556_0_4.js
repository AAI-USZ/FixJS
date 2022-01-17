function page_size() {
      var page = jQuery.parseJSON($('#page_size :selected').val());
      $( "#img_label" ).css('width',page.width).css('height', page.height).css('text-align','center').css('vertical-align', 'middle');      
   }