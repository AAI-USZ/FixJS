function(id_list){
        id_list = id_list || [];
        $('#logo-cat-thumbs-list').html('');
        if (id_list.length){
            $.each(id_list, function(idx, num){
                addThumb({
                    id: num,
                    filename: organization_category_images[num]
                });
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
    }