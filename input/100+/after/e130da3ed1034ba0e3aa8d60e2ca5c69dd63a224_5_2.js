function () {
    var args = Array.prototype.slice.apply(arguments)
    , dt = null
    , tz = null
    , mode = null
    , arr = [];


    //We support several different constructors, including all the ones from `Date` object
    // with a timezone string at the end.
    //
    //- `[tz]`: Returns object with time in `tz` specified.
    //
    // - `utcMillis`, `[tz]`: Return object with UTC time = `utcMillis`, in `tz`.
    //
    // - `Date`, `[tz]`: Returns object with UTC time = `Date.getTime()`, in `tz`.
    //
    // - `year, month, [date,] [hours,] [minutes,] [seconds,] [millis,] [tz]: Same as `Date` object
    // with tz.
    //
    // - `Array`: Can be any combo of the above.
    //
    //If 1st argument is an array, we can use it as a list of arguments itself
    if (Object.prototype.toString.call(args[0]) === '[object Array]') {
      args = args[0];
    }

    if (typeof args[args.length - 1] === 'string' && /^[a-zA-Z]+\//.test(args[args.length - 1])) {
      tz = args.pop();
    }

    this._extractTimeArray = function () {
      return [this.year, this.month, this.date, this.hours, this.minutes, this.seconds, this.milliseconds, this.timezone];
    };
    this._useCache = false;
    this._tzInfo = {};
    this._day = 0;
    this.year = 0;
    this.month = 0;
    this.date = 0;
    this.hours= 0;
    this.minutes = 0;
    this.seconds = 0;
    this.milliseconds = 0;

    if (args.length == 0) {
      mode = "copy_instant";
      dt = new Date();

    } else if (args.length == 1) {
      if ((typeof args[0]) == "number") {
        // UTC milliseconds
        mode = "copy_instant";
        dt = new Date(args[0]);

      } else if (_isISOString(args[0])) {
        // If the offset is ommitted from an ISO8601/RFC3339 string, it is taken to be UTC.
        mode = "copy_instant";

        if (_use_ISO_parser) {
          dt = timezoneJS.parseISO(args[0]);
        } else {
          dt = new Date(args[0]);
        }

      } else if ((typeof args[0]) == "string") {
        // Could be an RFC2822 string with offset, which therefore represents an instant in time, or
        // alternatively might be some abomination based on a bits of RFC2822 with parts missing, etc.
        // Have to guess:

        // remove comments and excess whitespace
        var cleaned = args[0].replace(/\([^\(\)\/]+\)/g, '').replace(/\s+/g, ' ').replace(/^ /g, '').replace(/ $/, '');

        // if "GMT" "EST" etc. present, must be an offset.
        // If +DDDD -DDDD +DD:DD -DD:DD it could only possibly belong to an offset
        if (/(GMT|UT(|C)|([ECMP][DS]T)|(GMT|)[\+\-]\d\d(:|)\d\d)/.test(cleaned)) {
          mode = "copy_instant";
        } else {
          mode = "interpret_in_tz";
        }

        dt = new Date(args[0]);

      } else if ((typeof args[0]) == "object" && (typeof args[0].getTime == "function")) {
        // Another Date/timezoneJS.Date object.
        mode = "copy_instant";
        dt = new Date(args[0].getTime());

      } else {
        throw "don't understand first argument";
      }
    } else {
      // years, months, [days, [hours, etc. ]
      mode = "interpret_in_tz";

      // Intepret the given year, month, .. etc in the stated timezone (or default, if null)
      for (var i = 0; i < 7; i++) {
        arr[i] = args[i] || 0;
      }
      dt = new Date(arr[0], arr[1], arr[2], arr[3], arr[4], arr[5], arr[6]);
    }

    if (dt === null || isNaN(dt.getTime()))
      throw "failed to create Date object from arguments (Invalid Date)";

    if (mode == "copy_instant") {
      // Copy the instant in time from now, or another Date object.
      this.timezone = "Etc/UTC";
      this.utc = true;
      this.setFromDateObjProxy(dt, true);

      // And then change into the requested timezone.
      this.setTimezone(tz);
    } else {
      this.timezone = tz || null;
      this.utc = tz === 'Etc/UTC' || tz === 'Etc/GMT';
      this.setFromDateObjProxy(dt, false);
    }
  }