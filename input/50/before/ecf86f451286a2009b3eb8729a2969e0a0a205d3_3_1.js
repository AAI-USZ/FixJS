function() {
  View.getMain().push('record', new View.Object({
    title: 'Audio Recording',
    content: UI.render('record-audio')
  }));
}