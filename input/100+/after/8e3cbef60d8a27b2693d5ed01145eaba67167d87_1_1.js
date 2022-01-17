function getPool(t) {
  var a = jQuery(t);
  var platform = jQuery("input[name='platformTypes']:checked").val();
  var pNum = a.attr("partition");
  Fluxion.doAjax(
    'containerControllerHelperService',
    'getPoolByBarcode',
    {'platform':platform, 'container_cId':jQuery('input[name=container_cId]').val(), 'partition':pNum, 'barcode':a.val(),'url':ajaxurl},
    {'doOnSuccess':function(json) {
      if (json.err) {
        jQuery("#msg"+pNum).html(json.err);
      }
      else {
        a.parent().html(json.html);
      }
    }});
}