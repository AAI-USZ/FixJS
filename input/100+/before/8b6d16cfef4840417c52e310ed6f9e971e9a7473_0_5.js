function()
                    {
                        var node = $(this).previousSibling();

                        if (!$(".exSource", node).exists())
                        {
                            var a = $("<a class=exSource href='" + location.protocol + $(this).attr("href") + "'>" + $SS.exsauce.extype).bind("click", $SS.exsauce.fetchImage);
                            node.append(document.createTextNode(" ")).append(a);
                        }
                    }