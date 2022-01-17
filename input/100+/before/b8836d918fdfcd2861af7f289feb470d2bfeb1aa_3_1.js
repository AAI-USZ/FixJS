function (test, ok) {

    test('always callback is called', function (complete) {
      ajax({
        url: '/tests/fixtures/fixtures.js'
      })
        .always(function () {
          ok(true, 'called complete')
          complete()
        })
    })

    test('success and error handlers are called', 2, function (complete) {
      ajax({
        url: '/tests/fixtures/invalidJSON.json',
        type: 'json'
      })
        .then(function (resp) {
          ok(false, 'success callback fired')
        }, function (resp, msg) {
          ok(msg == 'Could not parse JSON in response', 'error callback fired')
        })
      ajax({
        url: '/tests/fixtures/fixtures.json',
        type: 'json'
      })
        .then(function (resp) {
          ok(true, 'success callback fired')
        }, function (resp) {
          ok(false, 'error callback fired')
        })
    })
  }