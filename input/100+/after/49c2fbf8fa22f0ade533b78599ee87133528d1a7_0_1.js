function() {
  ok(item1.hasObserverFor('value'), 'Item1 should be observed');
  ok(item2.hasObserverFor('value'), 'Item2 should be observed');
  ok(item3.hasObserverFor('value'), 'Object2 should be observed');

  SC.RunLoop.begin();
  view.items.removeObject(item1);
  SC.RunLoop.end();

  ok(!item1.hasObserverFor('value'), 'Item1 should not be observed');
  ok(item2.hasObserverFor('value'), 'Item2 should be observed');
  ok(item3.hasObserverFor('value'), 'Item3 should be observed');

  SC.RunLoop.begin();
  view.items.removeObject(item3);
  SC.RunLoop.end();

  ok(!item1.hasObserverFor('value'), 'Item1 should not be observed');
  ok(item2.hasObserverFor('value'), 'Item2 should be observed');
  ok(!item3.hasObserverFor('value'), 'Item3 should not be observed');

}