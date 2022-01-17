function () {
      switch (this.model.get('state')) {
      case 'folder':
        this.configView.$el.hide();
        this.toggleModal(false);
        break;
      case 'config':
        this.configView.$el.show();
        this.toggleModal(true);
        break;
      }

    }