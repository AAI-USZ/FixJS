function () {
      template = $('#jenkins-builds-template');
      console.log(template);
      Updater.addListener("jenkins-builds", this.render);
    }