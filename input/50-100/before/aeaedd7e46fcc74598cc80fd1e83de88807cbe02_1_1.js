function () {
      switch (this.model.get('state')) {
      case 'folder':
        break;
      case 'config':
        this.toggleModal(true);
        break;
      }

    }