function() {
      Utils.debug("DATUM render: " + this.el);
      
      if (this.format == "well") {
        // Display the DatumEditView
        var jsonToRender = this.model.toJSON();
        jsonToRender.datumStates = this.model.get("datumStates").toJSON();
        $(this.el).html(this.template(jsonToRender));
        
        // Display audioVideo View
        this.audioVideoView.el = this.$(".audio_video");
        this.audioVideoView.render();
        
        // Display the DatumTagsView
        this.datumTagsView.el = this.$(".datum_tags_ul");
        this.datumTagsView.render();
        
        // Display the DatumFieldsView
        this.datumFieldsView.el = this.$(".datum_fields_ul");
        this.datumFieldsView.render();
      }

      return this;
    }