function updateLaunchTime(origin) {
    if (!runningApps[origin]) {
      return;
    } else {
      runningApps[origin].launchTime = Date.now();
    }
  }