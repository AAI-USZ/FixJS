function closeTab(tab)
{
    if (tabArray.length == 0)
        return

    if (tabArray.length == 1) {
        tabArray.pop()
        updateUrlsOpened()
        BrowserWindow.closeWindow()
        return
    }

    var rightTab = getRightTab(tab)
    var leftTab = getLeftTab(tab)

    var tabIndex = tabArray.indexOf(tab)
    if (tabIndex > 0) {
        if (tabIndex == tabArray.length - 1) {
            leftTab.isLastTab = true;
            if (tab.active) {
                setActiveTab(leftTab)
            }
        } else {
            rightTab.previousTab = leftTab
            rightTab.content.x = leftTab.rightEdge()
            updateGeometryFollowingTabs(rightTab)
            if (tab.active) {
                setActiveTab(rightTab)
            }
        }
    } else {
        rightTab.previousTab = undefined
        rightTab.content.x = 0
        updateGeometryFollowingTabs(rightTab)
        if (tab.active) {
            setActiveTab(rightTab)
        }

    }

    tabArray.splice(tabIndex, 1)
}