function (model, directModel, callback) {
                fluid.log("Post of new term record " + JSON.stringify(model) + " to URL " + directModel.termURL);
                callback({urn: "urn:" + fluid.allocateGuid(), displayName: model.fields.displayName});
            }