function() {
                confirm_action("удалить сообщение #"+id,
                function() {
                    api_call_alert("delete", {message: id});
                });
            }