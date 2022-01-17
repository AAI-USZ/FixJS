function(){
    var names = [];
    if (BandNames.find().count() === 0) {
      names = [
        {text: 'DangleSkank',   author: 'Joel'},
        {text: 'WrathPony',     author: 'Joel'},
        {text: 'HMS Groovytron',author: 'Cody'},
        {text: 'wubwub',        author: 'Sol', times_suggested: 2}
      ];
    }
    for (var i = 0; i < names.length; i++){
      BandNames.insert(names[i],function(){
        console.log('added initial names array');
      });
    }
  }