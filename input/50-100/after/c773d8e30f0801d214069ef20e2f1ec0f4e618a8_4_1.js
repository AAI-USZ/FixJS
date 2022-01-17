function(e) {
            e.preventDefault();

            var title, isFinished = false;

            title = $.trim($('#title').val());

            this.model.save({
                title: title,
                is_finished: isFinished
            }, {
                silent  : false,
                sync    : true,
                success: function() {
                    this.model.trigger('save-success');
                }.bind(this)
            });
        }