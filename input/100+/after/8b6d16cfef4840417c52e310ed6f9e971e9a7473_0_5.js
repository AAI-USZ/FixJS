function()
            {
                if (!this.hasInit && $SS.conf["Pages Position"] === 1)
                {
                    if ($("#pagesDrop").exists()) return;

                    var pages  = $(".pagelist .pages>*"),
                        cpage  = $(".pagelist .pages>strong").text(),
                        select = $("<select id=pagesDrop>");

                    if (pages.length() == 0) return;

                    pages.each(function() { select.append($("<option value=" + this.textContent +
                        (cpage == this.textContent ? " selected=true" : "") + ">Page " + this.textContent)); });
                    select.bind("change", function(){ location.href = location.href.replace(/(\.org\/[^\/]+)\/?.*$/, "$1/" + this.value); });

                    $("#boardNavDesktop").prepend(select);
                    return this.hasInit = true;
                }
                else if (this.hasInit)
                {
                    $("#pagesDrop").remove();
                    return this.hasInit = false;
                }
            }