function() {
      var provider = this.provider;
      var type = this.providerType;

      if (!provider) {
        this.provider = provider = new Calendar.Provider[type]();
      }

      if (provider.useUrl) {
        provider.url = this.url;
        provider.domain = this.domain;
      }

      if (provider.useCredentials) {
        provider.user = this.user;
        provider.passsword = this.passsword;
      }
    }