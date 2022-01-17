function () {
            var model = this.model.toJSON();
            model.CreatedDateTimeDescription = parseISO8601(this.model.get('CreatedDateTime'));
            model.ObservedOnDescription = ''; //parseISO8601(this.model.get('ObservedOn') + 'Z').format('d MMM yyyy')
            return {
                Model: model
            };
        }