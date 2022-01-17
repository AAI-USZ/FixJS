function() {
                    var aParents = oUL.getParents("*:not(body):not(html)"),
                        aFiltered = aParents.filter(function(oEl) {
                            return oEl.getStyle("position") === "fixed";
                        });
                    return !!aFiltered.length;
                }