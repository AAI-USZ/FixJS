function(address) {
      if (typeof address === 'number') {
        return null;
      }
      if (typeof address === 'string') {
        return address.split(':')[0];
      }
    }