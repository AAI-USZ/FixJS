function () {
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
    }