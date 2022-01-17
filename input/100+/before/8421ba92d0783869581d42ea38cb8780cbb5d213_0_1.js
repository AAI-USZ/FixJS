function(box_config){
        var defaults = {
            left: '740px',
            top: '-2px'
        }
        var form = $(this);

        var hintBoxesFocusCb = function(el){
            var el = $(el);
            var node, i;
            for ( node = el, i = 0;
                  (!$(node).is('.control-group')) && i < 15;
                  node = node.parent(), i++
            );

            // remove focus from previous element
            $('.control-group.focus').each(function(idx, obj){
                var obj = $(obj);
                if(!obj.is(el)){
                    obj.removeClass('focus');
                    obj.find('.field-hint-box-wrapper').hide();
                }
            });

            if (node.is('.control-group') && !node.is('.focus')){
                node.addClass('focus');
                node.find('.field-hint-box-wrapper').show();
            }
        };

        $(function(){
            $('.field-hint-box-wrapper').hide();
        });


        $('input, textarea').live('focus',function(){
            hintBoxesFocusCb(this);
        });

        // this is ugly and very dependant on how django/crispyforms
        // generates our . But its quick and works.
        // Perhaps we should refactor this latter
        $('#div_id_files, #div_id_logo, .org-widget-categories, #div_id_categories').live(
            'click',
            function(){
                hintBoxesFocusCb(this);
            }
        );
        // $('#div_id_files').live('blur', function(){
        //     var el = $(this);
        //     el.removeClass('focus');
        //     el.find('.field-hint-box-wrapper').fadeOut('fast');
        // });

        $.each(box_config, function(key, val){
            var el = form.find('#div_id_' + key);
            el.find('.controls').append("" +
                "<div class='field-hint-box-wrapper'>" +
                    "<span class='hint-box-line'>&nbsp;&nbsp;</span>" +
                    "<div class='field-hint-box'>" +
                    "<img class='hint-icon' src='/static/img/hint-icon.png' >" +
                    "<div class='hint-text'>" + val.hint  + "</div>" +
                    "</div>" +
                "</div>"
            );

            var conf = {}
            $.extend(conf, defaults, val);

            el.find('.field-hint-box-wrapper'
              ).css('left', conf.left).css('top', conf.top);
            if (conf.width){
                el.find('.field-hint-box-wrapper').css('width', conf.width + 30);
                el.find('.field-hint-box').css('width', conf.width);
            }
        });

        form.find('fieldset').after("" +
            "<div class='alert alert-info' data-alert='info'>" +
                "<a class='close' data-dismiss='alert'>×</a>" +
                "<div class='msg'>" +
                    "Os campos com asterisco (<strong>*</strong>) são obrigatórios!" +
                "</div>" +
            "</div>"
        );

        $('.close').click(function(){
            $(this).parent().fadeOut();
        });
    }