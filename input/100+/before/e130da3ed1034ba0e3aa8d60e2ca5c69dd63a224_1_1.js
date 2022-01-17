function (timezoneJS, options) {
    var opts = {
      async: false,
      loadingScheme: timezoneJS.timezone.loadingSchemes.LAZY_LOAD
    };
    for (var k in (options || {})) {
      opts[k] = options[k];
    }
    //Reset everything
    timezoneJS.timezone.zones = {};
    timezoneJS.timezone.rules = {};
    timezoneJS.timezone.loadedZones = {};

    //Set up again
    timezoneJS.timezone.zoneFileBasePath = 'lib/tz';
    timezoneJS.timezone.transport = function (opts) {
      // No success handler, what's the point?
      if (opts.async) {
        if (typeof opts.success !== 'function') return;
        opts.error = opts.error || console.error;
        return fs.readFile(opts.url, 'utf8', function (err, data) {
          return err ? opts.error(err) : opts.success(data);
        });
      }
      return fs.readFileSync(opts.url, 'utf8');
    };
    timezoneJS.timezone.loadingScheme = opts.loadingScheme;
    timezoneJS.timezone.init(opts);
    return timezoneJS;
  }