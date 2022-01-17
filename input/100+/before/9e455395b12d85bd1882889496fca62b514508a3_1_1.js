function(item) {
            if (this._isLocked) {
                return;
            }

            // Getters and setters.
            this.item =                     item;
            var itemRaw =                   item.attr('itemid');
            var recordRaw =                 item.attr('recordid');
            this.itemTitleText =            item.find('.item-title-text');
            this.container =                this.item.next('tr').find('td.edit-form-container');
            this.textSpan =                 this.item.find('.item-title-text');
            this.time =                     this.item.find('.time input');
            this.space =                    this.item.find('.space input');

            // For record ids, fall back to null if undefined.
            this.itemId = itemRaw === '' ?
                null : parseInt(itemRaw, 10);
            this.recordId = recordRaw === '' ?
                null : parseInt(recordRaw, 10);

            // Inject the form markup.
            this.container.append(this.element);

            // DOM touches.
            this._disableButtons();
            this._showContainer();
            this._expandTitle();
            this._getFormData();

            // If there is no item id, display the delete button.
            if (_.isNull(this.itemId)) {
                this._hideItemRecordElements();
            }

            // Otherwise, hide it.
            else {
                this._showItemRecordElements();
            }

            // Update the tracker.
            this._isForm = true;

        }