function changePlatformType(form, runId) {
  Fluxion.doAjax(
    'runControllerHelperService',
    'changePlatformType',
    {'platformtype':form.value, 'run_cId':jQuery('input[name=run_cId]').val(), 'runId':runId, 'url':ajaxurl},
    {'doOnSuccess':
      function(json) {
        jQuery('#sequencerReferenceSelect').html(json.sequencers);
        poolSearch("", jQuery('input[name=platformType]:checked').val());
      }
    }
  );
}