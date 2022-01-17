function() {
        Ext.apply(this, {
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [this.heading = Ext.ComponentManager.create({
                xtype: 'component',
                data: {},
                cls: 'section treeheading',
                tpl: [
                    '<h1>{long_name}</h1>',
                    '<h2 class="endoflist">{parentnode__long_name}</h2>'
                ]
            }), {
                xtype: 'tabpanel',
                flex: 1,
                items: [
                {
                    xtype: 'administrator-period-listofassignments',
                    periodid: this.periodid,
                    title: 'Assignments'
                },
                {
                    title: 'Students',
                    xtype: 'statistics-periodadminlayout',
                    periodid: this.periodid,
                    hidesidebar: false,
                    defaultViewClsname: 'devilry.statistics.dataview.MinimalGridView'
                    //defaultViewClsname: 'devilry.statistics.dataview.FullGridView'
                },
                this.prettyview = Ext.widget('administrator_periodprettyview', {
                    title: 'Administer',
                    modelname: this.periodmodel_name,
                    objectid: this.periodid,
                    dashboardUrl: DASHBOARD_URL,
                    listeners: {
                        scope: this,
                        loadmodel: this._onLoadRecord,
                        edit: this._onEdit
                    }
                })]
            }]
        });
        this.callParent(arguments);
    }