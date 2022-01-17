function(userOptions) {
    // if first parameter is string, then call the method with the same name
    if (typeof userOptions == 'string') {
      if( typeof methods[userOptions] == 'function' ){
        return this.each(methods[userOptions]);
      } else {
        console.warn('[$.swipePanel] Unknown method: '+userOptions);
      }
    }

    var options = $.extend({}, $.swipePanel, userOptions);
    if (options.vertical) {
      options._dimension = 'height';
      options._direction = 'top';
      options._axis = 'Y';
    } else {
      options._dimension = 'width';
      options._direction = 'left';
      options._axis = 'X';
    }

    return this.each(function() {
      var components = {
        root: $(this),
        rootSize: $(this)[options._dimension](),
        // wrapper for all the children in the root - used to scroll
        container: options.container || $(document.createElement('div')),
        containerSize: null,
        pivot: 0
      };

      components.root.data('swipePanel', {
        components: components,
        options: options
      });

      if (options.disableDrag) {
        components.container.find(options.disableDrag)
          .live('dragstart', function(event) { event.preventDefault(); });
      }

      // add mouse events
      var stopSlideMouse = function(event) {
        pointerUp(components, event);
      };

      components.root
        .bind('mouseleave.stopSlide', stopSlideMouse)
        .bind('mouseup.stopSlide', stopSlideMouse)
        .bind('mousedown.startSlide', function(event) {
          pointerDown(components, options, event);
        })
        .bind('mousewheel.startSlide', function(event, delta) {
          event.preventDefault();
          event.stopPropagation();
          changePosition(components, options, delta * options.scrollSize);
        });

        // add touch events
        var stopSlide = function(event) {
          var e = event.originalEvent;
          components.pivot = null;
        }

        components.root
          .bind('touchstart.startSlide', function(event) {
            event.stopPropagation();
            var e = event.originalEvent;
            components.pivot = e.touches[0]['page'+options._axis];
          })
          .bind('touchmove.slide', function(event) {
            event.preventDefault();
            event.stopPropagation();
            var e = event.originalEvent;
            var pivot = e.touches[0]['page'+options._axis];
            changePosition(components, options, pivot - components.pivot);
            components.pivot = pivot;
          })
          .bind('touchleave.stopSlide', stopSlide)
          .bind('touchcancel.stopSlide', stopSlide)
          .bind('touchend.stopSlide', stopSlide);

      // update container if it is not a custom one
      if (!options.container){
        components.container
          .append(components.root.find(options.children))
          .appendTo(components.root);
      }

      // remember the initial CSS of the container and update its Size
      var oldAttributes = {};
      var cssAttr = ['width', 'height', 'position', 'left', 'top'];
      for (var i=0; i<cssAttr.length; ++i) {
        oldAttributes[cssAttr[i]] = components.container.css(cssAttr[i]);
      }
      components.container
        .data('origCSS', oldAttributes)
        .css({
          position: 'relative'
        })
      updateRealInnerSize(components, options);
    });
  }