function () {
      if (this.options.vie) {
        this.vie = this.options.vie;
      } else {
        this.vie = new VIE();

        this.vie.use(new this.vie.RdfaService());

        if (this.options.stanbolUrl) {
          this.vie.use(new this.vie.StanbolService({
            proxyDisabled: true,
            url: this.options.stanbolUrl
          }));
        }

        if (this.options.dbPediaUrl) {
          this.vie.use(new this.vie.DBPediaService({
            proxyDisabled: true,
            url: this.options.dbPediaUrl
          }));
        }
      }
      this._checkSession();
      this._enableToolbar();
      this._saveButton();
      this._editButton();
      this._prepareStorage();

      if (this.element.midgardWorkflows) {
        this.element.midgardWorkflows(this.options.workflows);
      }

      if (this.element.midgardNotifications) {
        this.element.midgardNotifications(this.options.notifications);
      }
    }