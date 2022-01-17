function () {
    editor.emit('foo');
    expect(hasBeenFired).to(beTrue);
  }