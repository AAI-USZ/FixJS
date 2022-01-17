function(elemId, openConfig) {
  if ($(elemId)) {
    var openConfigObj = $H(celanimOverlay_getDimensionsFromElem($(elemId))
      ).merge({ id : elemId }).merge(openConfig).toObject();
    if (openConfigObj.src && openConfigObj.width && openConfigObj.height) {
      if (!openConfigObj.cssClassNames) {
        openConfigObj.cssClassNames = [];
      }
      celanimOverlay_openConfig.set(elemId, openConfigObj);
      $(elemId).setStyle({
        'cursor' : "url(/file/resources/celJS/highslide/graphics/zoomin.cur), pointer"
      });
      $(elemId).observe('click', celanimOverlay_OpenInOverlay);
      $(elemId).observe('celanim_overlay:openOverlay', celanimOverlay_OpenInOverlay);
    } else {
      if ((typeof console != 'undefined') && (typeof console.warn != 'undefined')) {
        console.warn('Skipping add open config because one of the required config fields'
           +' (src, width, height) is missing for id "' + elemId + '".', openConfigObj);
      }
    }
  } else {
    if ((typeof console != 'undefined') && (typeof console.warn != 'undefined')) {
      console.warn('Skipping add open config because no element with id "' + elemId
          + '" found.');
    }
  }
}