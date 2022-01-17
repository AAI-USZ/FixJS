function()
            {
                var n = $("#navtopr");
                var a = $("<a>SS").bind("click", $SS.options.show);
                n.get().removeChild(n.get().childNodes[2]);
                return $("#navtopr>a:last-child").before($("<span>] [").append(a).append(document.createTextNode("] [")));
            }