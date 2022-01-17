function changeContainer(numContainers, platform, seqrefId) {
  Fluxion.doAjax(
          'containerControllerHelperService',
          'changeContainer',
          {'platform':platform, 'numContainers':numContainers, 'sequencerReferenceId':seqrefId, 'url':ajaxurl},
          {'updateElement':'containerdiv'});
}