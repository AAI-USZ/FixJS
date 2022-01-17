function() {

  View.getMain().push('settings', new View.Object({
    title: 'About',
    content: UI.render('about', {
      version: Auphonic.Version,
      repository: Auphonic.RepositoryURL
    })
  }));

}