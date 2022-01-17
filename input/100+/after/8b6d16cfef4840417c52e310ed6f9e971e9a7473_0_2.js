function(e)
        {
            if ($(e.target).hasClass("postContainer"))
            {
                if ($SS.conf["ExHentai Source"] !== 1)
                    $SS.exsauce.addLinks(e.target);

                if (!$SS.browser.webkit && !$SS.conf["Hide Checkboxes"])
                    $("input[type=checkbox]", e.target).riceCheck();
            }
            else if (e.target.className === "thumbnail" ||
                     e.target.nodeName === "DIV" ||
                     e.target.id === "prefetch")
            {
                if (e.target.className === "thumbnail")
                    $(".riceFile>span", $("#qr")).text("");

                if (!$SS.browser.webkit)
                    $("input[type=checkbox]", e.target).riceCheck();
            }
        }