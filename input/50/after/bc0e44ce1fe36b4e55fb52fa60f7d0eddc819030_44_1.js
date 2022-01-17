function onError() {
        saveButton.removeAttribute('disabled');
        console.error('Error reloading contact');
        if (ActivityHandler.currentlyHandling) {
          ActivityHandler.postCancel();
        }
      }