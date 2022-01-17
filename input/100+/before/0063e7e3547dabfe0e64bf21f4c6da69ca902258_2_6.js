function() {
            var hash = collectionviewer.contextId.substring(2);
            var currHash = $.bbq.getState("p").split("/")[0];
            if (hash === currHash && fetchCollectionData) {
                collectionviewer.listStyle = $.bbq.getState("ls") || "carousel";
                $(".s3d-listview-options", $rootel).children(".selected").children().removeClass("selected");
                $(".s3d-listview-options", $rootel).children(".selected").removeClass("selected");
                collectionviewer.page = $.bbq.getState("lp") || 1;
                getCollectionData();
            }
        }