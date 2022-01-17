function (config) {
    var self = this;

    var formatAmount = BubbleTree.Utils.formatNumber = OpenSpending.Utils.formatAmount;

    selectedRegion = null;
    currentNode = null;

    opts = $.extend(true, {
        currency: null,
        query: {
            apiUrl: 'http://openspending.org/api',
            dataset: null,
            drilldowns: [],
            cuts: [],
            rootNodeLabel: null,
            breakdown: null
        },
        bubbleStyles: {
            cofog1:  BubbleTree.Styles.Cofog1,
            sector: BubbleTree.Styles.Sector
        },
        map: {
            url: null,
            layerName: null,
            keyAttribute: null
        },
        table: {
            show: true,
            columns: [],
            sorting: [['amount', 'desc']]
        }
    }, config);

    $('#preloader .txt').html('loading spending data');

    var $tooltip = $('<div class="tooltip">Tooltip</div>');
    $('.bubbletree').append($tooltip);
    $tooltip.hide();


    function updateLegend(title, colors, limits, currency) {
        var currencyLabel = ' (' + currency + ')';
        var $lg = $('#cm-map-legend');
        $lg.html('');

        title = selectedRegion ? title + ' in ' + selectedRegion : title;
        $lg.append('<div class="title">Expenditure on ' + title + '</div>');
        $.each(colors, function(i,col) {
            if (isNaN(limits[i])) limits[i] = 0;
            if (isNaN(limits[i+1])) return;
            var row = $('<div class="row" />'),
                lbl = formatAmount(limits[i])+'&nbsp;–&nbsp;'+formatAmount(limits[i+1])+
                    (i===0?currencyLabel:'');
            row.append('<div class="color" style="background:'+col+'"></div>');
            row.append('<div class="lbl">'+lbl+'</div>');
            $lg.append(row);
        });
        $('#cm-map-legend').show();
    }

    var onNodeClick = function(node) {
        $('.qtip').remove();
        curtainsUp();

        var 
        // create a nice colorscale based on the selected bubble color
        hcl = chroma.hex(node.color).hcl(),
        colsc = new chroma.ColorScale({
            colors: [
                chroma.hcl(hcl[0], Math.min(1,hcl[1]), 0.95),
                chroma.hcl(hcl[0], Math.min(1.2,hcl[1]), 0.8),
                chroma.hcl(hcl[0], Math.min(1.4,hcl[1]), 0.65),
                chroma.hcl(hcl[0], Math.min(1.6,hcl[1]), 0.5),
                chroma.hcl(hcl[0], Math.min(1.8,hcl[1]), 0.35),
                chroma.hcl(hcl[0], Math.min(2,hcl[1]), 0.2)
            ],
            limits: chroma.limits(node.breakdowns, 'q', 6, 'amount')
        });
        var currency = opts.currency || node.currency;
        
        // update map legend
        updateLegend(node.label, colsc.colors, colsc.classLimits,
                     OpenSpending.Utils.currencySymbol(currency));
        
        // apply colors to map
        self.map.choropleth({
            data: function(e) {
                return node.breakdowns[e[opts.map.keyAttribute]];
            },
            colors: function(d) {
                if (d === undefined || isNaN(d.amount)) return '#ccc';
                return colsc.getColor(d.amount);
            }
            //,duration: 200
        });

        self.map.tooltips({
            layer: opts.map.layerName,
            content: function (e) {
                var v = node.breakdowns[e];
                if (v === undefined ) return ['', ''];
                var famount = OpenSpending.Utils.formatAmountWithCommas(v.amount, 0, currency);
                return [e, '<div class="lbl">'+node.label+'</div><div class="amount">'+famount+'</div>'];
            },
            delay: 300
        });
        // create tooltips
        currentNode = node;
        updateTable();
    };

    var nodeCuts = function(node) {
        var cuts = [];
        if (node&&node.parent) {
            cuts = nodeCuts(node.parent);
        }
        if (node&&node.taxonomy) {
            cuts.push(node.taxonomy+":"+node.name);
        }
        return cuts;
    };

    var regionCuts = function() {
        return selectedRegion ?
            opts.query.cuts.concat(opts.query.breakdown+':'+selectedRegion) :
            opts.query.cuts;
    };
    
    var allCuts = function() {
        var cuts = regionCuts();
        cuts = cuts.concat(nodeCuts(currentNode));
        return cuts;
    };

    var curtainsUp = function() {
        $('.qtip').remove();
        $('.under-curtain').show();
        $('.qtip').remove();
        $('#preloader').hide();
    };

    var curtainsDown = function() {
        $('.qtip').remove();
        $('.under-curtain').hide();
        $('#cm-bubbletree').empty();
        $('#preloader').show();
    };

    var loadData = function() {
        curtainsDown();
        // init bubbletree
        new OpenSpending.Aggregator({
            apiUrl: opts.query.apiUrl,
            dataset: opts.query.dataset,
            drilldowns: opts.query.drilldowns,
            cuts: regionCuts(),
            rootNodeLabel: opts.query.rootNodeLabel,
            breakdown: opts.query.breakdown,
            processEntry: opts.query.processEntry,
            callback: function(data) {
                $('#cm-bubbletree').empty();
                self.bt = new BubbleTree({
                    data: data,
                    container: '#cm-bubbletree',
                    bubbleType: 'icon',
                    nodeClickCallback: onNodeClick,
                    firstNodeCallback: onNodeClick,
                    rootPath: 'img/functions/',
                    tooltip: {
                        qtip: true,
                        delay: 800,
                        content: function(node) {
                            return [node.label, '<div class="amount">'+node.famount+'</div>'];
                        }
                    },
                    bubbleStyles: opts.bubbleStyles,
                    clearColors: true // remove all colors coming from OpenSpending API
                });
            }
        });
    };
     
    // init map
    
    var map = self.map = $K.map('#cm-map');
    map.loadStyles('css/map.css', function() {
        map.loadMap(opts.map.url, function() {
            map.addLayer({
                id: opts.map.layerName,
                key: opts.map.keyAttribute
            });

            map.onLayerEvent('click', function(d) {
                var a = d[opts.map.keyAttribute];
                selectedRegion = selectedRegion==a ? null : a;
                loadData();
            });
        }); // map.loadMap(function())
    }); // map.loadStyles(function())

    var updateTable = function() {
        if (!opts.table.show)
            return;
        self.dt.filters = {};
        _.each(allCuts(), function(c) {
            var parts = c.split(':');
            if (parts[0]=='year') parts[0] = 'time.year';
            self.dt.filters[parts[0]] = parts[1];
        });
        self.dt.redraw();
    };

    if (opts.table.show) {
        self.dt = new OpenSpending.DataTable($('#cm-datatable'), {
            source: opts.query.apiUrl + '/2/search',
            sorting: opts.table.sorting,
            columns: opts.table.columns,
            defaultParams: { dataset: opts.query.dataset },
            tableOptions: {
                bFilter: false,
                sDom: "<'row'<'span0'l><'span9'f>r>t<'row'<'span4'i><'span5'p>>",
                sPaginationType: "bootstrap"
                }
            });
        self.dt.init();
    }

    loadData();
}