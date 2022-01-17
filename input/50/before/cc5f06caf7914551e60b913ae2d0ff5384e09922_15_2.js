function () {
            log('observationFormLayoutView:serializeData');
            return {
                Model: {
                    Observation: this.model.toJSON(),
                    Categories: this.categories
                }
            };
        }