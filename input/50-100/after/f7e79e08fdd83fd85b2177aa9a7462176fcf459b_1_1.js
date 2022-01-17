function() {
  var csv = [
    ['Jones, Jay', 10],
    ['Xyz "ABC" O\'Brien', '11:35' ],
    ['Other, AN', '12:35' ]
  ];

  var array = recline.Backend.CSV.serializeCSV(csv);
  var exp = '"Jones, Jay",10\n' +
  '"Xyz \"ABC\" O\'Brien",11:35\n' +
  '"Other, AN",12:35\n';
  deepEqual(array, exp);
}