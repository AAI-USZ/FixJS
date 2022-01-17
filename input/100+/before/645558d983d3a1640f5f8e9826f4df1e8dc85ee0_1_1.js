function (event, ui) {
                self.input.data('autoCompleteTag', true);
                clearTimeout(self.timer);
                if (ui.item.label === undefined)
                    self._addTag(ui.item.value);
                else
                    self._addTag(ui.item.label, ui.item.value);
                return false;
            }