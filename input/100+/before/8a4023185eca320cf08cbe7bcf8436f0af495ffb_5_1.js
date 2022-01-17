function() {
  'use strict';

  var mock_stub, controller;

  function MockStub() {
    var expectedCalls = [];

    this.ajax = function(method, resource, params, successCallback) {
      var expectedCall;
      if (expectedCalls.length === 0) {
        ok(false, 'Unexpected ajax call ' + method + ' ' + resource);
      } else {
        expectedCall = expectedCalls.shift();
        deepEqual(method, expectedCall.method, 'HTTP method' );
        deepEqual(resource, expectedCall.resource, 'HTTP resource');
        deepEqual(params, expectedCall.params, 'HTTP method params');
        successCallback(expectedCall.result);
      }
    };

    this.expectAjaxCall = function(
      methodArg, resourceArg, paramsArg, resultArg) {
      expectedCalls.push({
        method: methodArg,
        resource: resourceArg,
        params: paramsArg,
        result: resultArg
      });
    };

    this.verify = function() {
      ok(expectedCalls.length === 0, 'All expected ajax calls invoked.');
    };

    this.setErrorHandler = function() {}
  }

  function MockUI(controller) {
    this.lastError = null,

    this.refresh = function() {};
    this.handleError = function(message, status) {
      this.lastError = message;
    }
  }

  QUnit.testStart = function() {
    mock_stub = new MockStub();
    controller = new Controller(new MockUI(), mock_stub);
  };

  module('Utility functions');

  test('assert', function() {
    utils.assert(true, "Should not throw.");
    raises(function() {
      utils.assert(false, "Should throw.");
    });
  });

  test('each', function() {
    var sum = 0;
    utils.each([1, 1, 2, 3, 5], function(x) {
      sum += x;
    });
    deepEqual(sum, 12);
    utils.each([], function(x) {
      ok(false);
    });
  });

  test('findOnly', function() {
    deepEqual(utils.findOnly([[1, 2], [2, 3], [4, 5], [5, 6]],
                             function(x) {
                               return x[0] === 4;
                             }), [4, 5]);

    deepEqual(utils.findOnly([1, 2, 3, 4, 5],
                             function(x) {
                               return x === 6;
                             }), null);
    raises(function() {
      utils.findOnly([1, 2, 3, 1],
                     function(x) {
                       return x === 1;
                     });
    });
  });

  test('inArray', function() {
    ok(utils.inArray(2, [1, 2, 3]));
    ok(utils.inArray('a', ['a', 'b', 'c']));
    ok(utils.inArray('foo', ['bar', 'baz', 'foo']));
    ok(utils.inArray('foo', ['foo', 'foo', 'foo']));
    ok(utils.inArray(true, [true]));

    ok(!utils.inArray('foo', []));
    ok(!utils.inArray('foo', ['fooz']));
    ok(!utils.inArray(1, [[1], 2, 3]));
  });

  test('removeFromArray', function() {
    var array = ['aa', 'bb', 'cc'];
    utils.removeFromArray('bb', array);
    deepEqual(array, ['aa', 'cc']);
    utils.removeFromArray('cc', array);
    deepEqual(array, ['aa']);
    utils.removeFromArray('a', array);
    deepEqual(array, ['aa']);
    utils.removeFromArray('aa', array);
    deepEqual(array, []);
    utils.removeFromArray(null, array);
    deepEqual(array, []);
  });

  test('sort', function() {
    var array = ['b', 'aa', 'a', 'z'];
    deepEqual(utils.sort(array), ['a', 'aa', 'b', 'z']);
    // Sort should not modify the input array.
    deepEqual(array, ['b', 'aa', 'a', 'z']);
    deepEqual(utils.sort([]), []);
  });

  test('sortByProperty', function() {
    var array = [{f1: 'a', f2: 'b'},
                 {f1: 'b', f2: 'aa'},
                 {f1: 'c', f2: 'a'},
                 {f1: 'd', f2: 'z'}];
    deepEqual(utils.sortByProperty(array, 'f2'),
             [{f1: 'c', f2: 'a'},
              {f1: 'b', f2: 'aa'},
              {f1: 'a', f2: 'b'},
              {f1: 'd', f2: 'z'}]);
    deepEqual(utils.sortByProperty(array, 'f1'), array);
  });

  test('startsWith', function() {
    ok(utils.startsWith('foobar', 'foo'));
    ok(utils.startsWith('foo', 'foo'));
    ok(utils.startsWith('', ''));
    ok(!utils.startsWith('foo', 'foobar'));
    ok(!utils.startsWith('barfoo', 'foo'));
  });

  test('urn2uuid', function() {
    deepEqual(
      utils.urn2uuid('urn:uuid:41be0192-0fcc-4a9c-935d-69243b75533c'),
      '41be0192-0fcc-4a9c-935d-69243b75533c');
  });

  test('extractLocationsPaths', function() {
    var result = utils.extractLocationsPaths([
      {
        id: '12',
        path: '/foo'
      },
      {
        id: '13',
        path: '/foo/bar'
      },
      {
        path: '/baz',
        id: 14
      }
    ]);
    deepEqual(result, ['/foo', '/foo/bar', '/baz']);
  });

  test('allowedUsersIds', function() {
    deepEqual(utils.allowedUsersIds(
      {
        id: '12',
        path: '/foo',
        allowedUsers: [
          {
            email: 'foo@example.com',
            id: 'userA'
          },
          {
            email: 'bar@example.com',
            id: 'userB'
          }
        ]
      }), ['userA', 'userB']);

    deepEqual(utils.allowedUsersIds(
      {
        id: '12',
        path: '/foo',
        allowedUsers: []
      }), []);
  });

  test('stripTrailingIndexHtmlAndSlash', function() {
    deepEqual(utils.stripTrailingIndexHtmlAndSlash('/foo/index.html'), '/foo');
    deepEqual(utils.stripTrailingIndexHtmlAndSlash('/index.html/bar'),
              '/index.html/bar');
    deepEqual(utils.stripTrailingIndexHtmlAndSlash('/foo/'), '/foo');
    deepEqual(utils.stripTrailingIndexHtmlAndSlash('/foo'), '/foo');
    deepEqual(utils.stripTrailingIndexHtmlAndSlash('/foo/bar'), '/foo/bar');
  });

  module('Controller');

  test('canAccess', function() {
    ok(controller.canAccess(
      {
        id: 'userA',
        email: 'foo@example.com'
      },
      {
        id: '12',
        path: '/foo',
        allowedUsers: [
          {
            email: 'foo@example.com',
            id: 'userA'
          },
          {
            email: 'bar@example.com',
            id: 'userB'
          }
        ]
      }));

    ok(!controller.canAccess(
      {
        id: 'userC',
        email: 'foo@example.com'
      },
      {
        id: '12',
        path: '/foo',
        allowedUsers: [
          {
            email: 'foo@example.com',
            id: 'userA'
          },
          {
            email: 'bar@example.com',
            id: 'userB'
          }
        ]
      }));
  });

  test('removeAllowedUser', function() {
    var location, userA, userB;
    userA = {
      email: 'foo@example.com',
      id: 'userA'
    };
    userB = {
      email: 'bar@example.com',
      id: 'userB'
    };
    location = {
      id: '12',
      path: '/foo',
      allowedUsers: [
        userA,
        userB
      ]
    };
    ok(controller.canAccess(userA, location));
    ok(controller.canAccess(userB, location));
    controller.removeAllowedUser(userB, location);
    ok(controller.canAccess(userA, location));
    ok(!controller.canAccess(userB, location));
  });

  test('findUserWithEmail', function() {
    var userA, userB;
    userA = {
      email: 'foo@example.com',
      id: 'userA'
    };
    userB = {
      email: 'bar@example.com',
      id: 'userB'
    };
    controller.users.push(userA);
    controller.users.push(userB);
    deepEqual(controller.findUserWithEmail('bar@example.com'), userB);
    deepEqual(controller.findUserWithEmail('baz@example.com'), null);
  });

  test('findLocationWithId', function() {
    var locationA, locationB;
    locationA = {
      path: '/foo',
      id: 'locationA'
    };
    locationB = {
      path: '/foo/bar',
      id: 'locationB'
    };
    controller.locations.push(locationA);
    controller.locations.push(locationB);
    deepEqual(controller.findLocationWithId('locationB'), locationB);
    deepEqual(controller.findLocationWithId('locationC'), null);
  });

  test('accessibleLocations', function() {
    var locationA, locationB, userA, userB, userC;
    userA = {
      email: 'foo@example.com',
      id: 'userA'
    };
    userB = {
      email: 'bar@example.com',
      id: 'userB'
    };
    userC = {
      email: 'baz@example.com',
      id: 'userC'
    };
    controller.users = [userA, userB, userC];

    locationA = {
      id: '12',
      path: '/foo',
      allowedUsers: [
        userA,
        userB
      ]
    };
    locationB = {
      id: '13',
      path: '/foo/bar',
      allowedUsers: [
        userB
      ]
    };
    controller.locations = [locationA, locationB];

    deepEqual(controller.accessibleLocations(userA), [locationA]);
    deepEqual(controller.accessibleLocations(userB), [locationA, locationB]);
    deepEqual(controller.accessibleLocations(userC), []);
  });

  test('buildCallbacksChain', function() {
    var callbackA, callbackB, callbackC, cnt;
    cnt = 0;
    callbackA = function(nextCallback) {
      deepEqual(cnt, 0);
      cnt += 1;
      nextCallback();
    };
    callbackB = function(nextCallback) {
      deepEqual(cnt, 1);
      cnt += 1;
      nextCallback();
    };
    callbackC = function() {
      deepEqual(cnt, 2);
      cnt += 1;
    };
    controller.buildCallbacksChain([callbackA, callbackB, callbackC])();
    deepEqual(cnt, 3);
  });

  module('Controller Ajax calls');

  test('getLocations', function() {
    var ajaxCallResult, callbackCalled;
    ajaxCallResult = {
      locations: [
        {
          path: '/foo',
          id: '1'
        },
        {
          path: '/bar',
          id: '2'
        }
      ]
    };
    mock_stub.expectAjaxCall('GET', 'api/locations/', null, ajaxCallResult);
    callbackCalled = false;
    controller.getLocations(function() {
      callbackCalled = true;
    });
    deepEqual(controller.locations, ajaxCallResult.locations);
    ok(callbackCalled);
    mock_stub.verify();
  });

  test('addLocation', function() {
    deepEqual(controller.locations, []);
    var newLocation = {id: '13', path: '/foo', allowedUsers: []};
    mock_stub.expectAjaxCall('POST', 'api/locations/', {path: '/foo'},
                             newLocation);
    controller.addLocation('/foo');
    deepEqual(controller.locations, [newLocation]);
    mock_stub.verify();
  });

  test('addLocation refuses to add sublocations to admin', function() {
    controller.adminPath = '/admin';
    controller.addLocation('/admin/api');
    deepEqual(controller.locations, []);
    ok(utils.startsWith(controller.errorHandler.lastError,
                        'Adding sublocations to admin is not supported'))
    mock_stub.verify();
  });

  test('removeLocation', function() {
    controller.locations = [{
      id: '13',
      path: '/foo',
      self: 'example.com/locations/13/',
      allowedUsers: []
    }];
    mock_stub.expectAjaxCall(
      'DELETE', controller.locations[0].self, null, null);
    controller.removeLocation(controller.locations[0]);
    deepEqual(controller.locations, []);
    mock_stub.verify();
  });

  test('getUsers', function() {
    var ajaxCallResult, callbackCalled;
    ajaxCallResult = {
      users: [
        {
          email: 'foo@example.com',
          id: '1'
        },
        {
          email: 'bar@example.com',
          id: '2'
        }
      ]
    };
    callbackCalled = false;
    mock_stub.expectAjaxCall('GET', 'api/users/', null, ajaxCallResult);
    controller.getUsers(function() {
      callbackCalled = true;
    });
    deepEqual(controller.users, ajaxCallResult.users);
    ok(callbackCalled);
    mock_stub.verify();
  });

  test('addUser', function() {
    var nextCallbackInvoked, newUser;
    deepEqual(controller.users, []);
    nextCallbackInvoked = false;
    newUser = {id: '13', email: 'foo@example.com'};
    mock_stub.expectAjaxCall('POST', 'api/users/', {email: 'foo@example.com'},
                             newUser);
    controller.addUser('foo@example.com',
                      function(userArg) {
                        nextCallbackInvoked = true;
                        deepEqual(userArg, newUser);
                      });
    ok(nextCallbackInvoked);
    deepEqual(controller.users, [newUser]);
    mock_stub.verify();
  });

  test('removeUser', function() {
    controller.users = [{
      id: '13',
      email: 'foo@example.com',
      self: 'example.com/users/13/'
    }];
    mock_stub.expectAjaxCall('DELETE', controller.users[0].self, null, null);
    controller.removeUser(controller.users[0]);
    deepEqual(controller.users, []);
    mock_stub.verify();
  });

  test('removeUser removes from location.allowedUsers list.', function() {
    var location, user;
    user = {
      id: '13',
      email: 'foo@example.com',
      self: 'example.com/users/13/'
    };
    location = {
      id: '17',
      path: '/bar',
      self: 'example.com/locations/13/',
      allowedUsers: [user]
    };
    controller.users.push(user);
    controller.locations.push(location);
    mock_stub.expectAjaxCall('DELETE', controller.users[0].self, null, null);

    ok(controller.canAccess(user, location));
    controller.removeUser(controller.users[0]);
    ok(!controller.canAccess(user, location));

    deepEqual(location.allowedUsers, []);
    mock_stub.verify();
  });

  test('grantAccess when user exists', function() {
    var location, user;
    user = {
      id: '17',
      email: 'foo@example.com',
      self: 'example.com/users/17/'
    };
    location = {
      id: '13',
      path: '/bar',
      self: 'example.com/locations/13/',
      allowedUsers: []
    };
    controller.users.push(user);
    controller.locations.push(location);
    mock_stub.expectAjaxCall(
      'PUT', location.self + 'allowed-users/17/', null, user);

    ok(!controller.canAccess(user, location));
    controller.grantAccess(user.email, location);
    ok(controller.canAccess(user, location));

    deepEqual(controller.locations[0].allowedUsers, [user]);
    mock_stub.verify();
  });

  test('grantAccess when user does not exist', function() {
    var location, user;
    user = {
      id: '17',
      email: 'foo@example.com',
      self: 'example.com/users/17/'
    };
    location = {
      id: '13',
      path: '/bar',
      self: 'example.com/locations/13/',
      allowedUsers: []
    };
    controller.locations.push(location);
    // User should first be added.
    mock_stub.expectAjaxCall(
      'POST', 'api/users/', {email: 'foo@example.com'}, user);
    mock_stub.expectAjaxCall(
      'PUT', location.self + 'allowed-users/17/', null, user);

    ok(!controller.canAccess(user, location));
    controller.grantAccess(user.email, location);
    ok(controller.canAccess(user, location));

    deepEqual(controller.locations[0].allowedUsers, [user]);
    deepEqual(controller.users, [user]);
    mock_stub.verify();
  });

  test('grantAccess when user already can access location', function() {
    var location, user;
    user = {
      id: '17',
      email: 'foo@example.com',
      self: 'example.com/users/17/'
    };
    location = {
      id: '13',
      path: '/bar',
      self: 'example.com/locations/13/',
      allowedUsers: [user]
    };
    controller.users.push(user);
    controller.locations.push(location);

    ok(controller.canAccess(user, location));
    controller.grantAccess(user.email, location);
    ok(controller.canAccess(user, location));

    mock_stub.verify();
  });

  test('revokeAccess', function() {
    var location, user;
    user = {
      id: '17',
      email: 'foo@example.com',
      self: 'example.com/users/17/'
    };
    location = {
      id: '13',
      path: '/bar',
      self: 'example.com/locations/13/',
      allowedUsers: [user]
    };
    controller.users.push(user);
    controller.locations.push(location);

    mock_stub.expectAjaxCall(
      'DELETE', location.self + 'allowed-users/17/', null, null);

    ok(controller.canAccess(user, location));
    controller.revokeAccess(user, location);
    ok(!controller.canAccess(user, location));

    deepEqual(controller.locations[0].allowedUsers, []);
    mock_stub.verify();
  });

  test('grantOpenAccess.', function() {
    var location;
    location = {
      id: '13',
      openAccess: false,
      path: '/bar',
      self: 'example.com/locations/13/',
      allowedUsers: []
    };
    controller.locations.push(location);
    mock_stub.expectAjaxCall(
      'PUT', location.self + 'open-access/', null, null);

    controller.grantOpenAccess(location);
    ok(location.openAccess);
    mock_stub.verify();
  });

  test('canAccess for open location.', function() {
    var location, user;
    user = {
      id: '17',
      email: 'foo@example.com',
      self: 'example.com/users/17/'
    };
    location = {
      id: '13',
      openAccess: false,
      path: '/bar',
      self: 'example.com/locations/13/',
      allowedUsers: []
    };
    controller.users.push(user);
    controller.locations.push(location);

    mock_stub.expectAjaxCall(
      'PUT', location.self + 'open-access/', null, null);

    ok(!controller.canAccess(user, location));
    controller.grantOpenAccess(location);
    ok(controller.canAccess(user, location));
    mock_stub.verify();
  });

  test('revokeOpenAccess.', function() {
    var location;
    location = {
      id: '13',
      openAccess: true,
      path: '/bar',
      self: 'example.com/locations/13/',
      allowedUsers: []
    };
    controller.locations.push(location);
    mock_stub.expectAjaxCall(
      'DELETE', location.self + 'open-access/', null, null);

    controller.revokeOpenAccess(location);
    ok(!location.openAccess);
    mock_stub.verify();
  });

  test('getAdminUser', function() {
    var ajaxCallResult, callbackCalled;
    ajaxCallResult = {
      email: 'foo@example.com'
    };
    callbackCalled = false;
    ok(controller.adminUserEmail === null);
    mock_stub.expectAjaxCall('GET', '/auth/api/whoami/', null, ajaxCallResult);
    controller.getAdminUser(function() {
      callbackCalled = true;
    });
    deepEqual(controller.adminUserEmail, ajaxCallResult.email);
    ok(callbackCalled);
    mock_stub.verify();
  });

}