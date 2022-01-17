function decodeRequest(req) {
    return decodeRequestV2(req) || decodeRequestV1(req)
  }