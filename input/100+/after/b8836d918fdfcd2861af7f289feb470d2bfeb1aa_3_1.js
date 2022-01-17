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

    test('success and error handlers are called', 2, function () {
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

    test('then and always handlers can be added after a response has been received', 2, function () {
      var a = ajax({
        url: '/tests/fixtures/fixtures.json',
        type: 'json'
      })
        .always(function () {
          setTimeout(function () {
            a
              .then(function () {
                ok(true, 'success callback called')
              }, function () {
                ok(false, 'error callback called')
              })
              .always(function () {
                ok(true, 'complete callback called')
              })
          }, 1)
        })
    })
  }