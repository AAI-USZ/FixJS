function () {

      // Add the cartodb tiles
      var cartodb_url = this.generateUrl("tiler") + '/tiles/' + this.options.table_name + '/{z}/{x}/{y}.png?'

      // set params
      var params = {};
      if(this.options.query) {
        params.sql = this.options.query;
      }
      if(this.options.style) {
        params.style = this.options.style;
      }
      var url_params = [];
      for(var k in params) {
        var q = encodeURIComponent(
          params[k].replace(/\{\{table_name\}\}/g, this.options.table_name)
        );
        url_params.push(k + "=" + q);
      }
      cartodb_url += url_params.join('&');


      // extra_params?
      for (_param in this.options.extra_params) {
         cartodb_url += "&"+_param+"="+this.options.extra_params[_param];
      }


      this.layer = new L.TileLayer(cartodb_url,{attribution:'CartoDB', opacity: this.options.opacity});

      this.options.map.addLayer(this.layer,false);
    }