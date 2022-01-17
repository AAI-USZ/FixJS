function() {
      c = C();

      c.set('open', true);
      expect(dojo.hasClass(c.domNode, 'open')).toBeTruthy();

      c.set('open', false);
      expect(dojo.hasClass(c.domNode, 'open')).toBeFalsy();
    }