function router(rest) {
      rest.get('/listentcp/:portNum', listenTcp);
      rest.get('/listenhttp/:portNum', listenHttp);
      rest.get('/listenudp/:portNum', listenUdp);
      rest.get('/onPageLoad', onPageLoad);
    }