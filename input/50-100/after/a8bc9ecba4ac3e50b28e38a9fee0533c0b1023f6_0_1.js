function() {
    if(typeof self.current.response.headers[header] !== "undefined") {
      expect(self.current.response.headers[header].toLowerCase()).toEqual(content.toLowerCase());
    } else {
      throw new Error("Header '" + header + "' not present in HTTP response");
    }
  }