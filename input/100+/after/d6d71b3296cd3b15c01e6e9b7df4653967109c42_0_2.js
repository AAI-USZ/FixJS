function (candidate, moreToFollow) {
    if (candidate) {
      log.debug("[PC] = Got local ice candidate: " + candidate.toSdp());
      this._endpoints.push(new CA.ClientEndpoint(candidate));
    }
    if (!moreToFollow) {
      log.debug("[PC] = Ice candidates list complete. Calling offer/answer ready " +
          "handler");
      if (this._offeringClient) {
        this._offerReadyHandler(new CA.ClientDetails(this._offer.toSdp(), this._endpoints));
      } else {
//        Answering client
        this._answerReadyHandler(new CA.ClientDetails(this._answer.toSdp(), this._endpoints));
      }
    }

  }