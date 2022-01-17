function() {
    if (Readings.initialized != null) return;
    Readings.config = new Readings.Config({
      wlurl: 'http://dev.wolnelektury.pl',
      initdburl: 'http://dev.wolnelektury.pl/media/api/mobile/initial/initial.sql',
      categories: {
        'author': 'autor',
        'epoch': 'epoka',
        'genre': 'gatunek',
        'kind': 'rodzaj'
      },
      show_filter: ['authors', 'themes'],
      show_dividers: ['authors', 'themes'],
      db_version: '1.0'
    });
    Readings.catalogue = new Readings.Catalogue().open();
    return Readings.initialized = true;
  }