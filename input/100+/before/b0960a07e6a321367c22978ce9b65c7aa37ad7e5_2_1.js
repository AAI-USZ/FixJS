function (date) {
  return [
        date.getUTCFullYear(),
        '-',
        leftPadTwo(date.getUTCMonth() + 1),
        '-',
        leftPadTwo(date.getUTCDate()),
        'T',
        leftPadTwo(date.getUTCHours()),
        ':',
        leftPadTwo(date.getUTCMinutes()),
        ':',
        leftPadTwo(date.getUTCSeconds()),
        '.',
        leftPadThree(date.getUTCMilliseconds()),
        'Z'
    ].join('');
}