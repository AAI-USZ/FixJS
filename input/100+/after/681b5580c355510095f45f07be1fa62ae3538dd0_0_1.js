function(e){
        e.preventDefault();

        var $error_list = $('#icon_preview').parent().find(".errorlist"),
            $parent = $(this).closest('li');

        $('input', $parent).attr('checked', true);
        $('#icons_default a.active').removeClass('active');
        $(this).addClass('active');

        $("#id_icon_upload").val("");
        $('#icon_preview').show();

        $('#icon_preview_32 img').attr('src', $('img', $parent).attr('src'));
        $('#icon_preview_64 img').attr('src', $('img',
                $parent).attr('src').replace(/32/, '64'));

        $error_list.html("");
    }