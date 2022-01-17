function() {
      c = C();

      c.open();
      expect(dojo.hasClass(c.domNode, 'open')).toBeTruthy();

      c.close();
      expect(dojo.hasClass(c.domNode, 'open')).toBeFalsy();
    }