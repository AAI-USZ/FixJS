function()
            {
                var a = $("<a>SS").bind("click", $SS.options.show);
                return $("#navtopr>a:last-child").replace(a);
            }