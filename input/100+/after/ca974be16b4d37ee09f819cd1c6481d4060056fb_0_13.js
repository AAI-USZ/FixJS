function buildDateInputFormats() {
    var time = prepareTime(OptionalTime), month = '\\d{1,2}|' + English['months'].join('|'), formats;
    formats = [
      // @date_format 2010
      { src: '(\\d{4})', to: ['year'] },
      // @date_format 2010-05
      // @date_format 2010.05
      // @date_format 2010/05
      // @date_format 2010-05-25 (ISO8601)
      // @date_format 2010-05-25T12:30:40.299Z (ISO8601)
      // @date_format 2010-05-25T12:30:40.299+01:00 (ISO8601)
      // @date_format 2010.05.25
      // @date_format 2010/05/25
      { src: '([+-])?(\\d{4})[-.]?('+ month +')[-.]?(\\d{1,2})?' + time, to: ['year_sign','year','month','date'].concat(TimeFormat) },
      // @date_format 05-25
      // @date_format 05/25
      // @date_format 05.25
      // @date_format 05-25-2010
      // @date_format 05/25/2010
      // @date_format 05.25.2010
      { src: '('+ month +')[-.\\/]('+ month +')[-.\\/]?(\\d{2,4})?' + time, to: ['date','month','year'].concat(TimeFormat), variant: true },
      // @date_format Date(628318530718)
      { src: '\\/Date\\((\\d+(?:\\+\\d{4})?)\\)\\/', to: ['timestamp'] }
    ];
    DateArgumentUnits = DateUnits.clone().removeAt(2);
    DateUnitsReversed = DateUnits.clone().reverse();
    formats.each(function(f) {
      addDateInputFormat(f.src, f.to, English, f.variant);
    });
    addDateInputFormat(prepareTime(RequiredTime), TimeFormat, English);
  }