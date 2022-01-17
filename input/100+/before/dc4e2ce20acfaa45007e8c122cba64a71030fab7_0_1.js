function(success, data) {
                        if (success && data) {
                            if (data.results) {
                                $.each(data.results, function(i, result){
                                    data.results[i].body = $.parseJSON(data.results[i].body);
                                });
                                contentObj = {
                                    data: data.results,
                                    shareUrl: sakai.api.Content.createContentURL(data.results[0].body)
                                };
                            } else if (data.url) {
                                contentObj = {
                                    data: [data],
                                    shareUrl:  sakai.api.Content.createContentURL(data)
                                };
                            }
                            if (window['addthis']) {
                                $newsharecontentContainer.jqmShow();
                            }
                        }
                    }