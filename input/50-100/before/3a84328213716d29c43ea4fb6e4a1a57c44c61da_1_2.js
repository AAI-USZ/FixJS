function(messages) {

    var errors = this.getCompileMessages(JSON.parse(messages));

    window.aceEditor.getSession().clearAnnotations();

    window.aceEditor.getSession().setAnnotations(errors);    

  }