function(e) {
                    // Escape dots in ids so they won't be treated as class selectors
                    $.scrollTo($(this).attr("href").replace(".", "\\\."), 400);
                }