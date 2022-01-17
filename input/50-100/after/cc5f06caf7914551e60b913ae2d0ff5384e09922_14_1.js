function () {
            var json = { Model: { Observation: this.model.toViewJSON() } };
            json.Model.ShowThumbnails = this.model.get('Media').length > 1 ? true : false;
            return json;
        }