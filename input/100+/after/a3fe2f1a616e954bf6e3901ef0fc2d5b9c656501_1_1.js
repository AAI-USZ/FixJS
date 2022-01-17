function (value, message, form) {
                    if (value != undefined && value) {
                        mylink = document.getElementById("urlAltId").value;
                        var link = document.getElementById("urlId").value;
                        if ((link != null) && (link != "")) {
                            if (mylink == null || mylink == "") {
                                mylink = link;
                            }
                            AddTag('[url=' + link + ']', '[/url]');
                        } else {
                            ErrorUtils.addErrorMessage('#urlId', $labelErrorsNotEmpty)
                            return false;
                        }
                    }
                }