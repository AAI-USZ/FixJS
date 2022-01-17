function (path, params) {
    var ROOT = '';
    switch(path) {
      case 'user':
        ROOT = USER_STREAM;
        break;
      case 'site':
        ROOT = SITE_STREAM;
        break;
      default:
        ROOT = PUB_STREAM;
        break;
    }
    return this.request('POST', ROOT + path, params, true);
  }