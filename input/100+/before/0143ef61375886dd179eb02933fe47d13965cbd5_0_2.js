function() {
      var components = {
        root: $(this),
        rootWidth: $(this).width(),
        // wrapper for all the children in the root - used to scroll
        container: /*options.container || */$(document.createElement('div')),
        containerWidth: null,
        pivot: 0
      };

      components.root.data('swipePanel', {
        components: components,
        options: options
      });

      updateRealInnerWidth(components, options);

      // add mouse events
      var stopSlideMouse = function(event) {
        pointerUp(components, event);
      };

      components.root
        .bind('mouseleave.stopSlide', stopSlideMouse)
        .bind('mouseup.stopSlide', stopSlideMouse)
//        .find(options.children)
//        .add(components.container)
        .bind('mousedown.startSlide', function(event) {
          pointerDown(components, event);
        })
        .bind('mousewheel.startSlide', function(event, delta) {
          event.preventDefault();
          event.stopPropagation();
          changePosition(components, delta * options.scrollSize);
        });

        // add touch events
        var stopSlide = function(event) {
          var e = event.originalEvent;
          components.pivot = null;
        }

        components.root
          .bind('touchstart.startSlide', function(event) {
            event.preventDefault();
            event.stopPropagation();
            var e = event.originalEvent;
            components.pivot = e.touches[0].pageX;
          })
          .bind('touchmove.slide', function(event) {
            event.preventDefault();
            event.stopPropagation();
            var e = event.originalEvent;
            var pivot = e.touches[0].pageX;
            changePosition(components, pivot - components.pivot);
            components.pivot = pivot;
          })
          .bind('touchleave.stopSlide', stopSlide)
          .bind('touchcancel.stopSlide', stopSlide)
          .bind('touchend.stopSlide', stopSlide);

      // update wrapper
      components.container
        .append(components.root.children())
        .appendTo(components.root);
    }