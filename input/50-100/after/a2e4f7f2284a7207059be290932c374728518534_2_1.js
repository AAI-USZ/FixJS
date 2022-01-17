function() {

  View.getMain().push('settings', new View.Object({
    title: 'Settings',
    content: UI.render('settings', {
      user: LocalStorage.get('User'),
      feedback: Auphonic.FeedbackURL
    })
  }));

}