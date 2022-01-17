function() {
      Utils.debug("USERPREFERENCE render: " + this.el);
      if (this.model != undefined) {
        // Display the UserPreferenceEditView
        this.setElement($("#user-preferences-modal"));
        $(this.el).html(this.template(this.model.toJSON()));
        this.$el.find(".num_datum_dropdown").val(this.model.get("numVisibleDatum"));
        
        
        if(this.model.get("alwaysRandomizeSkin")){
          $(".randomize-backgound").addClass("btn-success");
        }else{
          $(".randomize-backgound").removeClass("btn-success");
        }
        
        if(this.model.get("transparentDashboard")){
          $(".transparent-dashboard").addClass("btn-success");
        }else{
          $(".transparent-dashboard").removeClass("btn-success");
        }
        
        if (this.model.get("skin") == "") {
          this.randomSkin();
        }else{
          this.renderSkin();
        }
        if(this.model.get("transparentDashboard")){
          this.makeDashboardTransparent();
        }else{
          this.makeDashboardOpaque();
        }
      }
      
      return this;
    }