function(){
        var h = document.body.offsetHeight;
        $('.ui-datepicker').each(function(){
            // console.log(document.body.offsetHeight, $(this).offset().top, $(this).width());
            h = Math.max(h, $(this).offset().top + $(this).height());
        });
        window.postMessage({height: h},'*');
    }