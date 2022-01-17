function(station) {
    return {
      veryVerbose: true,
      bssid: station.bssid,
      auto: true,
      channel: station.channel,
      dhSmall: true,
      noNacks: true,
      interface: 'mon0'
    };
  }