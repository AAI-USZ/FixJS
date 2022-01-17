function() {
    if(typeof self.current.response.headers[header] !== "undefined") {
      expect(self.current.response.headers[header].toLowerCase()).toContain(content.toLowerCase());
    } else {
      fail("Header '" + header.toLowerCase() + "' not present in HTTP response");
    }
  }