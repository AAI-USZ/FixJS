function(){
        var a = $(this);
        if (a.attr("title"))
            return true; // html viewsource link

        var li = a.closest("li");
        $("ol>li").removeClass("sel");
        li.addClass("sel");

        show_src(li);
        return false;
    }