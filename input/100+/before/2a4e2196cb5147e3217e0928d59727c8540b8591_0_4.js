function() {
    var AppRouter, AreaPresenter, GaugePresenter, LinePresenter, PageInfo, PageInfoList, PageTitleView, PageTitlesView, PiePresenter, SeriesPresenter, TablePresenter, TimelinePresenter, Widget, WidgetChartView, WidgetList, WidgetListView, WidgetPresenter, WidgetView, appRouter, globalOptions, pageInfos, pageTitlesApp, widgetList, widgetListApp;
    globalOptions = gon.options;
    String.prototype.capitalize = function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    };
    PageInfo = Backbone.Model.extend({});
    PageInfoList = Backbone.Collection.extend({
      model: PageInfo,
      selected: function() {
        return this.find(function(m) {
          return m.get('selected');
        });
      },
      selectFirst: function() {
        if (this.length > 0) return this.at(0).set('selected', true);
      },
      selectPage: function(id) {
        return this.each(function(m) {
          return m.set('selected', m.id === id);
        });
      }
    });
    pageInfos = new PageInfoList;
    PageTitleView = Backbone.View.extend({
      tagName: 'li',
      template: _.template('<a href="#/pages/<%= id  %>"><%= title %></a>'),
      initialize: function() {
        this.model.bind('change', this.render, this);
        return this.model.bind('destroy', this.remove, this);
      },
      render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        if (this.model.get('selected')) {
          return this.$el.addClass('active');
        } else {
          return this.$el.removeClass('active');
        }
      }
    });
    PageTitlesView = Backbone.View.extend({
      initialize: function() {
        return pageInfos.bind('reset', this.render, this);
      },
      addOne: function(pageInfo) {
        var view;
        view = new PageTitleView({
          model: pageInfo
        });
        view.render();
        return $('#page-titles').append(view.el);
      },
      render: function() {
        $('#page-titles').empty();
        return pageInfos.each(this.addOne);
      }
    });
    pageTitlesApp = new PageTitlesView;
    pageInfos.reset(gon.pageInfos);
    WidgetPresenter = (function() {

      WidgetPresenter.name = 'WidgetPresenter';

      function WidgetPresenter(model, el) {
        var chartClass;
        this.model = model;
        chartClass = this.chartClass();
        this.chart = new chartClass(el);
        this.draw();
      }

      WidgetPresenter.prototype.get = function(arg) {
        return this.model.get(arg);
      };

      WidgetPresenter.prototype.dateOffset = function() {
        if (globalOptions.useUtc) {
          return (new Date).getTimezoneOffset() * 60000;
        } else {
          return 0;
        }
      };

      WidgetPresenter.prototype.options = function() {
        return {
          title: this.get('title'),
          height: 300
        };
      };

      WidgetPresenter.prototype.mergedOptions = function() {
        return $.extend(true, this.options(), globalOptions.gchartOptions, pageInfos.selected().get('gchartOptions'), this.get('gchartOptions'));
      };

      WidgetPresenter.prototype.data = function() {
        return new google.visualization.DataTable;
      };

      WidgetPresenter.prototype.chartClass = function() {
        return google.visualization[this.visualization];
      };

      WidgetPresenter.prototype.draw = function(min, max) {
        this.model.cutoff(min, max);
        return this.chart.draw(this.data(), this.mergedOptions());
      };

      return WidgetPresenter;

    })();
    WidgetPresenter.create = function(model, el) {
      var presenterClass, type;
      type = model.get('type');
      if ((type != null) && type.match(/^\w+$/)) {
        presenterClass = eval("" + (type.capitalize()) + "Presenter");
        return new presenterClass(model, el);
      } else {
        return null;
      }
    };
    PiePresenter = (function(_super) {

      __extends(PiePresenter, _super);

      PiePresenter.name = 'PiePresenter';

      function PiePresenter() {
        return PiePresenter.__super__.constructor.apply(this, arguments);
      }

      PiePresenter.prototype.visualization = 'PieChart';

      PiePresenter.prototype.data = function() {
        var data;
        data = PiePresenter.__super__.data.call(this);
        data.addColumn('string', 'Title');
        data.addColumn('number', this.get('valuesTitle'));
        data.addRows(this.get('series').data);
        return data;
      };

      PiePresenter.prototype.options = function() {
        return $.extend(true, PiePresenter.__super__.options.call(this), {
          slices: this.get('series').options,
          legend: {
            position: 'bottom'
          }
        });
      };

      return PiePresenter;

    })(WidgetPresenter);
    TimelinePresenter = (function(_super) {

      __extends(TimelinePresenter, _super);

      TimelinePresenter.name = 'TimelinePresenter';

      function TimelinePresenter() {
        return TimelinePresenter.__super__.constructor.apply(this, arguments);
      }

      TimelinePresenter.prototype.data = function() {
        var data, dateOffset, series;
        data = TimelinePresenter.__super__.data.call(this);
        data.addColumn('datetime', 'Time');
        dateOffset = this.dateOffset();
        series = this.get('series');
        _.each(series.titles, function(t) {
          return data.addColumn('number', t);
        });
        _.each(series.rows, function(row) {
          row[0] = new Date(row[0] + dateOffset);
          return data.addRow(row);
        });
        return data;
      };

      return TimelinePresenter;

    })(WidgetPresenter);
    SeriesPresenter = (function(_super) {

      __extends(SeriesPresenter, _super);

      SeriesPresenter.name = 'SeriesPresenter';

      function SeriesPresenter() {
        return SeriesPresenter.__super__.constructor.apply(this, arguments);
      }

      SeriesPresenter.prototype.options = function() {
        return $.extend(true, SeriesPresenter.__super__.options.call(this), {
          lineWidth: 1,
          chartArea: {
            left: 40,
            width: '100%'
          },
          legend: {
            position: 'bottom'
          },
          vAxis: {
            title: this.get('valuesTitle')
          },
          hAxis: {
            format: 'yyyy.MM.dd HH:mm:ss'
          },
          series: this.get('series').options,
          axisTitlesPosition: 'in'
        });
      };

      return SeriesPresenter;

    })(TimelinePresenter);
    LinePresenter = (function(_super) {

      __extends(LinePresenter, _super);

      LinePresenter.name = 'LinePresenter';

      function LinePresenter() {
        return LinePresenter.__super__.constructor.apply(this, arguments);
      }

      LinePresenter.prototype.visualization = 'LineChart';

      return LinePresenter;

    })(SeriesPresenter);
    AreaPresenter = (function(_super) {

      __extends(AreaPresenter, _super);

      AreaPresenter.name = 'AreaPresenter';

      function AreaPresenter() {
        return AreaPresenter.__super__.constructor.apply(this, arguments);
      }

      AreaPresenter.prototype.visualization = 'AreaChart';

      return AreaPresenter;

    })(SeriesPresenter);
    TablePresenter = (function(_super) {

      __extends(TablePresenter, _super);

      TablePresenter.name = 'TablePresenter';

      function TablePresenter() {
        return TablePresenter.__super__.constructor.apply(this, arguments);
      }

      TablePresenter.prototype.visualization = 'Table';

      TablePresenter.prototype.options = function() {
        return $.extend(true, TablePresenter.__super__.options.call(this), {
          sortColumn: 0,
          sortAscending: false
        });
      };

      return TablePresenter;

    })(TimelinePresenter);
    GaugePresenter = (function(_super) {

      __extends(GaugePresenter, _super);

      GaugePresenter.name = 'GaugePresenter';

      function GaugePresenter() {
        return GaugePresenter.__super__.constructor.apply(this, arguments);
      }

      GaugePresenter.prototype.visualization = 'Gauge';

      GaugePresenter.prototype.data = function() {
        var data;
        data = GaugePresenter.__super__.data.call(this);
        data.addColumn('string', 'Label');
        data.addColumn('number', this.get('valuesTitle'));
        data.addRows(this.get('series'));
        return data;
      };

      return GaugePresenter;

    })(WidgetPresenter);
    Widget = Backbone.Model.extend({
      initialize: function() {
        this.needRefresh = true;
        this.setNextFetch();
        return this.timespanInc = 0;
      },
      increaseTimespan: function(inc) {
        this.timespanInc = this.timespanInc + inc;
        return this.forceUpdate();
      },
      resetTimespan: function() {
        this.timespanInc = 0;
        return this.forceUpdate();
      },
      url: function() {
        return "" + (this.collection.url()) + "/" + (this.get('id')) + "?timespan=" + (this.get('timespan') + this.timespanInc);
      },
      time: function() {
        return (new Date()).getTime();
      },
      setNextFetch: function() {
        return this.nextFetch = this.time() + this.get('interval') * 1000;
      },
      setRefresh: function(needRefresh) {
        return this.needRefresh = needRefresh;
      },
      needFetch: function() {
        var interval;
        interval = this.get('interval');
        return this.time() > this.nextFetch && this.needRefresh && (interval != null) && interval > 0;
      },
      refetch: function() {
        if (this.needFetch()) {
          this.forceUpdate();
          return this.setNextFetch();
        }
      },
      cutoffValue: function(v, min, max) {
        if (v != null) {
          if ((min != null) && v < min) {
            return min;
          } else if ((max != null) && v > max) {
            return max;
          } else {
            return v;
          }
        } else {
          return 0;
        }
      },
      cutoff: function(min, max) {
        return _.each(this.get('series').rows, function(row) {
          var i, value, _i, _ref, _results;
          _results = [];
          for (i = _i = 1, _ref = row.length - 1; 1 <= _ref ? _i <= _ref : _i >= _ref; i = 1 <= _ref ? ++_i : --_i) {
            value = row[i];
            if (value == null) value = 0;
            _results.push(row[i] = this.cutoffValue(value, min, max));
          }
          return _results;
        }, this);
      },
      forceUpdate: function() {
        return this.fetch({
          success: function(model, response) {
            return model.trigger('redraw');
          }
        });
      }
    });
    WidgetList = Backbone.Collection.extend({
      model: Widget,
      url: function() {
        return ROOT + 'pages/' + pageInfos.selected().id + '/widgets';
      }
    });
    WidgetChartView = Backbone.View.extend({
      tagName: 'div',
      initialize: function() {
        return this.model.bind('destroy', this.remove, this);
      },
      updateData: function(min, max) {
        return this.presenter.draw(min, max);
      },
      render: function() {
        this.presenter = WidgetPresenter.create(this.model, this.el);
        return this.presenter.draw();
      }
    });
    WidgetView = Backbone.View.extend({
      tagName: 'div',
      template: function() {
        return _.template($(".widget-template[data-widget-type=\"" + (this.model.get('type')) + "\"]").html());
      },
      initialize: function() {
        this.model.bind('destroy', this.remove, this);
        return this.model.bind('redraw', this.updateChart, this);
      },
      events: {
        "click #refresh": 'refresh',
        "click #need-refresh": 'setRefresh',
        "click #extend-timespan": 'extendTimespan',
        "click #reset-timespan": 'resetTimespan'
      },
      refresh: function() {
        return this.model.forceUpdate();
      },
      setRefresh: function() {
        var needRefresh;
        needRefresh = this.$el.find('#need-refresh').is(":checked");
        this.model.setRefresh(needRefresh);
        return true;
      },
      extendTimespan: function() {
        var select, val;
        select = this.$el.find("#extend-timespan-val");
        val = select.first().val();
        return this.model.increaseTimespan(parseInt(val));
      },
      resetTimespan: function() {
        return this.model.resetTimespan();
      },
      renderChart: function() {
        return this.chartView.render();
      },
      updateChart: function() {
        return this.chartView.updateData(this.cutoffMin(), this.cutoffMax());
      },
      render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        this.chartView = new WidgetChartView({
          model: this.model
        });
        this.$el.find("#plotarea").append(this.chartView.el);
        return this.$el.addClass("span" + (this.model.get('width')));
      },
      cutoffMin: function() {
        var val;
        val = parseFloat(this.controlValue('#cutoff-min'));
        if (_.isNaN(val)) {
          return null;
        } else {
          return val;
        }
      },
      cutoffMax: function() {
        var val;
        val = parseFloat(this.controlValue('#cutoff-max'));
        if (_.isNaN(val)) {
          return null;
        } else {
          return val;
        }
      },
      controlValue: function(id) {
        var val;
        return val = this.$el.find(id).first().val();
      }
    });
    widgetList = new WidgetList;
    setInterval(function() {
      return widgetList.each(function(w) {
        return w.refetch();
      });
    }, 200);
    WidgetListView = Backbone.View.extend({
      initialize: function() {
        return widgetList.bind('reset', this.render, this);
      },
      render: function() {
        var container;
        container = $('#widgets');
        container.empty();
        return widgetList.each(function(w) {
          var view;
          view = new WidgetView({
            model: w
          });
          view.render();
          container.append(view.el);
          return view.renderChart();
        });
      }
    });
    widgetListApp = new WidgetListView;
    AppRouter = Backbone.Router.extend({
      routes: {
        'pages/:id': 'getPage',
        '*actions': 'defaultRoute'
      },
      getPage: function(ids) {
        var id;
        id = parseInt(ids);
        pageInfos.selectPage(id);
        return widgetList.fetch();
      },
      defaultRoute: function(actions) {
        if (pageInfos.length > 0) return this.navigate('//pages/1');
      }
    });
    appRouter = new AppRouter;
    return Backbone.history.start();
  }