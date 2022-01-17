function() {
    var removed = otherRemoved = null;
    col.bind('remove', function(model){ removed = model.get('label'); });
    otherCol.bind('remove', function(){ otherRemoved = true; });
    col.remove(e);
    equals(removed, 'e');
    equals(col.length, 4);
    equals(col.first(), d);
    equals(otherRemoved, null);
  }