function() {
                var self = this;
                $('#' + self.id + ' BUTTON#action').unbind('click');
                $('#' + self.id + ' BUTTON#cancel').unbind('click');
                $('#' + self.id).unbind("orientationchange").remove();
                queue.splice(0, 1);
                if (queue.length > 0)
                    queue[0].show();
            }