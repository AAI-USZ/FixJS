function currentStatus() {
    return {
      "open": socketOpen,
      "port": currentHttpPort
    };
  }