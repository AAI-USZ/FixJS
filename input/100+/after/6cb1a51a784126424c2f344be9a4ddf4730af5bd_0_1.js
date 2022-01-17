function(config) {
        config = Ext.applyIf(config||{}, {
            componentType: 'PassportTopology',
            autoExpandColumn: 'sysname',
            fields: [
                {name: 'uid'},
                {name: 'severity'},
				{name: 'name'},
                {name: 'status'},
                {name: 'hasMonitor'},
                {name: 'usesMonitorAttribute'},
                {name: 'monitored'},
                {name: 'monitor'},
                {name: 'localint'},
                {name: 'macaddr'},
                {name: 'chassistype'},
                {name: 'pingstatus'},
                {name: 'sysname'},
                {name: 'connection'},
                {name: 'locking'},
            ],
            columns: [{
                id: 'severity',
                dataIndex: 'severity',
                header: _t('Events'),
                renderer: Zenoss.render.severity,
                width: 60
            },{
                id: 'sysname',
                dataIndex: 'sysname',
                header: _t('Remote Device'),
                renderer: render_link,
            },{
                id: 'name',
                dataIndex: 'name',
                header: _t('IP Address'),
			},{
                id: 'macaddr',
                dataIndex: 'macaddr',
                header: _t('Mac Address'),
                sortable: true,
                width: 120,
			},{
                id: 'localint',
                dataIndex: 'localint',
                header: _t('Local Interface'),
                sortable: true,
                width: 120,
                renderer: render_link,
			},{
                id: 'chassistype',
                dataIndex: 'chassistype',
                header: _t('Chassis Type'),
                sortable: true,
                width: 160,
			},{
                id: 'connection',
                dataIndex: 'connection',
                header: _t('Connection'),
                sortable: true,
                width: 120,
			},{
                id: 'pingstatus',
                dataIndex: 'pingstatus',
                header: _t('Status'),
                sortable: true,
                width: 120,
                renderer: function(pS) {
        			if (pS=='Up') {
        			  return Zenoss.render.pingStatus('up');
        			} if (pS=='Down') {
          			  return Zenoss.render.pingStatus('down');
        			} else {
        			  return 'Unknown';
        			}
                },
            },{
                id: 'monitored',
                dataIndex: 'monitored',
                header: _t('Monitored'),
            },{ 
                id: 'locking',
                dataIndex: 'locking',
                header: _t('Locking'),
                width: 72,
                renderer: Zenoss.render.locking_icons,
            }]
        });
        ZC.PassportTopologyPanel.superclass.constructor.call(this, config);
    }