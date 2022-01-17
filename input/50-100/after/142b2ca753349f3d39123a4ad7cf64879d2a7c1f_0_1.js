function() {
  var view = pane.view('with value');

  // test changing value updates like it should
  SC.RunLoop.begin();
  view.set('value', null);
  SC.RunLoop.end();
  equals(view.get('value'), null, 'should have empty value');
  pane.verifyEmpty(view, 'Full Name');
}