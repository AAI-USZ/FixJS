function ($box, $slides, settings) {
      var $parent = $box.parent()
        , width = $parent.innerWidth()
        , height = $parent.innerHeight()
        , positioning = {
            position: 'absolute'
          , top: 0
          , left: 0
        };
        
      // cache original css
      adaptor._cacheOriginalCSS($box, 'box', settings, [
          vendorPrefix + 'transform'
        , vendorPrefix + 'transition'
        , vendorPrefix + 'transform-style'
      ]);
      adaptor._cacheOriginalCSS($slides, 'slides', settings, [
        vendorPrefix + 'transform'
      ]);
      adaptor._cacheOriginalCSS($parent, 'viewport', settings, [
        vendorPrefix + 'perspective'
      ]);
      
      // apply new css
      $slides.css(positioning);
      $box.css($.extend(positioning, { width: width, height: height }));

      // ensure parent is positioned to hold the box
      if ('static inherit'.indexOf($parent.css('position')) !== -1) {
        $parent.css('position', 'relative');
      }

      if (supports3D) {
        // set the Z axis translation amount on the settings for this box
        settings.translateZ = settings.effect === 'scrollVert3d' ? height / 2 : width / 2;
        settings.bsangle = 0;

        // set the parent as the 3D viewport
        $parent.css(vendorPrefix + 'perspective', settings.perspective);
        $parent.css('overflow', 'visible');

        // apply transforms before transition to stop initial animation
        $box.css(vendorPrefix + 'transform-style', 'preserve-3d');
        $box.css(
            vendorPrefix + 'transform'
          , 'translate3d(0, 0, -' + settings.translateZ + 'px)'
        );

        // set front slide
        $slides.eq(0).css(
            vendorPrefix + 'transform'
          , 'rotate3d(0, 1, 0, 0deg) translate3d(0, 0, ' +
            settings.translateZ + 'px)'
        );

        // wait then apply transition for box rotation
        setTimeout(function () { adaptor.reset($box, settings); }, 10);
      }
      else { // using fade hide all but first slide
        $slides.filter(':gt(0)').hide();
      }
    }