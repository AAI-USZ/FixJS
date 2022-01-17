function(item, immediate) {

             if (this._isEditFormLocked()) {
                 return;
             }

            // Hide the form.
            this.editForm.itemform(
                'hideForm',
                item,
                immediate);

            // Fire the end edit without save callback.
            this._trigger('endmapedit', {}, {
                'immediate': immediate
            });

            // Update trackers.
            item.data('expanded', false);
            this._currentFormItem = null;

            // Show item rows, recuperate scrollTop.
            this._showItemRows();
            this._recuperateScrollTop();

         }