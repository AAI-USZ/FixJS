function() {
                                var index, children = get("children");

                                jQuery(window).off("storage.socket");
                                if (children) {
                                    index = jQuery.inArray(request.id, children);
                                    if (index > -1) {
                                        children.splice(index, 1);
                                        set("children", children);
                                    }
                                }
                            }