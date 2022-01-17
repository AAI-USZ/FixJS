function()
                        {
                            var pc = $("#pc" + post.ID);

                            if (pc.hasClass("opContainer"))
                                pc.previousSibling().click();
                            else
                                pc.children(".hide_reply_button:first-child>a").click();
                        }