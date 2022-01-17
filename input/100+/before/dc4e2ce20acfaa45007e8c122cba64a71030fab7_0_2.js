function(){
            if (!sakai.data.me.user.anon) {
                $newsharecontentAnon.hide();
                $newsharecontentUser.show();
            } else {
                $newsharecontentContainer.addClass('anon');
            }
            addBinding();
            var ajaxcache = $.ajaxSettings.cache;
            $.ajaxSettings.cache = true;
            $.getScript('//s7.addthis.com/js/250/addthis_widget.js?%23pubid=' + sakai.widgets.newsharecontent.defaultConfiguration.newsharecontent.addThisAccountId + '&domready=1');
            $.ajaxSettings.cache = ajaxcache;
            sakai.api.Util.AutoSuggest.setup( $newsharecontentSharelist, {
                asHtmlID: tuid,
                scrollHeight: 120
            });
            $("label#newsharecontent_autosuggest_for").attr("for", tuid);
        }