function changeContainer(numContainers, platform, seqrefId) {
  Fluxion.doAjax(
          'runControllerHelperService',
          'changeContainer',
          {'platform':platform, 'run_cId':jQuery('input[name=run_cId]').val(), 'numContainers':numContainers, 'sequencerReferenceId':seqrefId, 'url':ajaxurl},
          {'updateElement':'containerdiv'});
}