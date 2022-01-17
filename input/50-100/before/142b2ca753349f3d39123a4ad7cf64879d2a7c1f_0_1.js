function() {
  var view = pane.view('with value');

  // test changing value updates like it should
  SC.RunLoop.begin();
  view.set('value', null);
  SC.RunLoop.end();
  equals(view.get('fieldValue'), '', 'should have empty fieldValue');
  pane.verifyEmpty(view, 'Full Name');
}