function (item) {
            var info = lookup.info;
            var maps = lookup.scoringMap.categories;
            
            var division = item.key;
            var level = info.divisions[division].levelId();
            var map = maps[division] || maps[level];
            var scores = vm.utilities.asArray(item.value);

            map = _.extend(map, maps['judges-deductions'], maps['judges-legalities']);

            _.each(scores, function (score) {
                score.category = map[score.key].display();
            });

            return {
                level: info.levels[level].name,
                division: info.divisions[division].name,
                map: map,
                scores: scores
            };
        }