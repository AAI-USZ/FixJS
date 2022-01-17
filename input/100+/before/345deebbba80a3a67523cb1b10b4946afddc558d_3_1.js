function groupData(data, view) {
        var metric = view.metric,
            range = normalizeRange(view.range),
            group = view.group || 'day',
            groupedData = {};

        // if grouping is by day, do nothing.
        if (group == 'day') return data;
        var groupKey = false,
            groupVal = false,
            groupCount = 0,
            d, row, firstIndex;

        if (group == 'all') {
            groupKey = firstIndex = range.start.iso();
            groupCount = 0;
            groupVal = {
                date: groupKey,
                count: 0,
                data: {},
                empty: true
            };
            if (metric == 'contributions') {
                _.extend(groupVal, {
                    average: 0,
                    total: 0
                });
            }
        }

        function performAggregation() {
            // we drop the some days of data from the result set
            // if they are not a complete grouping.
            if (groupKey && groupVal && !groupVal.empty) {
                // average `count` for mean metrics
                if (metricTypes[metric] == 'mean') {
                    groupVal.count /= groupCount;
                }
                if (!firstIndex) firstIndex = groupKey;
                // overview gets special treatment. Only average ADUs.
                if (metric == 'overview') {
                    groupVal.data.updates /= groupCount;
                } else if (metric == 'contributions') {
                    groupVal.average /= groupCount;
                } else if (metric in breakdownMetrics) {
                    // average for mean metrics.
                    _.each(groupVal.data, function(val, field) {
                        if (metricTypes[metric] == 'mean') {
                            groupVal.data[field] /= groupCount;
                        }
                    });
                }
                groupedData[groupKey] = groupVal;
            }
        }

        // big loop!
        forEachISODate(range, '1 day', data, function(row, d) {
            // Here's where grouping points are caluculated.
            if ((group == 'week' && d.getDay() === 0) ||
                (group == 'month' && d.getDate() == 1)) {

                performAggregation();
                // set the new group date to the current iteration.
                groupKey = d.iso();
                // reset our aggregates.
                groupCount = 0;
                groupVal = {
                    date: groupKey,
                    count: 0,
                    data: {},
                    empty: true
                };
                if (metric == 'contributions') {
                    _.extend(groupVal, {
                        average: 0,
                        total: 0
                    });
                }
            }
            // add the current row to our aggregates.
            if (row && groupVal) {
                groupVal.empty = false;
                groupVal.count += row.count;
                if (metric == 'contributions') {
                    groupVal.total += parseFloat(row.total);
                    groupVal.average += parseFloat(row.average);
                }
                if (metric in breakdownMetrics) {
                    _.each(row.data, function(val, field) {
                        if (!groupVal.data[field]) {
                            groupVal.data[field] = 0;
                        }
                        groupVal.data[field] += val;
                    });
                }
            }
            groupCount++;
        }, this);
        if (group == 'all') performAggregation();
        groupedData.empty = _.isEmpty(groupedData);
        groupedData.firstIndex = firstIndex;
        return groupedData;
    }