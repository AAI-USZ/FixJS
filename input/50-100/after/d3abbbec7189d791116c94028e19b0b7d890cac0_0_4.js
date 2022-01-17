function() {
    var removed = otherRemoved = null;
    col.bind('remove', function(model){ removed = model.get('label'); });
    otherCol.bind('remove', function(){ otherRemoved = true; });
    col.remove(e);
    equal(removed, 'e');
    equal(col.length, 4);
    equal(col.first(), d);
    equal(otherRemoved, null);
  }