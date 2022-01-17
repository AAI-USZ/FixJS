function(){
        this.header_panel = new Ext.Panel({  
            id: 'more_activities_header_panel',
            html: '<img src="/media/img/h_06_more_activities.png">',
	    border: 'north',
	    height: 54,
            bodyCfg: {            
                cls: 'action-panel-header'
            }
        });
    
		this.inner_panel = new Ext.Panel({
			html: this.getHtmlText(),
            id: 'draw_new_area_inner_panel',
			style: 'margin: 10px',
			border: false
		});
        
        this.button_panel = new gwst.widgets.YesNoButtons ({
            yes_handler: this.yesClicked.createDelegate(this),
            no_handler: this.noClicked.createDelegate(this)
        });
        
        this.add(this.header_panel);
		this.add(this.inner_panel);
        this.add(this.button_panel);
        
        // Call parent (required)
        gwst.widgets.MoreActivitiesPanel.superclass.onRender.apply(this, arguments); 
	}