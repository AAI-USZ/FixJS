function(config) {
        var menuitems = [Ext.String.format('<b>{0}:</b>', config.title)];
        if(config.prefixItems) {
            Ext.Array.push(menuitems, config.prefixItems);
        }
        Ext.Array.push(menuitems, [{

        // Status
            text: pgettext('group', 'Status'),
            menu: [{
                itemId: 'selectStatusOpen',
                text: pgettext('group', 'Open')
            }, {
                itemId: 'selectStatusClosed',
                text: pgettext('group', 'Closed')
            }]

        // Grade
        }, {
            text: pgettext('group', 'Feedback'),
            menu: [{
                itemId: 'selectGradePassed',
                text: pgettext('group', 'Passed')
            }, {
                itemId: 'selectGradeFailed',
                text: pgettext('group', 'Failed')
            }, {
                text: pgettext('group', 'Grade'),
                menu: {
                    xtype: 'dynamicloadmenu',
                    itemId: 'specificGradeMenu'
                }
            }, {
                text: pgettext('points', 'Points'),
                menu: {
                    xtype: 'dynamicloadmenu',
                    itemId: 'specificPointsMenu'
                }
            }]

        // Number of deliveries
        }, {
            text: gettext('Number of deliveries'),
            menu: [{
                itemId: 'selectHasDeliveries',
                text: gettext('Has deliveries')
            }, {
                itemId: 'selectNoDeliveries',
                text: gettext('No deliveries')
            }, {
                text: pgettext('numdeliveries', 'Exact number'),
                menu: {
                    xtype: 'dynamicloadmenu',
                    itemId: 'specificNumDeliveriesMenu'
                }
            }]

        // With examiner
        }, {
            text: gettext('By examiner'),
            menu: [{
                itemId: 'selectHasExaminer',
                text: gettext('Has examiner(s)')
            }, {
                itemId: 'selectNoExaminer',
                text: gettext('No examiner(s)')
            }, {
                text: gettext('Specific examiner'),
                menu: {
                    xtype: 'dynamicloadmenu',
                    itemId: 'specificExaminerMenu'
                }
            }]

        // By tag
        }, {
            text: gettext('By tag'),
            menu: [{
                itemId: 'selectHasTag',
                text: gettext('Has tag(s)')
            }, {
                itemId: 'selectNoTag',
                text: gettext('No tag(s)')
            }, {
                text: gettext('Specific tag'),
                menu: {
                    xtype: 'dynamicloadmenu',
                    itemId: 'specificTagMenu'
                }
            }]
        }]);
        var menu = {
            xtype: 'menu',
            plain: true,
            itemId: config.itemId,
            items: menuitems
        }
        return menu;
    }