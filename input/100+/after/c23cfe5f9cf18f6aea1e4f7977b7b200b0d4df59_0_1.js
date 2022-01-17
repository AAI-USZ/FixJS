function(req, res) {
      renderCachableView(req, res, 'i18n_fallback_test.ejs', { layout: false, title: 'l10n testing title' });
    }