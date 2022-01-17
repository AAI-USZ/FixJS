function() {
    // Note: This is only for Android.  iOS device registrations are handled
    // differently.
    var uuids = window.loot_native === undefined ? null : window.loot_native.getUuids();
    uuids = $.parseJSON(uuids);
    return uuids;
  }