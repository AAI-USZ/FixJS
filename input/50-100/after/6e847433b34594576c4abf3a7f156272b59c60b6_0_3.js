function(content) {
            var dialog = $.tmpl($('#tmpl-dialog-separate'), {content: content});
            this.chatsBody$.append(dialog);
            this.lastMessage = null;
        }