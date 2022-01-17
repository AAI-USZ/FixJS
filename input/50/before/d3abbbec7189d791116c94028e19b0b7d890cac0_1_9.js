function(a, newState) {
          equals(a.previous('state'), undefined);
          equals(newState, 'hello');
        }