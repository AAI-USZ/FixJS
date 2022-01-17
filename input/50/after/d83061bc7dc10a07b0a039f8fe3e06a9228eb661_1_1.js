function (responseText, responseXML) {
                    if (this.status === _this.httpStatusCode.noContent)
                        jQuery("#auth-failed").show();
                    else
                        location.href = "/home";
                }