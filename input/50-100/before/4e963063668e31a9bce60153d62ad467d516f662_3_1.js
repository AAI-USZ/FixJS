function(){
        var a = $(this);
        if (a.attr("href") != '#')
            return true;

        var li = a.closest("li");
        $("ol>li").removeClass("sel");
        li.addClass("sel");

        show_src(li);
        return false;
    }