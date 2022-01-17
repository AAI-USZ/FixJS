function(list) {
                if (retVal.tag != "") {
                    me.core.setTags(list, retVal.tag, function() { ew_InstancesTreeView.refresh() });
                } else {
                    ew_InstancesTreeView.refresh();
                }
                me.core.selectTab('ew.tabs.instance');
            }