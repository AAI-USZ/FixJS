function changeContainerPlatformType(form) {
  Fluxion.doAjax(
          'containerControllerHelperService',
          'changePlatformType',
          {'platformtype':form.value, 'url':ajaxurl},
          {'doOnSuccess':
                  function(json) {
                    jQuery('#sequencerReferenceSelect').html(json.sequencers);
                  }
          }
          );
}