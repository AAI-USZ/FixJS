function(address) {
      if (typeof address === 'number') {
        return address;
      }
      if (typeof address === 'string') {
        return address.split(':')[1];
      }
    }