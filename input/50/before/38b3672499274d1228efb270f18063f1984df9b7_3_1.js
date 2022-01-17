function sm_EnabledFetched() {
        self.reservedSettings.data = req.result['ril.data.disabled'];
        settings.getLock().set({'ril.data.disabled': true});
      }