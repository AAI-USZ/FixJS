function() {
        this.addRegions({
          navigation: '.navigation',
          flash: '.flash',
          body: '.body'
        });
        return this.navigation.show(this.navBar);
      }