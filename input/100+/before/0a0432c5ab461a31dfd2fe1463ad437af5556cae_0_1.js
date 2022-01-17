function(newPageMode) {
            if (contextData.forceOpenPage) {
                $.bbq.pushState({
                    'l': contextData.forceOpenPage
                }, 0);
                contextData.forceOpenPage = false;
            } else {
                var state = $.bbq.getState('l');
                var selected = state || false;
                var structureFoundIn = false;
                // Check whether this page exist
                if (selected) {
                    structureFoundIn = checkPageExists(privstructure, selected) || checkPageExists(pubstructure, selected);
                    if (!structureFoundIn) {
                        selected = false;
                    }
                }
                // If it exists, check whether it has more than 1 subpage
                if (selected && selected.indexOf('/') === -1) {
                    if (structureFoundIn.items[selected]._childCount > 1) {
                        selected = getFirstSubPage(structureFoundIn, selected);
                    }
                }
                // If no page is selected, select the first one from the nav
                if (!selected) {
                    selected = getFirstSelectablePage(privstructure) || getFirstSelectablePage(pubstructure);
                }
                if (selected) {
                    // update links in all menus with subnav with the selected page, so they wont trigger handleHashChange and cause weirdness
                    $('#lhnavigation_container').find('a.lhnavigation_toplevel_has_subnav').attr('href', '#l=' + selected);
                    // Select correct item
                    var menuitem = $('li[data-sakai-path=\'' + selected + '\']');
                    if (menuitem.length) {
                        if (selected.split('/').length > 1) {
                            var par = $('li[data-sakai-path=\'' + selected.split('/')[0] + '\']');
                            showHideSubnav(par, true);
                        }
                        var ref = menuitem.data('sakai-ref');
                        var savePath = menuitem.data('sakai-savepath') || false;
                        var pageSavePath = menuitem.data('sakai-pagesavepath') || false;
                        var canEdit = menuitem.data('sakai-submanage') || false;
                        var nonEditable = menuitem.data('sakai-noneditable') || false;
                        if (!menuitem.hasClass(navSelectedItemClass)) {
                            selectNavItem(menuitem, $(navSelectedItem));
                        }

                        getPageContent(ref, function() {
                            preparePageRender(ref, selected, savePath, pageSavePath, nonEditable, canEdit, newPageMode === true);
                        });
                    }
                } else {
                    renderPageUnavailable();
                }
            }
        }