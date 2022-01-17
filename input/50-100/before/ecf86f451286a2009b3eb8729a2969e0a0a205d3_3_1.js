function() {

  View.getMain().push('record', new View.Object({
    title: 'Recordings',
    content: UI.render('record', {
      recordings: LocalStorage.get('recordings')
    })
  }));

}