function(attr, inherit) {
        inherit = (inherit===undefined) ? true : inherit;
        var getter = 'get'+attr[0].toUpperCase()+attr.slice(1);
        if (this[getter]) {
          return this[getter]()
        }
        if (this[attr] === undefined && this.parent && inherit) {
          return this.parent.get(attr);
        }
        return this[attr];
      }