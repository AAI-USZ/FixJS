function (model) {
        //
        // Determine the model that will back this view
        //
        var modelType = XV.util.formatModelName(model.recordType);

        //
        // Setting the model type also renders the workspace. We really can't do
        // that until we know the model type.
        //
        this.setModelType(modelType);
        this.$.workspaceHeader.setContent(modelType);
        this.setWorkspaceList();
        this.$.menuItems.render();
        this.$.workspacePanels.setModelType(modelType);


        //
        // Set up a listener for changes in the model
        //
        var Klass = Backbone.Relational.store.getObjectByName("XM." + modelType);
        var m = new Klass();
        this.setModel(m);
        m.on("change", enyo.bind(this, "modelDidChange"));


        //
        // Fetch the model
        //
        var id = model.id;
        if (id) {
          // id exists: pull pre-existing record for edit
          m.fetch({id: id});
          XT.log("Workspace is fetching " + modelType + " " + id);
        } else {
          // no id: this is a new record
          m.fetch();
          XT.log("Workspace is fetching new " + modelType);
        }


      }