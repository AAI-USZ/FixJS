function changeContainer(numContainers, platform, seqrefId) {
  Fluxion.doAjax(
          'containerControllerHelperService',
          'changeContainer',
          {'platform':platform, 'container_cId':jQuery('input[name=container_cId]').val(), 'numContainers':numContainers, 'sequencerReferenceId':seqrefId, 'url':ajaxurl},
          {'updateElement':'containerdiv'});
}