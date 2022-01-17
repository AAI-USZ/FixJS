function changeContainerPlatformType(form) {
  Fluxion.doAjax(
          'containerControllerHelperService',
          'changePlatformType',
          {'platformtype':form.value, 'container_cId':jQuery('input[name=container_cId]').val(), 'url':ajaxurl},
          {'doOnSuccess':
                  function(json) {
                    jQuery('#sequencerReferenceSelect').html(json.sequencers);
                  }
          }
          );
}