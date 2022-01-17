function populateRunOptions(form, runId) {
  if (form.value != 0) {
    Fluxion.doAjax(
      'runControllerHelperService',
      'populateRunOptions',
      {'sequencerReference':form.value, 'runId':runId, 'url':ajaxurl},
      {'doOnSuccess':
        function(json) {
          jQuery('#runPartitions').html(json.partitions);
        }
      }
    );
  }
}