function () {
            return {
                Model: {
                    Observation: this.model.toJSON(),
                    Categories: this.categories
                }
            };
        }