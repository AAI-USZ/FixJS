function () {
      template = $('#jenkins-builds-template');
      Updater.addListener("jenkins-builds", this.render);
    }