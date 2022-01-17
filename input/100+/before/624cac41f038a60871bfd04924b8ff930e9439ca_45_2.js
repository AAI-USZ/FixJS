function(success, data) {

                if (success && data.results && data.results[0] && data.results[0].body && data.results[1] && data.results[1].body) {
                    templategeneratorData.docstructure.docstructureData = $.parseJSON(data.results[0].body);
                    templategeneratorData.docstructure.structure = $.parseJSON(templategeneratorData.docstructure.docstructureData.structure0);

                    // Get the urls for each page in the docstructure and convert the elements within the structure to json
                    templategeneratorData.pageUrls = [];
                    $.each(templategeneratorData.docstructure.structure, function(docstructureIndex, docstructureElement) {
                        docstructureElement._view = $.parseJSON(docstructureElement._view);
                        docstructureElement._edit = $.parseJSON(docstructureElement._edit);
                        templategeneratorData.pageUrls.push({
                            'url' : '/p/' + docstructureElement._pid + '.infinity.json',
                            'method' : 'GET'
                        });

                    });
                    templategeneratorData.pages = [];
                    templategeneratorData.pageStructures = [];

                    sakai.api.Server.batch(templategeneratorData.pageUrls, function(success, data) {
                        if (success) {
                            $.each(data.results, function(pageIndex, pageElement) {
                                var page = {};
                                page.pageData = $.parseJSON(pageElement.body);
                                page.structure = $.parseJSON(page.pageData.structure0);

                                templategeneratorData.pages.push(sakai.api.Server.cleanUpSakaiDocObject(page));
                                templategeneratorData.pageStructures.push(page.structure);
                                if ( $.isFunction( callback ) ) {
                                    callback( true );
                                }
                            });
                        } else {
                            if ( $.isFunction( callback ) ) {
                                callback( false );
                            }
                        }
                    });
                    // 2. Roles
                    var roleData = $.parseJSON(data.results[1].body);
                    templategeneratorData.roles.roleData = $.parseJSON(roleData.properties['sakai:roles']);
                    templategeneratorData.roles.joinRole = roleData.properties['sakai:joinRole'];
                    templategeneratorData.roles.creatorRole = roleData.properties['sakai:creatorRole'];

                } else {
                    if ( $.isFunction( callback ) ) {
                        callback( false );
                    }
                    sakai.api.Util.notification.show('', sakai.api.i18n.getValueForKey('TEMPLATEGENERATOR_LOAD_ERROR', 'templategenerator'), sakai.api.Util.notification.type.INFORMATION);
                }
            }