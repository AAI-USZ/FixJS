function() {
    store = DS.Store.create({
      adapter: 'DS.fixtureAdapter'
    });

    Person = DS.Model.extend({
      firstName: DS.attr('string'),
      lastName: DS.attr('string'),

      height: DS.attr('number')
    });
  }