function(tab) {
    syncSetting(tab);

    // switch last active
    try {
      if (tab.windowId) {
        Tab.activeTabs[tab.windowId]['last_tab_id'] = Tab.activeTabs[tab.windowId]['current_tab_id']
        Tab.activeTabs[tab.windowId]['current_tab_id'] = tab.id
      }
    } catch (e) {
      console.log(e)
    }
  }