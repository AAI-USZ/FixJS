function (e) {
                var lastLi = self.element.children(".tagit-choice:last");
                if (e.which == self._keys.backspace)
                    return self._backspace(lastLi);

                if (self._isInitKey(e.which) && !(self._isTabKey(e.which) && this.value == '' && !self.input.data('autoCompleteTag'))) {
                    e.preventDefault();

                    self.input.data('autoCompleteTag', false);

                    if (!self.options.allowNewTags || (self.options.maxTags !== undefined && self.tagsArray.length == self.options.maxTags)) {
                        self.input.val("");
                    }
                    else if (self.options.allowNewTags && $(this).val().length >= self.options.minLength) {
                        self._addTag($(this).val());
                    }
                }

                if (self.options.maxLength !== undefined && self.input.val().length == self.options.maxLength) {
                    e.preventDefault();
                }

                if (lastLi.hasClass('selected'))
                    lastLi.removeClass('selected');

                self._pasteMetaKeyPressed = e.metaKey;
                self.lastKey = e.which;
            }