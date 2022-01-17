function(datePicker, options) {
            if (options && options.method === 'click') {
                datePicker.$node.find('input').trigger('click').trigger('focus');
            } else {
                datePicker.$node.find('input').trigger('focus');
            }
        }