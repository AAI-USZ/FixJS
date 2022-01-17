function(a, newState) {
          equal(a.previous('state'), undefined);
          equal(newState, 'hello');
        }