function() {
                    var aParents = oUL.getParents("*:not(html,body)"),
                        aFiltered = aParents.filter(function(oEl) {
                            return oEl.getStyle("position") === "fixed";
                        });
                    return !!aFiltered.length;
                }