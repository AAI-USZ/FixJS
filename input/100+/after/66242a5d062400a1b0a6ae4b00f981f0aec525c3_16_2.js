function() {
    subject._cached[1] = { preset: 'A' };

    assert.isTrue(subject.presetActive('A'));
    assert.isFalse(subject.presetActive('B'));
  }