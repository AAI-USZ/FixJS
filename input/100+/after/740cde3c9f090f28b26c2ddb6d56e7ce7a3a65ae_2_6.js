function() {
    set(this, 'buckets', {
      clean:    Ember.Map.create(),
      created:  Ember.Map.create(),
      updated:  Ember.Map.create(),
      deleted:  Ember.Map.create(),
      inflight: Ember.Map.create()
    });

    this.dirtyRelationships = {
      byChild: Ember.Map.create(),
      byNewParent: Ember.Map.create(),
      byOldParent: Ember.Map.create()
    };
  }