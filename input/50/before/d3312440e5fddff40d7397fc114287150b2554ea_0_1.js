function() {
        this.addRegions({
          navigation: ".navigation",
          body: ".body"
        });
        return this.navigation.show(this.navBar);
      }