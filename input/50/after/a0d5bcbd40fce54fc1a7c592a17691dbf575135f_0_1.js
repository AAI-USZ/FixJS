function(header)
    {
      return [["th", header.name + ":", "data-spec", "http#" + header.name], ["td", header.value]];
    }