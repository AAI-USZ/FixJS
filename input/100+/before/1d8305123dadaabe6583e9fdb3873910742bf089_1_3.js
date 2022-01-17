function (node, route) {
                $.ajax({
                type: 'POST',
                url: route,
                success: function(data){
                    if(data == 'success'){
                    node.remove();
                        }
                    }
                });
            }