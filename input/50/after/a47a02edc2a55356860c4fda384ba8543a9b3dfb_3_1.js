function router(rest) {
      rest.post('/listentcp/:portNum', listenTcp);
      rest.post('/listenhttp/:portNum', listenHttp);
      rest.post('/listenudp/:portNum', listenUdp);
      rest.get('/onPageLoad', onPageLoad);
    }