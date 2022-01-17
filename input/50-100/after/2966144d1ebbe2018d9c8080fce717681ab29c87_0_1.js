function() {
    var uuids = MobDeals.Account._getUuids();
    data = {
      platform: MobDeals.Habitat.platform,
      adcolony_udid: window.loot_native.getAdColonyDeviceId(),
      android_id: uuids.android_id,
      android_serial_number: uuids.android_id,
      android_telephony_id: uuids.android_telephony_id,
      mac_address: uuids.mac_address
    };
    MobDeals.Account._registerDevice(data);
  }