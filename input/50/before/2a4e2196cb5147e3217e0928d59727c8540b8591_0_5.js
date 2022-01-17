function() {
        this.presenter = WidgetPresenter.create(this.model, this.el);
        return this.presenter.draw();
      }