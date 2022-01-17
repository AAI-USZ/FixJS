function() {
          if (previous) {
            // rearrange links in the linked list
            previous.set('nextId', nextId);
            previous.save();
          } else {
            // removing the first element, so reset the head
            var next = elementGroup.get(nextId);
            if (next) {
              next.set('head', true);
              next.save();
            } else {
              // this is also the last element; add the empty class to the
              // component and the type label
              $component.addClass('empty');
              $component.text($component.data('model').get('type'));
            }
          }

          $element.remove();
        }