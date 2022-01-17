function() {
      // Remember if the encryption check box was checked
      var checked = this.$el.find(".add_encrypted").is(':checked') ? "checked" : "";
      
      // Create the new DatumField based on what the user entered
      var m = new DatumField({
        "label" : this.$el.find(".choose_add_field").val().toLowerCase().replace(/ /g,"_"),
        "encrypted" : checked,
        "help" : this.$el.find(".add_help").val()
      });

      // Add the new DatumField to the Corpus' list for datumFields
      this.model.get("datumFields").add(m);
      
      // Reset the line with the add button
      this.$el.find(".choose_add_field").val("");//.children("option:eq(0)").attr("selected", true);
      this.$el.find(".add_help").val("");
      window.appView.addUnsavedDoc(this.model.id);

    }