function(ref, path, savePath, pageSavePath, nonEditable, canEdit, newPageMode) {
            var content = returnStructure(ref);
            var pageContent = content ? content : sakai.config.defaultSakaiDocContent;
            var lastModified = content && content._lastModified ? content._lastModified : null;
            var autosave = content && content.autosave ? content.autosave : null;
            var pageTitle = $.trim($('.lhnavigation_selected_item .lhnavigation_page_title_value').text());
            var saveRef = ref;
            if (saveRef.indexOf('-') !== -1) {
                saveRef = saveRef.substring(saveRef.indexOf('-') + 1);
            }
            currentPageShown = {
                'ref': ref,
                'path': path,
                'content': pageContent,
                'savePath': savePath,
                'pageSavePath': pageSavePath,
                'saveRef': saveRef,
                'canEdit': canEdit,
                'nonEditable': nonEditable,
                '_lastModified': lastModified,
                'autosave': autosave,
                'title': pageTitle
            };
            if (newPageMode) {
                $(window).trigger('editpage.contentauthoring.sakai', [currentPageShown, newPageMode]);
                contextMenuHover = {
                    path: currentPageShown.path,
                    ref: currentPageShown.ref,
                    pageSavePath: currentPageShown.pageSavePath,
                    savePath: currentPageShown.savePath,
                    content: currentPageShown.content
                };
                editPageTitle();
                $(window).on('click', '#inserterbar_action_add_page', addNewPage);
            } else {
                $(window).trigger('showpage.contentauthoring.sakai', [currentPageShown]);
            }
        }