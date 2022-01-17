function changePlatformType(form, runId) {
  Fluxion.doAjax(
    'runControllerHelperService',
    'changePlatformType',
    {'platformtype':form.value, 'runId':runId, 'url':ajaxurl},
    {'doOnSuccess':
      function(json) {
        jQuery('#sequencerReferenceSelect').html(json.sequencers);
        poolSearch("", jQuery('input[name=platformType]:checked').val());
      }
    }
  );
}