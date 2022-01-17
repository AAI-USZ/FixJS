function (event, ui) {
                self.input.data('autoCompleteTag', true);
            clearTimeout(self.timer);
            if (self.options.maxTags !== undefined && self.tagsArray.length == self.options.maxTags) {
                self.input.val("");
            }
            else {
                if (ui.item.label === undefined)
                    self._addTag(ui.item.value);
                else
                    self._addTag(ui.item.label, ui.item.value);
            }

            return false;
        }