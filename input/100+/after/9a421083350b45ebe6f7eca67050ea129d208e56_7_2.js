function updateLaunchTime(origin) {
    if (!runningApps[origin])
      return;

    runningApps[origin].launchTime = Date.now();
  }