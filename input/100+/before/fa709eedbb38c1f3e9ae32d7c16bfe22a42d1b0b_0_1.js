function() {
                var tag = this.textContent;
                var input = self.commentEL.get(0);
                var index = 0;
                if (this.className.indexOf('selected') == -1) {
                    index = input.selectionEnd + tag.length + 2;
                    self.tagCompleter.inputLine.addTag(tag);
                } else {
                    index = input.value.length - tag.length - 2;
                    self.tagCompleter.inputLine.deleteTag(tag);
                }
                input.setSelectionRange(index, index);
                return false;
            }