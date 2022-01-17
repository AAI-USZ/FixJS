function(data) {
            if (data.errors) {
                data.errors.forEach(function(err){
                    alert(err.error_message)
                })
                return;
            }
            bSearch.trigger('searched', data)
        }