function() {
  View.getMain().push('production', new View.Object({
    title: 'Audio Recording',
    content: UI.render('record-audio')
  }));
}