function() {
        // Notifications
        let notificationUrgent = this._notificationQueue.length > 0 && this._notificationQueue[0].urgency == Urgency.CRITICAL;
        let notificationsPending = this._notificationQueue.length > 0 && ((!this._busy && !this._inFullscreen) || notificationUrgent);
        let notificationPinned = this._pointerInTray && !this._pointerInSummary && !this._notificationRemoved;
        let notificationExpanded = this._notificationBin.y < 0;
        let notificationExpired = (this._notificationTimeoutId == 0 && !(this._notification && this._notification.urgency == Urgency.CRITICAL) && !this._pointerInTray && !this._locked && !(this._pointerInKeyboard && notificationExpanded)) || this._notificationRemoved;
        let canShowNotification = notificationsPending && this._summaryState == State.HIDDEN;

        if (this._notificationState == State.HIDDEN) {
            if (canShowNotification)
                this._showNotification();
        } else if (this._notificationState == State.SHOWN) {
            if (notificationExpired)
                this._hideNotification();
            else if (notificationPinned && !notificationExpanded)
                this._expandNotification(false);
            else if (notificationPinned)
                this._ensureNotificationFocused();
        }

        // Summary
        let summarySummoned = this._pointerInSummary || this._overviewVisible ||  this._traySummoned;
        let summaryPinned = this._summaryTimeoutId != 0 || this._pointerInTray || summarySummoned || this._locked;
        let summaryHovered = this._pointerInTray || this._pointerInSummary;
        let summaryVisibleWithNoHover = (this._overviewVisible || this._locked) && !summaryHovered;
        let summaryNotificationIsForExpandedSummaryItem = (this._clickedSummaryItem == this._expandedSummaryItem);

        let notificationsVisible = (this._notificationState == State.SHOWING ||
                                    this._notificationState == State.SHOWN);
        let notificationsDone = !notificationsVisible && !notificationsPending;

        let summaryOptionalInOverview = this._overviewVisible && !this._locked && !summaryHovered;
        let mustHideSummary = (notificationsPending && (notificationUrgent || summaryOptionalInOverview))
                              || notificationsVisible;

        if (this._summaryState == State.HIDDEN && !mustHideSummary) {
            if (summarySummoned) {
                this._showSummary(0);
            } else if (notificationsDone && !this._busy && !this._inFullscreen) {
                if (this._backFromAway && this._unseenNotifications.length > 0)
                    this._showSummary(LONGER_SUMMARY_TIMEOUT);
                else if (this._newSummaryItems.length > 0)
                    this._showSummary(SUMMARY_TIMEOUT);
            }
        } else if (this._summaryState == State.SHOWN) {
            if (!summaryPinned || mustHideSummary)
                this._hideSummary();
            else if (summaryVisibleWithNoHover && !summaryNotificationIsForExpandedSummaryItem)
                // If we are hiding the summary, we'll collapse the expanded summary item when we are done
                // so that there is no animation. However, we should collapse the expanded summary item
                // if the summary is visible, but not hovered over, and the summary notification for the
                // expanded summary item is not being shown.
                this._setExpandedSummaryItem(null);
        }

        // Summary notification
        let haveClickedSummaryItem = this._clickedSummaryItem != null;
        let summarySourceIsMainNotificationSource = (haveClickedSummaryItem && this._notification &&
                                                     this._clickedSummaryItem.source == this._notification.source);
        let canShowSummaryBoxPointer = this._summaryState == State.SHOWN;
        // We only have sources with empty notification stacks for legacy tray icons. Currently, we never attempt
        // to show notifications for legacy tray icons, but this would be necessary if we did.
        let requestedNotificationStackIsEmpty = (this._clickedSummaryItemMouseButton == 1 && this._clickedSummaryItem.source.notifications.length == 0);
        let wrongSummaryNotificationStack = (this._clickedSummaryItemMouseButton == 1 &&
                                             this._summaryBoxPointer.bin.child != this._clickedSummaryItem.notificationStackView);
        let wrongSummaryRightClickMenu = (this._clickedSummaryItemMouseButton == 3 &&
                                          this._summaryBoxPointer.bin.child != this._clickedSummaryItem.rightClickMenu);
        let wrongSummaryBoxPointer = (haveClickedSummaryItem &&
                                      (wrongSummaryNotificationStack || wrongSummaryRightClickMenu));

        if (this._summaryBoxPointerState == State.HIDDEN) {
            if (haveClickedSummaryItem && !summarySourceIsMainNotificationSource && canShowSummaryBoxPointer && !requestedNotificationStackIsEmpty)
                this._showSummaryBoxPointer();
        } else if (this._summaryBoxPointerState == State.SHOWN) {
            if (!haveClickedSummaryItem || !canShowSummaryBoxPointer || wrongSummaryBoxPointer || mustHideSummary) {
                this._hideSummaryBoxPointer();
                if (wrongSummaryBoxPointer)
                    this._showSummaryBoxPointer();
            }
        }

        // Tray itself
        let trayIsVisible = (this._trayState == State.SHOWING ||
                             this._trayState == State.SHOWN);
        let trayShouldBeVisible = (!notificationsDone ||
                                   this._summaryState == State.SHOWING ||
                                   this._summaryState == State.SHOWN);
        if (!trayIsVisible && trayShouldBeVisible)
            this._showTray();
        else if (trayIsVisible && !trayShouldBeVisible)
            this._hideTray();
    }