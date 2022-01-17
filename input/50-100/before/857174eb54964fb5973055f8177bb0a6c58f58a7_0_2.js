function (listener) {
      console.log('removing listener for', listener[0]);
      chan.network.removeListener(listener[0], listener[1]);
    }