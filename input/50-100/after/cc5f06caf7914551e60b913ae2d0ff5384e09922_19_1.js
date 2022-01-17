function () {
            var json = { Model: this.model.toJSON() };
            json.Model.CreatedDateTimeDescription = parseISO8601(this.model.get('CreatedDateTime'));
            json.Model.ObservedOnDescription = ''; //parseISO8601(this.model.get('ObservedOn') + 'Z').format('d MMM yyyy')
            json.Model.ShowThumbnails = this.model.get('ObservationAdded').Observation.Media.length > 1 ? true : false;
            return json;
        }