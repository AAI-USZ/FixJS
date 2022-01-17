function(data) {
        if(data.articles.length > 0) {
            $.each(data.articles, function(i, art) {
                new_article(art).appendTo("#content");
            });
        } else dontload = true;
    }