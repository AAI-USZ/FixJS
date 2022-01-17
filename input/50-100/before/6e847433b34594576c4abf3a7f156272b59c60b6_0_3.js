function(e) {
            var message = {
                content: this.$input.val()
            },
                _this = this;

            $.ajax({
                url: '/chat/messages',
                type: 'POST',
                data: message,
                error: function(xhr) {
                    panelView.ajaxError(xhr);
                }
            });
        }