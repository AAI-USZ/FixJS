function() {

		this.logAuthor = '['+ this.id + ']';

		log.debug('InitComponent ' + this.id + ' (reportMode: ' + this.reportMode + ', exportMode: ' + this.exportMode + ')', this.logAuthor);

		if (this.title == '') {
			this.title = false;
		}

		this.wcontainerId = this.id + '-content';

		this.wcontainer = Ext.create('Ext.container.Container', { id: this.wcontainerId, border: false, layout: this.wcontainer_layout, autoScroll: this.wcontainer_autoScroll });
		this.items = this.wcontainer;

		this.wcontainer.on('afterrender', this.afterContainerRender, this);

		this.wcontainer.on('afterrender', function() {
			log.debug('SetHeight of wcontainer', this.logAuthor);
			this.wcontainer.setHeight(this.getHeight());
		}, this);

		this.callParent(arguments);

		this.uri = '/rest/events/event';

		if (this.reportMode) {
			this.refreshInterval = false;
		}

		//Compatibility
		if (this.nodes) {
			if (this.nodes.length > 0) {
				log.debug('Nodes:', this.logAuthor);
				log.dump(this.nodes);
				this.nodeId = this.nodes[0].id;
				this.metrics = this.nodes[0].metrics;
			}
		}

		//if reporting
		if (this.exportMode) {
			//this._reporting(this.reportStartTs,this.reportStopTs)
			//this._reporting(reportStart,reportStop)
			//this.uri += '/' + this.nodeId;

			/*if (this.nodeId){
				log.debug(' + NodeId: '+this.nodeId, this.logAuthor)
				this.on('afterrender', this._doRefresh, this);
			}*/

			//this._doRefresh()

		}else {
			if (this.refreshInterval) {
				log.debug(' + Refresh Interval: ' + this.refreshInterval, this.logAuthor);
				this.task = {
					run: this._doRefresh,
					interval: this.refreshInterval * 1000,
					scope: this
				};
			}
		}
	}