function() {
            $newaddcontentContainerLHChoiceItem.unbind('click', navigateMenu);
            $newaddcontentContainerLHChoiceSubItem.unbind('click', navigateSubItem);
            $newaddcontentContainerNewItemAddToList.unbind('click', constructItemToAdd);
            $(newaddcontentContainerStartUploadButton).unbind('click', doUpload);
            $(newaddcontentSelectedItemsEditDataClose).die('click', closeEditData);
            $(newaddcontentContainerNewItemSaveChanges).die('click', saveEdit);
            $(newaddcontentSelectedItemsRemove).die('click', removeItemToAdd);
            $(newaddcontentSelectedItemsActionsPermissions).die('click', changePermissions);
            $(newaddcontentSelectedItemsActionsEdit).die('click', editData);
            $(newaddcontentExistingItemsListContainerActionsSort).die('change');
            $newaddcontentContainer.off('click', '#newaddcontent_existingitems_paging .sakai_pager button');
            $(window).unbind('init.deletecontent.sakai', deleteContent);
        }