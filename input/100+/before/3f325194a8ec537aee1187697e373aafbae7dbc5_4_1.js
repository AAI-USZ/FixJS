function() {
      toura.features.siblingNav = true;
      ui = createUI();
      ui.set('siblingNavVisible', false);
      expect(ui.siblingNav.hasClass('hidden')).toBeTruthy();
      expect(mulberry.app.UI.currentPage.hasClass('sibling-nav-visible')).toBeFalsy();

      ui.siblingNav.show();
      expect(ui.siblingNav.hasClass('hidden')).toBeFalsy();
      expect(mulberry.app.UI.currentPage.hasClass('sibling-nav-visible')).toBeTruthy();
    }