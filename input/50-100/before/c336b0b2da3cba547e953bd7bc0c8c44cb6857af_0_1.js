function (model, value, options) {
        XT.log("Model changed: " + JSON.stringify(model.toJSON()));


        // XXX this gets called for all the relational subobjects
        // as well and we don't really want to deal with those
        // because we've already dealt with them under the master
        // model. So I just ignore any calls to this function that
        // are not for the function in question. It'd be better if
        // I dealt with the reason this was getting called so much.
        if (model.get("type") !== this.getModelType()) {
          return;
        }

        /**
         * Put the model in the history array
         */
        XT.addToHistory(model);


        /**
         * Pass this model onto the panels to update
         */
        this.$.workspacePanels.updateFields(model);
      }