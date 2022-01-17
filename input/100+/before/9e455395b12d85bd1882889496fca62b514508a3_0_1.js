function(item, scrollMap, scrollTimeline, focusItems) {

            if (this._isEditFormLocked()) {
               return;
            }

            var self = this;
            var immediate = false;
            var recordId = item.attr('recordid');

            // Mark current form item as contracted.
            if (!_.isNull(this._currentFormItem)) {
                this._hideForm(this._currentFormItem, true);
            }

            // Capture the current scrollTop of the container.
            this._scrollTop = this.element.scrollTop();

            // Display the form and action links.
            this.editForm.itemform('showForm', item);

            // Fire events to focus the Neatline blocks.
            this._trigger('itemedit', {}, {
                'recordid': recordId,
                'scrollMap': scrollMap,
                'scrollTimeline': scrollTimeline,
                'focusItems': focusItems
            });

            // Fire event to show the map controls.
            this._trigger('mapedit', {}, {
                'item': item,
                'immediate': immediate
            });

            // Update trackers.
            item.data('expanded', true);
            this._currentFormItem = item;
            this._currentFormItemId = recordId;
            this._currentRecordTitle = item.find('span.item-title-text');

            // Show item rows.
            this._hideItemRows();

         }