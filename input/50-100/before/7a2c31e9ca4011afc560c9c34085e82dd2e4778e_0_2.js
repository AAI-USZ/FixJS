function(data) {
            if (data.valid) {
                var selector = "#task_" + task.get('id');
                self.$(selector).remove();
            }
        }