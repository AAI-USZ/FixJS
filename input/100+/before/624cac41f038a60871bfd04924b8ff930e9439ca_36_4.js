function(){
            $newsharecontentContainer.jqm({
                modal: false,
                overlay: 0,
                toTop: true,
                zIndex: 3000,
                onShow: fillShareData,
                onHide: resetWidget
            });

            $('.share_trigger_click').live('click',function(){
                if($newsharecontentContainer.is(":visible")){
                    $newsharecontentContainer.jqmHide();
                }
                sakai.api.Util.Forms.clearValidation($newsharecontent_form);
                var idArr = $(this).attr("data-entityid");
                if(idArr.length > 1 && !$.isArray(idArr)){
                    idArr = idArr.split(",");
                }
                var $this = $(this);
                var adjustHeight = 0;
                if (sakai.config.enableBranding && $('.branding_widget').is(':visible')) {
                    adjustHeight = parseInt($('.branding_widget').height(), 10) * -1;
                }
                $newsharecontentContainer.css({
                    'top':$this.offset().top + $this.height() + adjustHeight,
                    'left':$this.offset().left + $this.width() / 2 - 119
                });
                // Fetch data for content items
                var batchRequests = [];
                $.each(idArr, function(i, id){
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
                });
            });

            $.validator.addMethod("requiredsuggest", function(value, element){
                return $.trim($(element).next("input.as-values").val()).replace(/,/g, "") !== "";
            }, sakai.api.i18n.getValueForKey("AUTOSUGGEST_SHARE_ERROR", "newsharecontent"));

            var validateOpts = {
                submitHandler: doShare
            };
            sakai.api.Util.Forms.validate($newsharecontent_form, validateOpts, true);
        }