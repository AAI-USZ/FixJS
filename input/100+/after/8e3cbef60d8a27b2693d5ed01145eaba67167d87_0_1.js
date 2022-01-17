function getPool(t, containerNum) {
  var a = jQuery(t);
  var platform = jQuery("input[name='platformTypes']:checked").val();
  var pNum = a.attr("partition");
  Fluxion.doAjax(
    'runControllerHelperService',
    'getPoolByBarcode',
    {'platform':platform, 'run_cId':jQuery('input[name=run_cId]').val(), 'container':containerNum, 'partition':pNum, 'barcode':a.val(),'url':ajaxurl},
    {'doOnSuccess':function(json) {
      if (json.err) {
        jQuery("#msg" + pNum).html(json.err);
      }
      else {
        a.parent().html(json.html);
      }
    }});
}