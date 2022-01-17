function(event) {
  if ((typeof console != 'undefined') && (typeof console.debug != 'undefined')) {
    console.debug('celanimOverlay_OpenInOverlay: ', this, ', ', event);
  }
  var openConfig = celanimOverlay_openConfig.get(this.id);
  if (openConfig) {
    var hsConfig = $H({
        dimmingOpacity: 0.75,
        dragByHeading : false,
        objectHeight: openConfig.height, //important for IE!!!
        align : 'center',
        preserveContent : false
      }).merge(openConfig);
    if (hsConfig.get('objectType') == 'image') {
      hsConfig = celanimOverlay_HandleImageContent(hsConfig);
    }
    hs.graphicsDir = '/file/resources/celJS/highslide/graphics/';
    hs.outlineType = hsConfig.outlineType || '';
    if (openConfig.addNavigation) {
      openConfig.cssClassNames.push('celanim_addNavigation');
    }
    hs.wrapperClassName = 'no-footer no-move celanim_overlay_wrapper '
      + openConfig.cssClassNames.join(' ');
    hs.height = hsConfig.get('height');
    hs.width = hsConfig.get('width');
    hs.Expander.prototype.onBeforeExpand = celanimOverlay_BeforeExpandHandler;
    hs.Expander.prototype.onAfterExpand = celanimOverlay_AfterExpandHandler;
    hs.Expander.prototype.onAfterClose = celanimOverlay_AfterCloseHandler;
    hs.htmlExpand(this, hsConfig.toObject());
    event.stop();
  } else {
    if ((typeof console != 'undefined') && (typeof console.warn != 'undefined')) {
      console.warn('Skipping open-in-overlay event, because no open config for elemId"'
          + this.id + '" found.');
    }
  }
}