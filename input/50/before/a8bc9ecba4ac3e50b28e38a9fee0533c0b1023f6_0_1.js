function() {
    if(typeof self.current.response.body !== "undefined") {
      expect(self.current.response.body).toContain(content);
    } else {
      fail("No HTTP response body was present or HTTP response was empty");
    }
  }