function(data) {
    // Confusing.  :-(  On the front-end, we store low-resolution platforms
    // (either 'ios' or 'android').  On the back-end, we store high-resolution
    // platforms ('iPhone', 'iPod touch', 'iPad', 'android', etc.)  So on the
    // front-end, we're storing this high-resolution platform in
    // MobDeals.Habitat.device_type.  Please fix me, someone, anyone.
    MobDeals.Habitat.device_type = data.platform;
    alert(data.mac_address);

    if ($.inArray(data.platform, ['iPhone', 'iPhone Simulator', 'iPod touch', 'iPad']) !== -1) {
      MobDeals.Habitat.platform = 'ios';
      if (data.mac_address) {
        MobDeals.Habitat.udid = data.mac_address;
        MobDeals.Habitat.udid_type = 'mac_address';
      }
    }
    else if (data.platform == 'android') {
      MobDeals.Habitat.platform = 'android';
      if (data.android_id) {
        MobDeals.Habitat.udid = data.android_id;
        MobDeals.Habitat.udid_type = 'android_id';
      }
    }

    $.support.cors = true;
    $.ajax({
      url: MobDeals.host('core') + '/devices.json',
      type: 'POST',
      xhrFields: {withCredentials: true},
      data: {device: data},
      dataType: 'json',
      crossDomain: true
    });
  }