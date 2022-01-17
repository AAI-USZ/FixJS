function(dt, fmt) {
      var useT = dt.indexOf("T") != -1;
      //test if there is a T in the string so we can try to properly convert it
      var format = fmt ? fmt : useT ? this.ISO_8601 : this.DEFAULT_TIMESTAMP_FORMAT;
      var ret = date.parse(dt, format);
      //if the coversion failed try it with a time zone
      !ret && (ret = date.parse(dt, this.TIMESTAMP_FORMAT_TZ));
      if (!ret && this.convertTwoDigitYears) {
        //if we still fail and we need to convert two digit years try the twoYearFormat
        var twoYearFormat = fmt ? fmt : useT ? this.ISO_8601_TWO_YEAR : this.TIMESTAMP_TWO_YEAR_FORMAT;
        ret = date.parse(dt, twoYearFormat);
        //try with time zone
        !ret && (ret = date.parse(dt, twoYearFormat + "Z"));
      }
      if (!ret) {
        throw new PatioError("Unable to convert timestamp: " + dt);
      }
      return new SQL.TimeStamp(ret);
    }