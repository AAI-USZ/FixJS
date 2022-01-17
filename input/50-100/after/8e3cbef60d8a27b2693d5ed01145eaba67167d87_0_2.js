function populateRunOptions(form, runId) {
  if (form.value != 0) {
    Fluxion.doAjax(
      'runControllerHelperService',
      'populateRunOptions',
      {'sequencerReference':form.value, 'run_cId':jQuery('input[name=run_cId]').val(), 'runId':runId, 'url':ajaxurl},
      {'doOnSuccess':
        function(json) {
          jQuery('#runPartitions').html(json.partitions);
        }
      }
    );
  }
}