function () {

  var locations = [
    {name: "Laundry Locker", lat: "37.770888", lon: "-122.422287", category:"laundry"},
    {name: "Jack's Laundry", lat: "37.765973", lon: "-122.433382", category:"laundry"},
    {name: "Guerrero Laundry", lat: "37.763255", lon: "-122.424031", category:"laundry"},
    {lat: "37.765871", lon: "-122.410711", "name": "Mikado Sushi", category:"sushi"},
    {lat: "37.771403", lon: "-122.423814", "name": "Sushi Zone", category:"sushi"},
    {lat: "37.764596", lon: "-122.431069", "name": "Daimaru Sushi", category:"sushi"},
    {lat: "37.768387", lon: "-122.420081", name: "Arco", category: "gas"},
    {lat: "37.764742", lon: "-122.424134", name: "Guerrero", category: "gas"},
    {lat: "37.781739", lon: "-122.451458", name: "Shell", category: "gas"}
  ];

  var categories = ['sushi', 'laundry', 'gas'];

  test('functional', function () {
    var model = {
      locations:[{name: "start", lat: "37.771403", lon: "-122.423814", category: false}],
      distance: 0,
      categories: {}
    };
    var res = nnn.solve(model, locations, categories);

    assert(res instanceof Array);

    var last = 0;
    res.forEach(function (item) {
      assert(item.distance >= last);
      last = item.distance;
    });

    console.log(JSON.stringify(res, false, 2));
  });
}