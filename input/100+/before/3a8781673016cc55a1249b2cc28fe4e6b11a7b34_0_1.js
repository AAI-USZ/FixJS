function(options)
    {
    	console.log('in the agenda list');
        if ( ! this.agendaListView)
        {
            this.agendaListView = this.render({
                xtype: 'AgendaListView',
            });

            this.agendaListView.addListener('itemtap',
            	function(that, index, item, e) {
					var record = that.store.getAt(index);
					OKnesset.app.controllers.navigation.dispatchPanel('Agenda/Index/' + record.data.id, options.historyUrl);
				});
        }

        this.application.viewport.query('#toolbar')[0].setTitle(OKnesset.strings.agendasTitle);
        this.application.viewport.setActiveItem(this.agendaListView, options.animation);
    }