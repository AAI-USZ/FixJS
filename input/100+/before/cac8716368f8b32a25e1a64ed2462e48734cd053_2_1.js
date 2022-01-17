function (module, action, $el, params) {
      var self = this;
      
      _.extend(this, Backbone.Events);
      
      this.$el = $el || this.$el;
      this.el = this.$el[0];
      this.module = module || this.module;
      this.action = action || this.action;
      this.i18n = [module, action];
      this.rendered = false;
      this.params = Array.isArray(params) ? params : [];
      
      _.bindAll(this);
      
      if ( ! this.checkAllowed.call(this)) {
        return false;
      }
      
      if (this.reload_on_login) {
        app.once('login', function () {
          if (self.reload_on_login && self.$el.parent().length !== 0 && 
          (app.current.view === self || self.$el.hasClass('main_content'))) {
            self.render();
          }
        });
      }
      
      this.addLocals({
        _t: this._t,
        _view: this
      });
      
      if (this.model) {
        if ( ! this.model.get || typeof(this.model.get) !== 'function') {
          this.model = new this.model();
          this.model_generated = true;
        }
        this.addLocals({_model: this.model});
        this.model.view = this;
      }
      
      if (this.init && typeof(this.init) === 'function') {
        this.init();
      }
      
      if ( this.requires_login && ! app.user_self.get('name')) {
        app.template('page', 'need_login_error', this.locals, function (html) {
          self.$el.html(html);
          self.trigger('rendered');
        });
        return false;
      }
      
      if (this.auto_render) {
        if (this.wait_for_user_loaded && ! app.user_self.loaded) {
          app.once('user_loaded', function () {
            self.render();
          });
        } else {
          this.render();
        }
      }
      
      this._gc_interval = setInterval(function () {
        self._check_gc();
      }, 250);
      
      this._expiration = +new Date() + this.max_age;
      return true;
    }