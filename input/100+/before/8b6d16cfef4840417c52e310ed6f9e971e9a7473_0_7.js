function(anchor, data)
            {
                var hash = $SS.exsauce.sha1Hash($SS.exsauce.data_string(data));

                anchor.html("checking")
                      .attr("href", "http://" + this.extype + ".org/?f_shash=" + hash + "&fs_similar=1&fs_exp=1")
                      .unbind("click", $SS.exsauce.fetchImage);

                GM_xmlhttpRequest(
                {
                    method: "GET",
                    url: anchor.attr("href"),
                    onload: function(x)
                    {
                        var temp    = $("<div>").html(x.responseText),
                            results = $("div.it3>a:not([rel='nofollow']),div.itd2>a:not([rel='nofollow'])", temp),
                            MAX     = results.length();

                        anchor.html("found: " + MAX).attr("target", "_blank");

                        if (MAX > 0)
                        {
                            var div = $("<div class=exPopup id=ex" + hash + ">");
                            anchor.addClass("exFound").append(div);

                            for (var i = 0; i < MAX; ++i)
                            {
                                var ret = results.get(i),
                                    a   = $("<a href='" + ret.href + "' target=_blank>" + ret.innerHTML);
                                div.append(a);
                            }
                        }
                    }
                });
            }