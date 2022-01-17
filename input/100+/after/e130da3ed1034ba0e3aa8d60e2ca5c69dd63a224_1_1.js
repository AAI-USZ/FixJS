function (timezoneJS, options) {
    var opts = {
      async: false,
      loadingScheme: timezoneJS.timezone.loadingSchemes.LAZY_LOAD
    };
    // So that loadingScheme may be specified before timezoneJS is loaded.
    if (options && options._loadingScheme) {
      options.loadingScheme = timezoneJS.timezone.loadingSchemes[options._loadingScheme];
      delete options._loadingScheme;
    }
    for (var k in (options || {})) {
      opts[k] = options[k];
    }

    //Reset everything
    timezoneJS.timezone.zones = {};
    timezoneJS.timezone.rules = {};
    timezoneJS.timezone.loadedZones = {};

    //Set up again
    timezoneJS.timezone.zoneFileBasePath = 'lib/tz';
    if (fs !== null) {
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
    }
    timezoneJS.timezone.loadingScheme = opts.loadingScheme;
    timezoneJS.timezone.init(opts);
    return timezoneJS;
  }