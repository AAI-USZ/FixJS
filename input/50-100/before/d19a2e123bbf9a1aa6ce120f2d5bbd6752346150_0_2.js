function(task) {
        var self = this;
        $.post(task.get('delete_url'), {}, function(data) {
            if (data.valid) {
                var selector = "#task_" + task.get('id');
                self.$(selector).remove();
            }
        }, 'json');
    }