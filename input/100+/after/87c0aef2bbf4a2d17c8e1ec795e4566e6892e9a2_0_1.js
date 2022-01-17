function (e) {
          var key = e.keyCode || e.which,
              toolbar = $(".editableToolbar"),
              save = toolbar.find(".save"),
              cancel = toolbar.find(".cancel");

          if (save.is(":visible")) {
            var target = toolbar.get(0).target,
                entity = target.entity,
                id = entity.id,
                next = id + 1,
                entities = Pontoon.project.entities;

            if (key === 13) { // Enter: confirm translation
              save.click();
              hideToolbar(target);
              return false;
            }

            if (key === 27) { // Esc: status quo
              cancel.click();
              hideToolbar(target);
              return false;
            }

            if (key === 9) { // Tab: status quo + move around entities
              // If on last entity, jump to the first
              if (next > entities.length) {
              	$.each(entities, function() {
                  if (this.body) {
                    next = this.id;
                  }
                });
              }
              cancel.click();
              $(target).removeClass("hovered");
              postMessage("HOVER", id);
              entities[next].hover();
              $(".editableToolbar > .edit").click();
              return false;
            }
          }
        }