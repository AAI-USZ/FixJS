function() {
                                var index, children = get("children");

                                $(window).off("storage.socket");
                                if (children) {
                                    index = $.inArray(request.id, children);
                                    if (index > -1) {
                                        children.splice(index, 1);
                                        set("children", children);
                                    }
                                }
                            }