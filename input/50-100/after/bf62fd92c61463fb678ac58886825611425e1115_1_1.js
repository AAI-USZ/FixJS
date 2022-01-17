function (data) {
console.log(data);
    if (data.x > 370) {
      return;
    }

    sp.write('G90\n');

    sp.write([
      'G1',
      'X' + data.x,
      'F800'
    ].join(' ') + '\n');
  }