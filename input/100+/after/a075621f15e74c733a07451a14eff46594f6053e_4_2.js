function(event, ui) {
            var $element = $(ui.item);
            var model = $element.data('model');

            var $newPreviousElement = $element.prev();
            var $newNextElement = $element.next();

            var oldPreviousModel;
            var oldNextModel;

            var newPreviousModel;
            var newNextModel;

            if ($oldPreviousElement.length === 1) {
              // old previous element exists; update its next
              oldPreviousModel = $oldPreviousElement.data('model');
              oldPreviousModel.set({ nextId: model.get('nextId') });
            } else {
              // no old previous element; the old next element is now the head
              // old next element must exist; otherwise, list order could not update
              window.$oldNextElement = $oldNextElement;
              oldNextModel = $oldNextElement.data('model');
              oldNextModel.set({ head: true });
              model.set({ head: false });
            }

            if ($newPreviousElement.length === 1) {
              // new previous element exists; rearrange next IDs
              newPreviousModel = $newPreviousElement.data('model');
              model.set({ nextId: newPreviousModel.get('nextId') });
              newPreviousModel.set({ nextId: model.id });
            } else {
              // new next element must exist; otherwise, list order could not update
              newNextModel = $newNextElement.data('model');

              // if there is no new previous element, this must be the head
              newNextModel.set({ head: false });
              model.set({
                head: true,
                nextId: newNextModel.id
              });
            }

            // save each model if it exists
            if (oldPreviousModel) {
              oldPreviousModel.save({}, { wait: true });
            }
            if (oldNextModel) {
              oldNextModel.save({}, { wait: true });
            }

            if (newPreviousModel) {
              newPreviousModel.save({}, { wait: true });
            }
            if (newNextModel) {
              newNextModel.save({}, { wait: true });
            }

            // current model must exist
            model.save({}, { wait: true });
          }