function (){
        var $portal_globalnav = $('#portal-globalnav')
        var $globalnavlinks = $portal_globalnav.children('li');
        if ($globalnavlinks.length < max_global_nav){
            $portal_globalnav.addClass('showMobile');
            return;
        }
//        $portal_globalnav.addClass('hide_in_mobile');
        var $mobile_globalnav = $('<div />', {id: 'mobile-globalnav'}).insertAfter($portal_globalnav);
        var $select = $('<select />').appendTo($mobile_globalnav);
        $globalnavlinks.each(function (){
            var $this = $(this);
            var selected = $this.is('.selected') && 'selected=selected' || ' ';
            $select.append('<option ' + selected + '>' + $this.text() + '</option>');
        });
        $select.change(function (){
            var n = $(this).find(':selected').index();
            var url = $globalnavlinks.eq(n).find('a').attr('href');
            if (url){
                window.location = url;
            }
            return false;
        });
    }