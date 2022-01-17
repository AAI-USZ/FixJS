function(e){
  
    e.preventDefault();
    if(cwrc_params.position < cwrc_params.page_count -1){
      $('#page-prev').css('opacity', '1').removeClass('disabled');
     
      var selector = "#page_choose option[value='" + cwrc_params.position + "']";
      $(selector).removeAttr('selected');
      
      cwrc_params.position++;
      selector = "#page_choose option[value='" + cwrc_params.position + "']";
      $(selector).attr('selected','selected');
      PID = cwrc_params.pages[ cwrc_params.position];
    
      writer.fm.loadEMICDocument();
      init_canvas_div();
      $('#header h1').text( cwrc_params.title + " - Seq # " + (parseInt(cwrc_params.position)));
      if(cwrc_params.position == cwrc_params.pages_count -1){
        $('#page-next').css('opacity', '.2').addClass('disabled');
      }
    }
  }