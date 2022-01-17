function(tabPanel, activeTab) 
    {
        this.m_renderer.clear();
        var newTab = this.m_tabs[activeTab.id];

        // remove the topo graph from the south panel, if applicable 
        var oldTab = this.m_tabs[this.m_activeTabID];
        if(oldTab != null && oldTab.topoRenderer != null)
        {
            oldTab.topoRenderer.removeFromPanel();
        }

        // draw the new tab, if applicable
        if (newTab != null)
        {
            this.m_activeTabID = activeTab.id;
            newTab.draw();
        }
        else
        {
            this.m_activeTabID = 0;
            this.controller.deactivate(this.CLASS_NAME);
            this.m_forms.panelActivated();
        }

        // hide the south panel, if empty
        if (this.ui.innerSouth.isVisible()  && this.ui.innerSouth.getEl().dom.childNodes.length == 0)
            this.closeElevation();

        // update the dynamic link to the current trip plan
        if (this.m_activeTabID === 0)
        {
            location.hash = '#/';
            document.title = this.appName;
        }
        else
        {
            // we're on a TP tab
            // template for the dynamic url
            if (this.m_hashTemplate == null) {
                this.m_hashTemplate = new Ext.XTemplate('#/' + otp.planner.ParamTemplate).compile();
            }
            location.hash = this.m_hashTemplate.apply(newTab.request);
            // update the title so folks bookmark something meaningful
            document.title = newTab.getTitle() + ' - ' + this.appName;
        }
    }