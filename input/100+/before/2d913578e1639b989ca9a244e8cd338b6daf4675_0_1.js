function() {
        this._presence = new GnomeSession.Presence(Lang.bind(this, function(proxy, error) {
            this._onStatusChanged(proxy.status);
        }));
        this._busy = false;
        this._presence.connectSignal('StatusChanged', Lang.bind(this, function(proxy, senderName, [status]) {
            this._onStatusChanged(status);
        }));

        this.actor = new St.Widget({ name: 'message-tray',
                                     reactive: true,
                                     track_hover: true });
        this.actor.connect('notify::hover', Lang.bind(this, this._onTrayHoverChanged));

        this._notificationBin = new St.Bin();
        this.actor.add_actor(this._notificationBin);
        this._notificationBin.hide();
        this._notificationQueue = [];
        this._notification = null;
        this._notificationClickedId = 0;

        this._summaryBin = new St.Bin({ x_align: St.Align.END });
        this.actor.add_actor(this._summaryBin);
        this._summary = new St.BoxLayout({ name: 'summary-mode',
                                           reactive: true,
                                           track_hover: true });
        this._summary.connect('notify::hover', Lang.bind(this, this._onSummaryHoverChanged));
        this._summaryBin.child = this._summary;
        this._summaryBin.opacity = 0;

        this._summaryMotionId = 0;
        this._trayMotionId = 0;

        this._summaryBoxPointer = new BoxPointer.BoxPointer(St.Side.BOTTOM,
                                                            { reactive: true,
                                                              track_hover: true });
        this._summaryBoxPointer.actor.style_class = 'summary-boxpointer';
        this._summaryBoxPointer.actor.hide();
        Main.layoutManager.addChrome(this._summaryBoxPointer.actor, { visibleInFullscreen: true });

        this._summaryBoxPointerItem = null;
        this._summaryBoxPointerContentUpdatedId = 0;
        this._summaryBoxPointerDoneDisplayingId = 0;
        this._clickedSummaryItem = null;
        this._clickedSummaryItemMouseButton = -1;
        this._clickedSummaryItemAllocationChangedId = 0;
        this._expandedSummaryItem = null;
        this._summaryItemTitleWidth = 0;
        this._pointerBarrier = 0;

        this._unseenNotifications = [];
        this._idleMonitorWatchId = 0;
        this._backFromAway = false;

        this.idleMonitor = new Shell.IdleMonitor();

        // To simplify the summary item animation code, we pretend
        // that there's an invisible SummaryItem to the left of the
        // leftmost real summary item, and that it's expanded when all
        // of the other items are collapsed.
        this._imaginarySummaryItemTitleWidth = 0;

        this._focusGrabber = new FocusGrabber();
        this._focusGrabber.connect('focus-grabbed', Lang.bind(this,
            function() {
                if (this._summaryBoxPointer.bin.child)
                    this._lock();
            }));
        this._focusGrabber.connect('focus-ungrabbed', Lang.bind(this, this._unlock));
        this._focusGrabber.connect('button-pressed', Lang.bind(this,
           function(focusGrabber, source) {
               if (this._clickedSummaryItem && !this._clickedSummaryItem.actor.contains(source))
                   this._unsetClickedSummaryItem();
               this._focusGrabber.ungrabFocus();
           }));
        this._focusGrabber.connect('escape-pressed', Lang.bind(this, this._escapeTray));

        Main.layoutManager.keyboardBox.connect('notify::hover', Lang.bind(this, this._onKeyboardHoverChanged));

        this._trayState = State.HIDDEN;
        this._locked = false;
        this._traySummoned = false;
        this._useLongerTrayLeftTimeout = false;
        this._trayLeftTimeoutId = 0;
        this._pointerInTray = false;
        this._pointerInKeyboard = false;
        this._summaryState = State.HIDDEN;
        this._summaryTimeoutId = 0;
        this._pointerInSummary = false;
        this._notificationState = State.HIDDEN;
        this._notificationTimeoutId = 0;
        this._notificationExpandedId = 0;
        this._summaryBoxPointerState = State.HIDDEN;
        this._summaryBoxPointerTimeoutId = 0;
        this._overviewVisible = Main.overview.visible;
        this._notificationRemoved = false;
        this._reNotifyAfterHideNotification = null;
        this._inFullscreen = false;

        this._corner = new Clutter.Rectangle({ width: 1,
                                               height: 1,
                                               opacity: 0,
                                               reactive: true });
        this._corner.connect('enter-event', Lang.bind(this, this._onCornerEnter));
        Main.layoutManager.trayBox.add_actor(this._corner);
        Main.layoutManager.trackChrome(this._corner);

        Main.layoutManager.trayBox.add_actor(this.actor);
        this.actor.y = this.actor.height;
        Main.layoutManager.trackChrome(this.actor);
        Main.layoutManager.trackChrome(this._notificationBin);

        Main.layoutManager.connect('monitors-changed', Lang.bind(this, this._setSizePosition));
        Main.layoutManager.connect('primary-fullscreen-changed', Lang.bind(this, this._onFullscreenChanged));

        this._setSizePosition();

        Main.overview.connect('showing', Lang.bind(this,
            function() {
                this._overviewVisible = true;
                if (this._locked) {
                    this._unsetClickedSummaryItem();
                    this._unlock();
                } else {
                    this._updateState();
                }
            }));
        Main.overview.connect('hiding', Lang.bind(this,
            function() {
                this._overviewVisible = false;
                if (this._locked) {
                    this._unsetClickedSummaryItem();
                    this._unlock();
                } else {
                    this._updateState();
                }
            }));

        this._summaryItems = [];
        // We keep a list of new summary items that were added to the summary since the last
        // time it was shown to the user. We automatically show the summary to the user if there
        // are items in this list once the notifications are done showing or once an item gets
        // added to the summary without a notification being shown.
        this._newSummaryItems = [];
        this._longestSummaryItem = null;
        this._chatSummaryItemsCount = 0;
    }