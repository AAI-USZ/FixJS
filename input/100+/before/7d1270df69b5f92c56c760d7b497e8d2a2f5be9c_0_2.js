function() {
            $newaddcontentContainerLHChoiceItem.bind('click', navigateMenu);
            $newaddcontentContainerLHChoiceSubItem.bind('click', navigateSubItem);
            $newaddcontentContainerNewItemAddToList.bind('click', constructItemToAdd);
            $(newaddcontentContainerStartUploadButton).bind('click', doUpload);
            $(newaddcontentSelectedItemsEditDataClose).live('click', closeEditData);
            $(newaddcontentContainerNewItemSaveChanges).live('click', saveEdit);
            $(newaddcontentSelectedItemsRemove).live('click', removeItemToAdd);
            $(newaddcontentSelectedItemsActionsPermissions).live('click', changePermissions);
            $(newaddcontentSelectedItemsActionsEdit).live('click', editData);
            $newaddcontentExistingItemsSearch.keydown(searchExistingContent);
            $(newaddcontentAddExistingSearchButton).click(searchExistingContent);
            $(newaddcontentExistingContentForm + ' input').live('click',checkFieldValidToAdd);
            $(newaddcontentExistingCheckAll).live('change', checkUncheckAll);
            $(newaddcontentExistingItemsListContainerActionsSort).live('change', function() {searchPaging(1);});
            $(newaddcontentSaveTo).live('change', greyOutExistingInLibrary);
            sakai.api.Util.hideOnClickOut($newaddcontentSelecteditemsEditDataContainer, newaddcontentSelectedItemsActionsEdit + ', #assignlocation_container');
            sakai.api.Util.hideOnClickOut($newaddcontentSelectedItemsEditPermissionsContainer, newaddcontentSelectedItemsActionsPermissions);

            // Initialize the validate plug-in
            var linkValidateOpts = {
                onclick: true,
                onfocusout: true,
                success: enableAddToQueue,
                error: disableAddToQueue
            };

            sakai.api.Util.Forms.validate($newaddcontentAddLinkForm, linkValidateOpts, true);

            // Need to create one validation opts object per validation
            // I tried $.extend()'ing the previous one, but the callbacks won't fire
            var documentValidateOpts = {
                onclick: true,
                onkeyup: function(element) { $(element).valid(); },
                onfocusout: true,
                success: enableAddToQueue,
                error: disableAddToQueue
            };

            sakai.api.Util.Forms.validate($(newaddcontentAddDocumentForm), documentValidateOpts, true);

            $('#newaddcontent_file_upload').fileupload({
                url: uploadPath,
                sequentialUploads: true,
                singleFileUploads: false,
                dropZone: $('#newaddcontent_container_selecteditems'),
                drop: function (ev, data) {
                    ev.stopPropagation();
                    ev.preventDefault();
                    // We only support browsers that have XMLHttpRequest Level 2
                    if (!window.FormData) {
                        return false;
                    }
                    if ($(ev.target).is($('#newaddcontent_file_upload'))) {
                        var error = false;
                        $.each(data.files, function (index, file) {
                            if (file.size > 0) {
                                fileDropped(file);
                            } else {
                                error = true;
                            }
                        });
                        if (error) {
                            sakai.api.Util.notification.show(
                                sakai.api.i18n.getValueForKey('DRAG_AND_DROP_ERROR', 'newaddcontent'),
                                sakai.api.i18n.getValueForKey('ONE_OR_MORE_DROPPED_FILES_HAS_AN_ERROR', 'newaddcontent'));
                        }
                        renderQueue();
                    }
                },
                change: function(e, data) {
                    multifileQueueAddAllowed = false;
                    preFillContentFields(data.files[0].name);
                    enableAddToQueue();
                },
                add: function(e, data) {
                    tmpBrowsedFile = data.files[0];
                }
            });

            $(window).bind('done.deletecontent.sakai', deleteContent);
        }