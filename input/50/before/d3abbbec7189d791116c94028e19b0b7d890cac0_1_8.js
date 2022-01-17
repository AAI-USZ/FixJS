function(a, newState) {
          equals(a.previous('state'), undefined);
          equals(newState, 'hello');
          // Fire a nested change event.
          this.set({ other: "whatever" });
        }