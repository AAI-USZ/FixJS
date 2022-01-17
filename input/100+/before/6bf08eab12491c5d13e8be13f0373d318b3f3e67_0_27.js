function(manager, path) {
    if (get(this, 'isLeafRoute')) { return; }

    var childStates = get(this, 'childStates'), match;

    childStates = Ember.A(childStates.filterProperty('isRoutable'));

    childStates = childStates.sort(function(a, b) {
      var aDynamicSegments = getPath(a, 'routeMatcher.identifiers.length'),
          bDynamicSegments = getPath(b, 'routeMatcher.identifiers.length'),
          aRoute = get(a, 'route'),
          bRoute = get(b, 'route');

      if (aRoute.indexOf(bRoute) === 0) {
        return -1;
      } else if (bRoute.indexOf(aRoute) === 0) {
        return 1;
      }

      if (aDynamicSegments !== bDynamicSegments) {
        return aDynamicSegments - bDynamicSegments;
      }

      return getPath(b, 'route.length') - getPath(a, 'route.length');
    });

    var state = childStates.find(function(state) {
      var matcher = get(state, 'routeMatcher');
      if (match = matcher.match(path)) { return true; }
    });

    Ember.assert("Could not find state for path " + path, !!state);

    var object = state.deserialize(manager, match.hash);
    manager.transitionTo(get(state, 'path'), object);
    manager.send('routePath', match.remaining);
  }