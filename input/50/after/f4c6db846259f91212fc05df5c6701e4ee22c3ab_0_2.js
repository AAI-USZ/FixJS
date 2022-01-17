function(header)
    {
      return this._wrap_pre([["span", header.name + ":", "data-spec", "http#" + header.name], ["span", " " + header.value]]);
    }