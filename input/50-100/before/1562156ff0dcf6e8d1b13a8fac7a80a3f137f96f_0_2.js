function (candidate, moreToFollow) {
    this._endpoints.push(new CA.ClientEndpoint(candidate));
    if (!moreToFollow) {
      if (this._offeringClient) {
        this._offerReadyHandler(new CA.ClientDetails(this._offer, this._endpoints));
      } else {
//        Answering client
        this._answerReadyHandler(new CA.ClientDetails(this._answer, this._endpoints));
      }
    }

  }