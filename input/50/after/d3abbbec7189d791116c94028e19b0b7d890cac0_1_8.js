function(a, newState) {
          equal(a.previous('state'), undefined);
          equal(newState, 'hello');
          // Fire a nested change event.
          this.set({ other: "whatever" });
        }