function init(aProp) {
    // Accept non-array strings for DOMString[] properties and convert them.
    function _create(aField) {
      if (typeof aField == "string")
        return new Array(aField);
      return aField;
    };

    this.name =            _create(aProp.name) || null;
    this.honorificPrefix = _create(aProp.honorificPrefix) || null;
    this.givenName =       _create(aProp.givenName) || null;
    this.additionalName =  _create(aProp.additionalName) || null;
    this.familyName =      _create(aProp.familyName) || null;
    this.honorificSuffix = _create(aProp.honorificSuffix) || null;
    this.nickname =        _create(aProp.nickname) || null;
    this.email =           _create(aProp.email) || null;
    this.photo =           _create(aProp.photo) || null;
    this.url =             _create(aProp.url) || null;
    this.category =        _create(aProp.category) || null;

    if (aProp.adr) {
      // Make sure adr argument is an array. Instanceof doesn't work.
      aProp.adr = Array.isArray(aProp.adr) ? aProp.adr : [aProp.adr];

      this.adr = new Array();
      for (let i = 0; i < aProp.adr.length; i++)
        this.adr.push(new ContactAddress(aProp.adr[i].type, aProp.adr[i].streetAddress, aProp.adr[i].locality,
                                         aProp.adr[i].region, aProp.adr[i].postalCode, aProp.adr[i].countryName));
    } else {
      this.adr = null;
    }

    if (aProp.tel) {
      aProp.tel = Array.isArray(aProp.tel) ? aProp.tel : [aProp.tel];
      this.tel = new Array();
      for (let i = 0; i < aProp.tel.length; i++)
        this.tel.push(new ContactTelephone(aProp.tel[i].type, aProp.tel[i].number));
    } else {
      this.tel = null;
    }

    this.org =             _create(aProp.org) || null;
    this.jobTitle =        _create(aProp.jobTitle) || null;
    this.bday =            (aProp.bday == "undefined" || aProp.bday == null) ? null : new Date(aProp.bday);
    this.note =            _create(aProp.note) || null;
    this.impp =            _create(aProp.impp) || null;
    this.anniversary =     (aProp.anniversary == "undefined" || aProp.anniversary == null) ? null : new Date(aProp.anniversary);
    this.sex =             (aProp.sex != "undefined") ? aProp.sex : null;
    this.genderIdentity =  (aProp.genderIdentity != "undefined") ? aProp.genderIdentity : null;
  }