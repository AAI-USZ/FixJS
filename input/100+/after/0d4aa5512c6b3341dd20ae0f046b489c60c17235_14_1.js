function(msg) {
      console.log(msg);
      var base_mode = msg.get('base_mode');
      var type = msg.get('type');
      var custom_mode = msg.get('custom_mode');

      if (!(base_mode && type && custom_mode)) {
        return;
      }

      if (!base_mode & this.MAV_MODE_FLAG_CUSTOM_MODE_ENABLED) {
        return ('BaseMode('+ base_mode + ')');
      } else if (type == this.MAV_TYPE_QUADROTOR &&
                 custom_mode in this.arduCopterFlightModes) {
        return this.arduCopterFlightModes[msg.custom_mode];
      } else if (type == this.MAV_TYPE_FIXED_WING &&
                 custom_mode in this.arduPlaneFlightModes) {
        return this.arduPlaneFlightModes[msg.custom_mode];
      }
      return ('CustomMode(' + msg.custom_mode + ')');
    }