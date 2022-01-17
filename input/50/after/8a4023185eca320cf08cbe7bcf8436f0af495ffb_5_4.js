function() {
    controller.adminPath = '/admin';
    controller.addLocation('/admin/api');
    deepEqual(controller.locations, []);
    ok(utils.startsWith(mock_ui.lastError,
                        'Adding sublocations to admin is not supported'))
    mock_stub.verify();
  }