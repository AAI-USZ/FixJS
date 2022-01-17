function(){
        $('.logo-entry.choosen').removeClass('choosen');
        $(this).addClass('choosen');
        $('#id_logo_category').val($(this).attr('org-category'));

        setLogoChoice('category');
    }