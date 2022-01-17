function (params) {
    if (!params.json) console.log("UNSUPPORTED WATCH");
    var data = underscore.extend({class: 'WATCH',
                                   enable: true,
                                   json: true,
                                   nmea: false,
                                   raw: 0,
                                   scaled: false,
                                   timing: false }, params);   
    self.send(data);
    self.send({"class":"DEVICE","path":"/agpsd","activated":dateformat((new Date()), "isoDateTime"),
               "driver":"AGPSD","native":1,"cycle":1.00});
  }