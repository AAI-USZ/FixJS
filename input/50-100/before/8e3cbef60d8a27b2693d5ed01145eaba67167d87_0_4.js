function lookupContainer(t, containerNum) {
  var barcode = jQuery('#sequencerPartitionContainers' + containerNum + '\\.identificationBarcode').val();
  if (!isNullCheck(barcode)) {
    Fluxion.doAjax(
      'runControllerHelperService',
      'lookupContainer',
      {'barcode':barcode,'containerNum':containerNum,'url':ajaxurl},
      {'doOnSuccess': processLookup}
    );
  }
}