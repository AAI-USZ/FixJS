function(event) {
          console.log('measureEditView.addOverlay');
          var $overlay = $(this.el).find('.input_overlay'),
              overlay_height = $overlay.height(),
              overlay_width = $overlay.width(),
              $target = $(event.target),
              target_height = $target.height(),
              target_width = $target.width(),
              target_offset = $target.offset(),
              position_left = target_offset.left + target_width + 3,
              position_top = target_offset.top - 2,
              target_type = $target.attr('name').split('_')[0];

          console.log('target_type', target_type);    

          $overlay
            .css({'left': position_left, 'top': position_top})
            .removeClass('hide');

          OverlayView.trigger('overlay:type', target_type);            
        }