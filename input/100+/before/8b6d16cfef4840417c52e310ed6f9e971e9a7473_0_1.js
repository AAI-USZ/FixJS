function(reload)
        {
            if ($SS.location.sub === "sys") // fix for firefux (maybe opera?) on report popups that have setTimeout.
                document.head.innerHTML = document.head.innerHTML;

            var div;
            reload = reload === true;

            $(document).bind("QRDialogCreation", $SS.QRDialogCreationHandler);

            if ($SS.conf["ExHentai Source"] !== 1)
                $SS.exsauce.init();
            else if (reload)
                $(".exSource").remove();

            if ($SS.conf["Custom Navigation Links"])
                $SS.buildCustomNav();
            else if (reload && (div = $("#boardLinks")).exists())
                div.remove();

            if (!reload)
            {
                $SS.options.init();

                var select = $("#boardSelectMobile").attr("id", "bSelectSS");

                $("option[value=fa]", select).before($("<option value=f>/f/ - Flash"));
                $("option[value=" + $SS.location.board + "]", select).attr("selected", "true");
                div = $("#boardNavDesktop").prepend(select.bind("change", function(e)
                {
                    location.href = location.href.replace(/(\.org\/).+\/.*$/, "$1" + e.target.value + "/");
                }));
                $(document.body).prepend($("<div id=bNavWrapper>").append(div));

                div = $("<div id=bBanner>").append($(".boardBanner>img").attr("id", "banner"));
                $(".boardBanner").prepend(div);

                if (!$SS.browser.webkit && !$SS.conf["Hide Checkboxes"])
                    $("input[type=checkbox]:not(#imageExpand)").riceCheck();

                if ((div = $("#imageType+label")).exists())
                    div.bind("change", function()
                    {
                        $(this).toggleClass("imgExpanded");
                    });

                if (!$SS.QRhandled && (div = $("#qr")).exists())
                    $SS.QRDialogCreationHandler({ target: div });

                $(document).bind("DOMNodeInserted", $SS.nodeInsertedHandler);

                if ($SS.location.board === "f")
                    $(".postarea input[type=file]").riceFile();

                if ($SS.conf["Show/Hide Menu Entry"])
                    $SS.hidePostME.init();
            }
            else
            {
                if (!$SS.conf["Smart Tripcode Hider"])
                    $("input[name=name]").each(function()
                    {
                        $(this).unbind("blur", $SS.tripCheck)
                               .removeClass("tripping");
                    });

                if (!$SS.browser.webkit && !$SS.conf["Hide Checkboxes"] && !$(".postInfo>.riceCheck").exists())
                    $("input[type=checkbox]:not(#imageExpand)").riceCheck();
            }

            if ($SS.conf["Pages Position"] === 1)
                $SS.buildPagesDropdown();
            else
                $("#pagesDrop").remove();
        }