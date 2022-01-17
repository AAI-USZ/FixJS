function(attr, inherit) {
        inherit = (inherit===undefined) ? true : inherit;
        var getter = 'get'+attr[0].toUpperCase()+attr.slice(1);
        var resp = null
        if (this[getter]) {
          resp = this[getter]()
        }
        else if (this[attr] === undefined && this.parent && inherit) {
          resp = this.parent.get(attr);
        }
        else {
          resp = this[attr];
        }

        if (resp instanceof Function) {
          resp = jQuery.proxy(resp, this)
        }

        return resp
      }