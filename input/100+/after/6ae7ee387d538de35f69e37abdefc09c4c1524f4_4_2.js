function(success, data) {
                $.ajax({
                    'url': storePath,
                    'type': 'POST',
                    'data': {
                       ':operation': 'delete'
                    }
                });
                // Store the page in the main location
                storePath = currentPageShown.pageSavePath + '/' + currentPageShown.saveRef;
                updateWidgetURLs();
                data.rows = rows;
                // Set the version history variable
                delete data.version;
                data.version = $.toJSON(data);
                // Save the page data
                sakai.api.Server.saveJSON(storePath, data, function() {
                    // Create a new version of the page
                    var versionToStore = sakai.api.Server.removeServerCreatedObjects(data, ['_']);
                    $.ajax({
                        url: storePath + '.save.json',
                        type: 'POST',
                        success: function() {
                            $(window).trigger("update.versions.sakai", currentPageShown);
                        }
                    });
                }, true);
            }