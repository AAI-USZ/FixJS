function() {
    switch (build) {
      case 'custom':       return 'lodash.custom.min';
      case 'custom-debug': return 'lodash.custom';
      case 'prod':         return 'lodash.min';
    }
    return 'lodash';
  }