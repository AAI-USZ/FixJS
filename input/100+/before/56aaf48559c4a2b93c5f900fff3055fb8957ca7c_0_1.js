function updateCurrentData() {
            currentData = {};
            $.each(categories, function(i, category) {
                currentData[category] = getCategoryCurrentData(selectedFilters, category);
            });
            currentData.irregularidades = getIrregularidades(selectedFilters);
        }