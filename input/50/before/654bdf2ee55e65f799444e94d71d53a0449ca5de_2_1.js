function () {
            var viewModels = [];
            _.each(this.models, function (project) {
                viewModels.push(project.toJSONViewModel());
            });
            return viewModels;
        }