function() {
    view.render();
    model.set({'fields': ['name1', 'name2']});
    expect($(view.$el.find('li')[0]).hasClass('enabled')).toEqual(true);
    model.bind('change:fields', function() {
      console.log(model.attributes.fields);
    });
    model.removeField('name1');
    expect(view.$el.find('li').length).toEqual(1);
  }