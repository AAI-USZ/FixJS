function() {
        this._syncActiveConnections();
        let mc = this._mainConnection;
        let hasApIcon = false;
        let hasMobileIcon = false;

        if (!mc) {
            this.setIcon('network-offline');
        } else if (mc.state == NetworkManager.ActiveConnectionState.ACTIVATING) {
            switch (mc._section) {
            case NMConnectionCategory.WWAN:
                this.setIcon('network-cellular-acquiring');
                break;
            case NMConnectionCategory.WIRELESS:
                this.setIcon('network-wireless-acquiring');
                break;
            case NMConnectionCategory.WIRED:
                this.setIcon('network-wired-acquiring');
                break;
            default:
                // fallback to a generic connected icon
                // (it could be a private connection of some other user)
                this.setIcon('network-wired-acquiring');
            }
        } else {
            let dev;
            switch (mc._section) {
            case NMConnectionCategory.WIRELESS:
                dev = mc._primaryDevice;
                if (dev) {
                    let ap = dev.device.active_access_point;
                    let mode = dev.device.mode;
                    if (!ap) {
                        if (mode != NM80211Mode.ADHOC) {
                            log('An active wireless connection, in infrastructure mode, involves no access point?');
                            break;
                        }
                        this.setIcon('network-wireless-connected');
                    } else {
                        if (this._activeAccessPoint != ap) {
                            if (this._accessPointUpdateId)
                                this._activeAccessPoint.disconnect(this._accessPointUpdateId);
                            this._activeAccessPoint = ap;
                            this._activeAccessPointUpdateId = ap.connect('notify::strength', Lang.bind(this, function() {
                                this.setIcon('network-wireless-signal-' + signalToIcon(ap.strength));
                            }));
                        }
                        this.setIcon('network-wireless-signal-' + signalToIcon(ap.strength));
                        hasApIcon = true;
                    }
                    break;
                } else {
                    log('Active connection with no primary device?');
                    break;
                }
            case NMConnectionCategory.WIRED:
                this.setIcon('network-wired');
                break;
            case NMConnectionCategory.WWAN:
                dev = mc._primaryDevice;
                if (!dev) {
                    log('Active connection with no primary device?');
                    break;
                }
                if (!dev.mobileDevice) {
                    // this can happen for bluetooth in PAN mode
                    this.setIcon('network-cellular-connected');
                    break;
                }

                if (dev.mobileDevice != this._mobileUpdateDevice) {
                    if (this._mobileUpdateId)
                        this._mobileUpdateDevice.disconnect(this._mobileUpdateId);
                    this._mobileUpdateDevice = dev.mobileDevice;
                    this._mobileUpdateId = dev.mobileDevice.connect('notify::signal-quality', Lang.bind(this, function() {
                        this.setIcon('network-cellular-signal-' + signalToIcon(dev.mobileDevice.signal_quality));
                    }));
                }
                this.setIcon('network-cellular-signal-' + signalToIcon(dev.mobileDevice.signal_quality));
                hasMobileIcon = true;
                break;
            default:
                // fallback to a generic connected icon
                // (it could be a private connection of some other user)
                this.setIcon('network-wired');
                break;
            }
        }

        // update VPN indicator
        if (this._vpnConnection) {
            let vpnIconName = 'network-vpn';
            if (this._vpnConnection.state == NetworkManager.ActiveConnectionState.ACTIVATING)
                vpnIconName = 'network-vpn-acquiring';

            // only show a separate icon when we're using a wireless/3g connection
            if (mc._section == NMConnectionCategory.WIRELESS || 
                mc._section == NMConnectionCategory.WWAN) {
                this._secondaryIcon.icon_name = vpnIconName;
                this._secondaryIcon.visible = true;
            } else {
                this.setIcon(vpnIconName);
                this._secondaryIcon.visible = false;
            }
        } else {
            this._secondaryIcon.visible = false;
        }

        // cleanup stale signal connections

        if (!hasApIcon && this._activeAccessPointUpdateId) {
            this._activeAccessPoint.disconnect(this._activeAccessPointUpdateId);
            this._activeAccessPoint = null;
            this._activeAccessPointUpdateId = 0;
        }
        if (!hasMobileIcon && this._mobileUpdateId) {
            this._mobileUpdateDevice.disconnect(this._mobileUpdateId);
            this._mobileUpdateDevice = null;
            this._mobileUpdateId = 0;
        }
    }