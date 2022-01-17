function changeContainer(numContainers, platform, seqrefId) {
  Fluxion.doAjax(
          'runControllerHelperService',
          'changeContainer',
          {'platform':platform, 'numContainers':numContainers, 'sequencerReferenceId':seqrefId, 'url':ajaxurl},
          {'updateElement':'containerdiv'});
}