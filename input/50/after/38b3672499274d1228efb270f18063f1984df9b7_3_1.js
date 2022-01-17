function sm_EnabledFetched() {
        self.reservedSettings.data = req.result['ril.data.enabled'];
        settings.getLock().set({'ril.data.enabled': false});
      }