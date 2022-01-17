function (candidate, moreToFollow) {
    if (candidate) {
      this._endpoints.push(new CA.ClientEndpoint(candidate));
    }
    if (!moreToFollow) {
      if (this._offeringClient) {
        this._offerReadyHandler(new CA.ClientDetails(this._offer.toSdp(), this._endpoints));
      } else {
//        Answering client
        this._answerReadyHandler(new CA.ClientDetails(this._answer.toSdp(), this._endpoints));
      }
    }

  }