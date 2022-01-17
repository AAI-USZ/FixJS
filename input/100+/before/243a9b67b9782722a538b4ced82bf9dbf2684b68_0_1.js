function load(callback) {
    done = false;
    contained = $("#content .issue2");
    $.getJSON("/json/top/articles/"+offset+"/"+(vert_num*hori_num),
        function(data) {
            contained.each(function(i, iss) {
                $.getJSON("/hate/article/by/id/"+iss.id);
            });
            contained.remove();
            $.each(data.articles, function(i, art) {
                new_article(art).appendTo("#content", function() {
                    $(this).fadeIn("fast");
                    done = true;
                });
            });
        });
    offset += 1;
    if(callback && done) callback();
}