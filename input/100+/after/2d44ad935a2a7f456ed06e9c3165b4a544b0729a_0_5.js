function onHostEditLoad(){
  $("#host-conflicts-modal").modal({show: "true", backdrop: "static"});
   $('#host-conflicts-modal').click(function(){
     $('#host-conflicts-modal').modal('hide');
   });
  var $form = $("[data-submit='progress_bar']");
  $form.on('submit', function(){
    submit_host($form);
    return false;
  });

  $('#host_provision_method_build').on('click', function(){
    $('#network_provisioning').show();
    $('#image_provisioning').hide();
  });
  $('#host_provision_method_image').on('click', function(){
    $('#network_provisioning').hide();
    $('#image_provisioning').show();
  });

  $('#image_selection').appendTo($('#image_provisioning'));
  $('#params-tab').on('shown', function(){mark_params_override()});

  $('[id^="selected_puppetclass_"] > [data-tag="edit"]').each(function(){
    var $e = $(this);
    var id = $e.attr('data-class-id');
    var params = $('[id^="puppetclass_'+id+'_params\\["]');
    if (params.find('.error').length > 0)
      $e.addClass('error');
    else if (params.find('.warning').length > 0)
      $e.addClass('warning');
  })
}