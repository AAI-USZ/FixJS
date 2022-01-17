function(){
            if (!sakai.data.me.user.anon) {
                $newsharecontentAnon.hide();
                $newsharecontentUser.show();
            } else {
                $newsharecontentContainer.addClass('anon');
            }
            addBinding();
            sakai.api.Util.AutoSuggest.setup( $newsharecontentSharelist, {
                asHtmlID: tuid,
                scrollHeight: 120
            });
            $("label#newsharecontent_autosuggest_for").attr("for", tuid);
        }