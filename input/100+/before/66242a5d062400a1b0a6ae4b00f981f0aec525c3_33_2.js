function sb_updateSignal() {
      var conn = window.navigator.mozMobileConnection;
      if (!conn || !conn.data)
        return;

      var data = conn.data;
      var icon = this.icons.data;

      if (!this.settingValues['ril.data.enabled'] ||
          this.wifiConnected || !data.connected) {
        icon.hidden = true;

        return;
      }

      icon.hidden = false;
      var type = '';

      switch (data.type) {
        case 'lte':
          type = 'LTE';
          break;

        // This icon is not used
        // type = '4G';
        //  break;

        // 3.5G, show them as 3G
        case 'hsdpa':
        case 'hsupa':
        case 'hspa+':

        // CDMA 3G
        case 'evdo0':
        case 'evdoa':
        case 'evdob':
        case '1xrtt':

        // 3G
        case 'umts':
          type = '3G';
          break;

        case 'edge':
          type = 'EDGE';
          break;

        // CDMA 2G
        case 'is95a':
        case 'is95b':

        // 2G
        case 'gprs':
        default:
          type = '2G';
      }

      icon.dataset.type = type;
    }