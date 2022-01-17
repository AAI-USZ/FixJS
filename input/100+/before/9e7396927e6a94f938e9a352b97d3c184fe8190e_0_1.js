function(id_list){
        var id_list = id_list || [];
        var request_data = {
            'categories_list': id_list.join('|'),
            'bla': 'blee'
        };
        $.get(
            '/organization/category_images/',
            request_data,
            function(data){
                $('#logo-cat-thumbs-list').html('');
                if (data.images){
                    $.each(data.images, function(idx, img){
                        addThumb(img);
                    });
                    var id_logo_cat = $('#id_logo_category');
                    if (id_logo_cat.val() && $('.logo-entry[org-category=' + id_logo_cat.val() + ']').length ){
                        $('.logo-entry[org-category=' + id_logo_cat.val() + ']').addClass('choosen');
                    } else {
                        var logo_cat= $('.logo-entry').first();
                        logo_cat.addClass('choosen');
                        $('#id_logo_category').val(logo_cat.attr('org-category'));
                    }
                }
            },
            'json'
        );
    }