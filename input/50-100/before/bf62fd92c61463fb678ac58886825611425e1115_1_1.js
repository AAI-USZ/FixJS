function (data) {

    sp.write('G90\n');

    sp.write([
      'G1',
      'X' + data.x,
      'Y' + data.y,
      'F800'
    ].join(' ') + '\n');

    sp.write([
      'G1',
      'Z' + data.z,
      'F400'
    ].join(' ') + '\n');
  }