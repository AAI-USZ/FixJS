function(e) {
            var version = getVersionContent($(this).parent().attr("data-versionId"));
            var toStore = version.version;
            currentPageShown.content = toStore;
            toStore.version = $.toJSON(version.version);
            sakai.api.Server.saveJSON(currentPageShown.pageSavePath + "/" + currentPageShown.saveRef, toStore, function(success) {
                $.ajax({
                    url: currentPageShown.pageSavePath + "/" + currentPageShown.saveRef + ".save.json",
                    type: "POST",
                    success: function(){
                        $(window).trigger("update.versions.sakai", currentPageShown);
                    }
                });
            });
        }