function(){
            $newsharecontentContainer.jqm({
                modal: false,
                overlay: 0,
                toTop: true,
                zIndex: 3000,
                onShow: fillShareData,
                onHide: resetWidget
            });

            $(document).on('click', '.share_trigger_click', function() {
                if ($newsharecontentContainer.is(':visible')) {
                    $newsharecontentContainer.jqmHide();
                }
                sakai.api.Util.Forms.clearValidation($newsharecontent_form);
                var idArr = $(this).attr("data-entityid");
                if (idArr.length > 1 && !$.isArray(idArr)) {
                    idArr = idArr.split(",");
                }
                var $this = $(this);
                $newsharecontentContainer.css({
                    'top':$this.offset().top + $this.height(),
                    'left':$this.offset().left + $this.width() / 2 - 119
                });
                // Fetch data for content items
                var batchRequests = [];
                $.each(idArr, function(i, id) {
                    batchRequests.push({
                        "url": "/p/" + id + ".json",
                        "method": "GET"
                    });
                });
                sakai.api.Server.batch(batchRequests, function(success, data) {
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
                        if (window["addthis"]) {
                            $newsharecontentContainer.jqmShow();
                        }
                    }
                }, false);
            });
        }