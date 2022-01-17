function (resp) {
      var anns = resp.annotations;
      for (var i=0; i<anns.length; i++) {
        anns[i].fromServer = true;
        self.addAnnotation(anns[i]);
      }
      console.log('Received', anns.length, 'annotations from server');
    }