function submit_host(form){
  var url = window.location.pathname.replace(/\/edit|\/new/,'');
  $('#host_submit').attr('disabled', true);
  stop_pooling = false;
  $("body").css("cursor", "progress");
  clear_errors();
  animate_progress();

  $.ajax({
    type:'POST',
    url: url,
    data: form.serialize(),
    success: function(response){
      if(response.redirect){
        window.location.replace(response.redirect);
      }
      else{
        $("#host-progress").hide();
        $('#content').replaceWith($("#content", response));
        onContentLoad();
        onHostEditLoad();
      }
    },
    error: function(response){
      $('#content').html(response.responseText);
    },
    complete: function(){
      stop_pooling = true;
      $("body").css("cursor", "auto");
      $('#host_submit').attr('disabled', false);
    }
  });
  return false;
}