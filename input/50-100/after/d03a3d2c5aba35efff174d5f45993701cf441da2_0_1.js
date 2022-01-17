function (data) {

    if (
      data[0] && // Data exists and
      (
        !_.isArray(data[0]) || // data not an array
        !data[0].length || // data is an empty series
        (data[0][0] && _.isArray(data[0][0])) // data is a series
      )
    )
      return data;
    else
      return [data];
  }