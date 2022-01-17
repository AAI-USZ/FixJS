function(){
            console.log($(this));
            if (!$(this).hasClass('clevered')) {
                $(this).addClass('clevered').addClass(options.selfClass);
                methods.init(this);
            }
        }