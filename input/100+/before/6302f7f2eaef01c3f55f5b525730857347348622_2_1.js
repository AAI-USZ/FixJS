function (src) {
    var hash = win.location.hash.substring(1),
        defaultTab, node, tab, tabPanel;

    function scrollToNode() {
        if (node.hasClass('protected')) {
            Y.one('#api-show-protected').set('checked', true);
            pjax.updateVisibility();
        }

        if (node.hasClass('private')) {
            Y.one('#api-show-private').set('checked', true);
            pjax.updateVisibility();
        }

        setTimeout(function () {
            // For some reason, unless we re-get the node instance here,
            // getY() always returns 0.
            var node = Y.one('#classdocs').getById(hash);
            win.scrollTo(0, node.getY() - 70);
        }, 1);
    }

    if (!classTabView) {
        return;
    }

    if (src === 'hashchange' && !hash) {
        defaultTab = 'index';
    } else {
        if (localStorage) {
            defaultTab = localStorage.getItem('tab_' + pjax.getPath()) ||
                'index';
        } else {
            defaultTab = 'index';
        }
    }

    if (hash && (node = Y.one('#classdocs').getById(hash))) {
        if ((tabPanel = node.ancestor('.api-class-tabpanel', true))) {
            if ((tab = Y.one('#classdocs .api-class-tab.' + tabPanel.get('id')))) {
                if (classTabView.get('rendered')) {
                    Y.Widget.getByNode(tab).set('selected', 1);
                } else {
                    tab.addClass('yui3-tab-selected');
                }
            }
        }

        // Scroll to the desired element if this is a hash URL.
        if (node) {
            if (classTabView.get('rendered')) {
                scrollToNode();
            } else {
                classTabView.once('renderedChange', scrollToNode);
            }
        }
    } else {
        tab = Y.one('#classdocs .api-class-tab.' + defaultTab);

        if (classTabView.get('rendered')) {
            Y.Widget.getByNode(tab).set('selected', 1);
        } else {
            tab.addClass('yui3-tab-selected');
        }
    }
}