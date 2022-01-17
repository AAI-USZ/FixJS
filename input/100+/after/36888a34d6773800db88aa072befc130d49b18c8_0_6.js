function(device, accessPoint) {
        if (accessPoint._updateId) {
            accessPoint.disconnect(accessPoint._updateId);
            accessPoint._updateId = 0;
        }

        let res = this._findExistingNetwork(accessPoint);

        if (res == null) {
            log('Removing an access point that was never added');
            return;
        }

        let apObj = this._networks[res.network];
        apObj.accessPoints.splice(res.ap, 1);

        if (apObj.accessPoints.length == 0) {
            if (this._activeNetwork == apObj)
                this._activeNetwork = null;

            if (apObj.item)
                apObj.item.destroy();

            if (this._overflowItem) {
                if (!apObj.isMore) {
                    // we removed an item in the main menu, and we have a more submenu
                    // we need to extract the first item in more and move it to the submenu

                    let item = this._overflowItem.menu.firstMenuItem;
                    if (item && item._apObj) {
                        item.destroy();
                        // clear the cycle, and allow the construction of the new item
                        item._apObj.item = null;

                        this._createNetworkItem(item._apObj, NUM_VISIBLE_NETWORKS-1);
                    } else {
                        log('The more... menu was existing and empty! This should not happen');
                    }
                }

                // This can happen if the removed connection is from the overflow
                // menu, or if we just moved the last connection out from the menu
                if (this._overflowItem.menu.numMenuItems == 0) {
                    this._overflowItem.destroy();
                    this._overflowItem = null;
                }
            }

            this._networks.splice(res.network, 1);
        } else {
            let okPrev = true, okNext = true;

            if (res.network > 0)
                okPrev = this._networkSortFunction(this._networks[res.network - 1], apObj) >= 0;
            if (res.network < this._networks.length-1)
                okNext = this._networkSortFunction(this._networks[res.network + 1], apObj) <= 0;

            if (!okPrev || !okNext) {
                this._clearSection();
                this._queueCreateSection();
            } else if (apObj.item) {
                apObj.item.updateBestAP(apObj.accessPoints[0]);
            }
        }
    }