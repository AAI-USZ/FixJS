function() {
            var uniqueId = sakai.api.Util.generateWidgetId();
            var tags = sakai.api.Util.AutoSuggest.getTagsAndCategories($autoSuggestElt, true);
            var $thisForm = $(this).parents($newaddcontentNewItemContainer).children(newAddContentForm);
            if ($(this).attr('id') === 'newaddcontent_container_newitem_raquo_right') {
                $thisForm = $(this).prev().children(':visible').find(newAddContentForm);
            }

            switch ($thisForm.attr('id')) {

                //////////////////////////
                // Uploading a new file //
                //////////////////////////

                case 'newaddcontent_upload_content_form':
                    var originalTitle = $thisForm.find(newaddcontentUploadContentOriginalTitle)[0].id;

                    // Calculate the file extension
                    var splitOnDot = originalTitle.split('.');
                    var contentObj = {
                        'sakai:pooled-content-file-name': $thisForm.find(newaddcontentUploadContentTitle).val(),
                        'sakai:description': $thisForm.find(newaddcontentUploadContentDescription).val(),
                        'sakai:permissions': $thisForm.find(newaddcontentUploadContentPermissions).val(),
                        'sakai:copyright': $('#newaddcontent_upload_content_copyright').val(),
                        'sakai:originaltitle': originalTitle,
                        'sakai:tags': tags,
                        'sakai:fileextension': splitOnDot[splitOnDot.length - 1],
                        'css_class': sakai.config.MimeTypes[sakai.config.Extensions[(originalTitle).slice(originalTitle.lastIndexOf('.') + 1, originalTitle.length).toLowerCase()] || 'other'].cssClass || 'icon-unknown-sprite',
                        'type': 'content',
                        'origin':'user' // 'origin' tells Sakai that this file was selected from the users hard drive
                    };
                    addContentToQueue(contentObj);
                    multifileQueueAddAllowed = true;
                    $thisForm.find(newaddcontentUploadContentTitle + ', ' + newaddcontentUploadContentDescription + ', ' + newaddcontentUploadContentTags).val('');
                    // Increase the number of files that the user browsed for and added to the list
                    numberOfBrowsedFiles++;
                    break;

                ///////////////////
                // Adding a link //
                ///////////////////

                case 'newaddcontent_add_link_form':
                    var linkObj = {
                        'sakai:pooled-content-url': $thisForm.find(newaddcontentAddLinkURL).val(),
                        'sakai:pooled-content-file-name': $thisForm.find(newaddcontentAddLinkTitle).val() || $thisForm.find(newaddcontentAddLinkURL).val(),
                        'sakai:description': $thisForm.find(newaddcontentAddLinkDescription).val(),
                        'sakai:tags': tags,
                        'sakai:permissions': sakai.config.Permissions.Links.defaultaccess,
                        'sakai:copyright': sakai.config.Permissions.Copyright.defaults['links'],
                        'css_class': 'icon-url-sprite',
                        'type':'link'
                    };
                    addContentToQueue(linkObj);
                    $thisForm.reset();
                    break;

                /////////////////////////////
                // Creating a new document //
                /////////////////////////////

                case 'newaddcontent_add_document_form':
                    if ($thisForm.valid()) {
                        var documentObj = {
                            'sakai:pooled-content-file-name': $thisForm.find(newaddcontentAddDocumentTitle).val(),
                            'sakai:permissions': $thisForm.find(newaddcontentAddDocumentPermissions).val(),
                            'sakai:description': $thisForm.find(newaddcontentAddDocumentDescription).val(),
                            'sakai:tags': tags,
                            'sakai:copyright': sakai.config.Permissions.Copyright.defaults['sakaidocs'],
                            'css_class': 'icon-sakaidoc-sprite',
                            'type': 'document'
                        };
                        addContentToQueue(documentObj);
                        $thisForm.reset();
                    }
                    break;

                ///////////////////////////////
                // Re-using existing content //
                ///////////////////////////////

                case 'newaddcontent_existing_content_form':
                    $.each($thisForm.find('.newaddcontent_existingitems_select_checkbox:checked'), function(index, item) {
                        if (!$(item).is(':disabled')) {
                            var viewers = [];
                            if ($(item).data('sakai-pooled-content-viewer')) {
                                viewers = ('' + $(item).data('sakai-pooled-content-viewer')).split(',');
                            }
                            var managers = [];
                            if ($(item).data('sakai-pooled-content-manager')) {
                                managers = ('' + $(item).data('sakai-pooled-content-manager')).split(',');
                            }
                            var contentObj = {
                                'sakai:pooled-content-file-name': $(item).next().text(),
                                'sakai:pooled-content-viewer': viewers,
                                'sakai:pooled-content-manager': managers,
                                '_path': item.id,
                                '_mimeType': $(item).data('mimetype'),
                                'canshare': $(item).attr('data-canshare'),
                                'type': 'existing',
                                'css_class': $(item).next().children(newaddcontentExistingItemsListContainerListItemIcon)[0].id
                            };
                            addContentToQueue(contentObj);
                            $(item).attr('disabled', 'disabled');
                            $(item).parent().addClass(newaddcontentExistingItemsListContainerDisabledListItem);
                        }
                    });
                    break;

            }
            sakai.api.Util.AutoSuggest.reset( $autoSuggestElt );
            sakai.api.Util.AutoSuggest.setupTagAndCategoryAutosuggest( $autoSuggestElt, null, $autoSuggestListCatElt );
        }