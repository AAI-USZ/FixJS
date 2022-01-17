function(panel, armed)
    {
        if (!panel)
            return;

        // If the script panels is disabled, BON can't be active.
        if (!Firebug.PanelActivation.isPanelEnabled("script"))
            armed = false;

        var panelBar = Firebug.chrome.$("fbPanelBar1");
        var tab = panelBar.getTab(panel.name);
        if (tab)
        {
            if (armed)
            {
                // If there is already a panel armed synchronize highlighting of the panel tabs
                var tabPanel = tab.parentNode;
                var otherTabIsArmed = false;
                for (var i = 0; i < tabPanel.children.length; ++i)
                {
                    var panelTab = tabPanel.children[i];
                    if (panelTab !== tab && panelTab.getAttribute("breakOnNextArmed") == "true")
                    {
                        panel.context.delayedArmedTab = tab;
                        Events.addEventListener(panelTab, "animationiteration",
                            this.toggleTabHighlighting, true);
                        otherTabIsArmed = true;
                        break;
                    }
                }

                if (!otherTabIsArmed)
                    tab.setAttribute("breakOnNextArmed", "true");
            }
            else
            {
                delete panel.context.delayedArmedTab;
                tab.setAttribute("breakOnNextArmed", "false");
            }
        }
    }