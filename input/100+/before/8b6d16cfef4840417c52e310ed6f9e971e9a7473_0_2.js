function(e)
        {
            if ($(e.target).hasClass("postContainer"))
            {
                if ($SS.conf["ExHentai Source"] !== 1)
                    $SS.exsauce.addLinks(e.target);

                if (!$SS.browser.webkit && !$SS.conf["Hide Checkboxes"])
                    $("input[type=checkbox]", e.target).riceCheck();
            }
            else if (e.target.className === "thumbnail")
                $(".riceFile>span", $("#qr")).text("");
            else if (e.target.nodeName === "DIV" && !$SS.browser.webkit)
                $("input[type=checkbox]", e.target).riceCheck();
        }