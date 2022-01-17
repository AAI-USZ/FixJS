function() {
        this.userCellTemplate = new Ext.XTemplate(
            '<div class="userinfo">',
                '<div class="full_name"><strong>',
                    '<tpl if="full_name">',
                        '{full_name}',
                    '<tpl else>',
                        gettext('Full name missing'),
                    '</tpl>',
                '</strong></div>',
                '<div class="username"><small>{username}</small></div>',
            '</div>'
        );
        this.tagsAndExaminersCellTemplate = new Ext.XTemplate(
            '<ul class="unstyled">',
                '<tpl for="tagsAndExaminers">',
                    '<li>',
                        '{tag}: <small>',
                        '<tpl for="examiners">',
                            '<tpl if="data.user.full_name">',
                                '{data.user.full_name}',
                            '<tpl else>',
                                '{data.user.username}',
                            '</tpl>',
                            '<tpl if="xindex != xcount">, </tpl>',
                        '</tpl></small>',
                    '</li>',
                '</tpl>',
            '</ul>'
        );
        this.tagsCellTemplate = new Ext.XTemplate(
            '<ul class="unstyled">',
                '<tpl for="tags">',
                    '<li>{.}</li>',
                '</tpl>',
            '</ul>'
        );


        Ext.apply(this, {
            layout: 'border',
            closable: true,
            width: 850,
            height: 500,
            //maximizable: true,
            modal: true,
            title: gettext('Add students'),
            buttons: [{
                xtype: 'button',
                itemId: 'refreshButton',
                scale: 'medium',
                text: gettext('Refresh')
            }, {
                xtype: 'checkbox',
                itemId: 'allowDuplicatesCheckbox',
                boxLabel: gettext('Allow duplicates'),
                tooltip: gettext('Check this to allow students to be in more than one group. Checking this stops hiding students that are already in a group on this assignment from the list. The use-case for this feature is if you have project assignments where students are in more than one project group. <strong>Keep this unchecked if you are unsure of what to do</strong>.')
            }, '->', {
                xtype: 'checkbox',
                itemId: 'includeTagsCheckbox',
                checked: true,
                boxLabel: gettext('Include tags'),
                tooltip: gettext('Check this to tag the added students with the tags they have on the period. Keep this checked if you are unsure of what to do. When this is checked, tags are displayed in the second column of the table.')
            }, {
                xtype: 'checkbox',
                checked: true,
                tooltip: gettext('Check this to automatically set examiners that have at least one tag in common with the student as their examiner on this assignment. When this is checked, the result of the tag-matching is displayed in the second column of the table.'),
                itemId: 'automapExaminersCheckbox',
                boxLabel: gettext('Autoset examiners by tags')
            }, {
                xtype: 'primarybutton',
                itemId: 'saveButton',
                text: gettext('Add selected students')
            }]
        });
        this.callParent(arguments);
        this.refreshBody();
    }