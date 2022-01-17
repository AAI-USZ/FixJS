function Provisioning(info, onsuccess, onfailure) {
    if(status === Provisioning.AUTHENTICATED) {
      onsuccess(keypair, cert);
    }
    else onfailure(failure);
  }