function (data) {
        var self = this;
        var vm = window.viewModel;

        ko.mapping.fromJS(data, mapping, self);

        self.asArray = function () {
            return vm.utilities.asArray(self.averages);
        };

        self.getScoring = function (item) {
            var info = vm.info;
            var maps = vm.scoringMap.categories;
            
            var division = item.key;
            var level = info.divisions[division].levelId;
            var map = maps[division] || maps[level];
            var scores = vm.utilities.asArray(item.value);

            map = _.extend(map, maps['judges-deductions'], maps['judges-legalities']);

            _.each(scores, function (score) {
                score.category = map[score.key].display;
            });

            return {
                level: info.levels[level].name,
                division: info.divisions[division].name,
                map: map,
                scores: scores
            };
        };
    }