function (responseText, responseXML) {
                    if (this.status === _this.httpStatusCode.noContent) {
                        _this.$searchResults.html("");
                        jQuery("#search-returned-nothing").show();
                    }
                    else
                        _this.$searchResults.html(
                            Mustache.to_html(
                                jQuery("#search-results-template").html(),
                                { helpRequests: JSON.parse(responseText) }
                            )
                        );
                }