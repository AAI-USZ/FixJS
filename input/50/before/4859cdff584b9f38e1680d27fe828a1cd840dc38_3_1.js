function(partial, view) {
    if (view) {
      return this.setView(partial, view, true);
    }

    // Omitting a partial will place the View directly into the parent.
    return this.setView(partial, true);
  }