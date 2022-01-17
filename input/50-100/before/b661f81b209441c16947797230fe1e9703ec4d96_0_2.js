function Config(the) {
      this.the = the;
      this.app_name = "app";
      this.animate_at_startup = app.config.animate_at_startup || false;
      this.enable_auto_transitions = app.enable_auto_transitions || true;
      this.no_push_state = typeof history.pushState === !'function';
      this.no_push_state || (this.no_push_state = /(\?|\&)(crawler)/.test(window.location));
      this.disable_transitions = this.no_push_state;
    }