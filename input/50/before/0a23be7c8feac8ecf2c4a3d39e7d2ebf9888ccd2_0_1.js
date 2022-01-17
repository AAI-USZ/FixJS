function(xhr, data, status) {
            prependPost(data);
            $('#new_post textarea').val('');
        }