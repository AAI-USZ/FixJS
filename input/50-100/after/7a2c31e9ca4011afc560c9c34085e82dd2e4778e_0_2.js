function(task) {
        var self = this;

        $.post(task.get('deleteUrl'), {}, function(data) {
            if (data.success) {
                var object = self.$("#task_" + task.get('id'));
                object.slideUp("fast", function() {
                    object.remove();
                });
            }
        }, 'json');
    }