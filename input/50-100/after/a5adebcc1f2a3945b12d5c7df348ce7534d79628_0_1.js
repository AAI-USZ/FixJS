function scm_handleWakeLock(topic, state) {
      switch (topic) {
        case 'screen':
          self._screenWakeLocked = (state == 'locked-foreground');

          if (self._screenWakeLocked) {
            // Turn screen on if wake lock is acquire
            self.turnScreenOn();
          } else if (self._idled) {
            // Turn screen off if we are already idled
            // and wake lock is released
            self.turnScreenOff(false);
          }
          break;

        case 'cpu':
          power.cpuSleepAllowed = (state != 'locked-foreground' &&
                                   state != 'locked-background');
          break;

        case 'wifi':
          // Do we need to do anything in Gaia?
          break;
      }
    }