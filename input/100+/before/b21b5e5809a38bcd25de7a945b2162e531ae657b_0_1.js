function(chartType, categoryAxisType, tooltip, direction, stacked)
    {
        var cfg = {
            type: chartType,
            dataProvider: dataValues,
            render: "#mychart",
            horizontalGridlines: true,
            verticalGridlines: true,
            seriesCollection: [
                {
                    xKey: "category",
                    yKey: "miscellaneous",
                    xDisplayName: "Date",
                    yDisplayName: "Miscellaneous"
                },
                {
                    xKey: "category",
                    yKey: "expenses",
                    xDisplayName: "Date",
                    yDisplayName: "Expenses"
                },
                {
                    xKey: "category",
                    yKey: "revenue",
                    xDisplayName: "Date",
                    yDisplayName: "Revenue"
                }
            ],
            tooltip: tooltip
        },
        globalCfg = {
           eventType: tooltip.showEvent || "mousseover",
           tooltip: tooltip
        };
        if(direction)
        {
            cfg.direction = direction;
        }
        if(stacked)
        {
            cfg.stacked = stacked;
        }
        if(categoryAxisType)
        {
            cfg.categoryType = categoryAxisType;
        }
        return new ChartMarkerEventTestTemplate(cfg, globalCfg);
    }