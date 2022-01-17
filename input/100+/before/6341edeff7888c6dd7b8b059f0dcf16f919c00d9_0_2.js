function() {
  var $, root, scope, stope,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  if (!Array.prototype.filter) {
    Array.prototype.filter = function(test) {
      var x, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = this.length; _i < _len; _i++) {
        x = this[_i];
        if (test(x)) {
          _results.push(x);
        }
      }
      return _results;
    };
  }

  if (!Array.prototype.map) {
    Array.prototype.map = function(transform) {
      var x, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = this.length; _i < _len; _i++) {
        x = this[_i];
        _results.push(transform(x));
      }
      return _results;
    };
  }

  $ = jQuery;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  if (!root.console) {
    root.console = {
      log: function() {},
      debug: function() {},
      error: function() {}
    };
  }

  stope = function(f) {
    return function(e) {
      e.stopPropagation();
      e.preventDefault();
      return f(e);
    };
  };

  scope = function(path, code, overwrite) {
    var exporting, name, ns, part, parts, value, _i, _len;
    if (code == null) {
      code = (function() {});
    }
    if (overwrite == null) {
      overwrite = false;
    }
    parts = path.split(".");
    ns = root;
    for (_i = 0, _len = parts.length; _i < _len; _i++) {
      part = parts[_i];
      ns = ns[part] ? ns[part] : (ns[part] = {});
    }
    exporting = function(cls) {
      return ns[cls.name] = cls;
    };
    if (_.isFunction(code)) {
      code(exporting);
    } else {
      for (name in code) {
        value = code[name];
        if (overwrite || !(ns[name] != null)) {
          ns[name] = value;
        }
      }
    }
    return ns;
  };

  scope("intermine", {
    scope: scope
  }, true);

  scope("intermine.icons", {
    Yes: "icon-star",
    No: "icon-star-empty",
    Script: "icon-beaker",
    Export: "icon-download-alt",
    Remove: "icon-minus-sign",
    Add: "icon-plus-sign",
    Move: "icon-reorder",
    Filter: "icon-filter",
    Summary: "icon-bar-chart",
    Undo: "icon-undo",
    Columns: "icon-table"
  });

  scope("intermine.options", {
    GalaxyMain: "http://main.g2.bx.psu.edu",
    ShowId: false
  });

  scope("intermine.query", function(exporting) {
    var Attribute, CONSTRAINT_ADDER_HTML, ConstraintAdder, PATH_HIGHLIGHTER, PATH_LEN_SORTER, PATH_MATCHER, PathChooser, Reference, ReverseReference, pathLen, pos;
    pos = function(substr) {
      return _.memoize(function(str) {
        return str.toLowerCase().indexOf(substr);
      });
    };
    pathLen = _.memoize(function(str) {
      return str.split(".").length;
    });
    exporting(PATH_LEN_SORTER = function(items) {
      var getPos;
      getPos = pos(this.query.toLowerCase());
      items.sort(function(a, b) {
        if (a === b) {
          return 0;
        } else {
          return getPos(a) - getPos(b) || pathLen(a) - pathLen(b) || (a < b ? -1 : 1);
        }
      });
      return items;
    });
    exporting(PATH_MATCHER = function(item) {
      var lci, term, terms;
      lci = item.toLowerCase();
      terms = (function() {
        var _i, _len, _ref, _results;
        _ref = this.query.toLowerCase().split(/\s+/);
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          term = _ref[_i];
          if (term) {
            _results.push(term);
          }
        }
        return _results;
      }).call(this);
      return item && _.all(terms, function(t) {
        return lci.match(t);
      });
    });
    exporting(PATH_HIGHLIGHTER = function(item) {
      var term, terms, _i, _len;
      terms = this.query.toLowerCase().split(/\s+/);
      for (_i = 0, _len = terms.length; _i < _len; _i++) {
        term = terms[_i];
        if (term) {
          item = item.replace(new RegExp(term, "gi"), function(match) {
            return "<>" + match + "</>";
          });
        }
      }
      return item.replace(/>/g, "strong>");
    });
    CONSTRAINT_ADDER_HTML = "<input type=\"text\" placeholder=\"Add a new filter\" class=\"im-constraint-adder span9\">\n<button disabled class=\"btn span2\" type=\"submit\">\n    Filter\n</button>";
    Attribute = (function(_super) {

      __extends(Attribute, _super);

      function Attribute() {
        return Attribute.__super__.constructor.apply(this, arguments);
      }

      Attribute.prototype.tagName = 'li';

      Attribute.prototype.events = {
        'click a': 'handleClick'
      };

      Attribute.prototype.handleClick = function(e) {
        var isNewChoice;
        e.stopPropagation();
        e.preventDefault();
        if (!this.getDisabled(this.path)) {
          isNewChoice = !this.$el.is('.active');
          return this.evts.trigger('chosen', this.path, isNewChoice);
        }
      };

      Attribute.prototype.initialize = function(query, path, depth, evts, getDisabled, multiSelect) {
        var _this = this;
        this.query = query;
        this.path = path;
        this.depth = depth;
        this.evts = evts;
        this.getDisabled = getDisabled;
        this.multiSelect = multiSelect;
        this.evts.on('remove', function() {
          return _this.remove();
        });
        this.evts.on('chosen', function(p, isNewChoice) {
          if (p.toString() === _this.path.toString()) {
            return _this.$el.toggleClass('active', isNewChoice);
          } else {
            if (!_this.multiSelect) {
              return _this.$el.removeClass('active');
            }
          }
        });
        return this.evts.on('filter:paths', function(terms) {
          var lastMatch, matches, t, _i, _len;
          terms = (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = terms.length; _i < _len; _i++) {
              t = terms[_i];
              if (t) {
                _results.push(new RegExp(t, 'i'));
              }
            }
            return _results;
          })();
          if (terms.length) {
            matches = 0;
            lastMatch = null;
            for (_i = 0, _len = terms.length; _i < _len; _i++) {
              t = terms[_i];
              if (t.test(_this.path.toString()) || t.test(_this.displayName)) {
                matches += 1;
                lastMatch = t;
              }
            }
            return _this.matches(matches, terms, lastMatch);
          } else {
            return _this.$el.show();
          }
        });
      };

      Attribute.prototype.template = _.template("<a href=\"#\" title=\"<%- path %> (<%- type %>)\"><span><%- name %></span></a>");

      Attribute.prototype.matches = function(matches, terms) {
        var _this = this;
        if (matches === terms.length) {
          this.evts.trigger('matched', this.path.toString());
          this.path.getDisplayName(function(name) {
            var hl, matchesOnPath, term, _i, _len;
            hl = _this.depth > 0 ? name.replace(/^.*>\s*/, '') : name;
            for (_i = 0, _len = terms.length; _i < _len; _i++) {
              term = terms[_i];
              hl = hl.replace(term, function(match) {
                return "<strong>" + match + "</strong>";
              });
            }
            matchesOnPath = _.any(terms, function(t) {
              return !!_this.path.end.name.match(t);
            });
            return _this.$('a span').html(hl.match(/strong/) || !matchesOnPath ? hl : "<strong>" + hl + "</strong>");
          });
        }
        return this.$el.toggle(!!(matches === terms.length));
      };

      Attribute.prototype.render = function() {
        var disabled,
          _this = this;
        disabled = this.getDisabled(this.path);
        if (disabled) {
          this.$el.addClass('disabled');
        }
        this.path.getDisplayName(function(name) {
          var a;
          _this.displayName = name;
          name = name.replace(/^.*\s*>/, '');
          a = $(_this.template({
            name: name,
            path: _this.path,
            type: _this.path.getType()
          }));
          a.appendTo(_this.el);
          return _this.addedLiContent(a);
        });
        return this;
      };

      Attribute.prototype.addedLiContent = function(a) {
        if (intermine.options.ShowId) {
          return a.tooltip({
            placement: 'bottom'
          }).appendTo(this.el);
        } else {
          return a.attr({
            title: ""
          });
        }
      };

      return Attribute;

    })(Backbone.View);
    Reference = (function(_super) {

      __extends(Reference, _super);

      function Reference() {
        return Reference.__super__.constructor.apply(this, arguments);
      }

      Reference.prototype.initialize = function(query, path, depth, evts, getDisabled, multiSelect, isSelectable) {
        var _this = this;
        this.query = query;
        this.path = path;
        this.depth = depth;
        this.evts = evts;
        this.getDisabled = getDisabled;
        this.multiSelect = multiSelect;
        this.isSelectable = isSelectable;
        Reference.__super__.initialize.call(this, this.query, this.path, this.depth, this.evts, this.getDisabled, this.multiSelect);
        this.evts.on('filter:paths', function(terms) {
          return _this.$el.hide();
        });
        return this.evts.on('matched', function(path) {
          if (path.match(_this.path.toString())) {
            _this.$el.show();
            if (!_this.$el.is('.open')) {
              return _this.openSubFinder();
            }
          }
        });
      };

      Reference.prototype.remove = function() {
        var _ref;
        if ((_ref = this.subfinder) != null) {
          _ref.remove();
        }
        return Reference.__super__.remove.call(this);
      };

      Reference.prototype.openSubFinder = function() {
        this.subfinder = new PathChooser(this.query, this.path, this.depth + 1, this.evts, this.getDisabled, this.isSelectable, this.multiSelect);
        this.$el.append(this.subfinder.render().el);
        return this.$el.addClass('open');
      };

      Reference.prototype.template = _.template("<a href=\"#\">\n  <i class=\"icon-chevron-right im-has-fields\"></i>\n  <span><%- name %></span>\n</a>");

      Reference.prototype.iconClasses = "icon-chevron-right icon-chevron-down";

      Reference.prototype.toggleFields = function() {
        this.$el.children().filter('i.im-has-fields').toggleClass(this.iconClasses);
        if (this.$el.is('.open')) {
          return this.$el.removeClass('open').children('ul').remove();
        } else {
          return this.openSubFinder();
        }
      };

      Reference.prototype.handleClick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        if ($(e.target).is('.im-has-fields') || (!this.isSelectable)) {
          return this.toggleFields();
        } else {
          return Reference.__super__.handleClick.call(this, e);
        }
      };

      Reference.prototype.addedLiContent = function(a) {
        var _this = this;
        if (_.any(this.query.views, function(v) {
          return v.match(_this.path.toString());
        })) {
          return this.openSubFinder();
        }
      };

      return Reference;

    })(Attribute);
    ReverseReference = (function(_super) {

      __extends(ReverseReference, _super);

      function ReverseReference() {
        return ReverseReference.__super__.constructor.apply(this, arguments);
      }

      ReverseReference.prototype.template = _.template("<a href=\"#\">\n  <i class=\"icon-retweet im-has-fields\"></i>\n  <span><%- name %></span>\n</a>");

      ReverseReference.prototype.toggleFields = function() {};

      ReverseReference.prototype.handleClick = function() {};

      ReverseReference.prototype.render = function() {
        ReverseReference.__super__.render.call(this);
        this.$el.attr({
          title: "Refers back to " + (this.path.getParent().getParent())
        }).tooltip();
        return this;
      };

      return ReverseReference;

    })(Reference);
    PathChooser = (function(_super) {

      __extends(PathChooser, _super);

      function PathChooser() {
        this.searchFor = __bind(this.searchFor, this);
        return PathChooser.__super__.constructor.apply(this, arguments);
      }

      PathChooser.prototype.tagName = 'ul';

      PathChooser.prototype.dropDownClasses = 'typeahead dropdown-menu';

      PathChooser.prototype.searchFor = function(terms) {
        var m, matches, p, _i, _len, _results;
        this.evts.trigger('filter:paths', terms);
        matches = (function() {
          var _i, _len, _ref, _results,
            _this = this;
          _ref = this.query.getPossiblePaths(3);
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            p = _ref[_i];
            if (_.all(terms, function(t) {
              return p.match(new RegExp(t, 'i'));
            })) {
              _results.push(p);
            }
          }
          return _results;
        }).call(this);
        _results = [];
        for (_i = 0, _len = matches.length; _i < _len; _i++) {
          m = matches[_i];
          _results.push(this.evts.trigger('matched', m, terms));
        }
        return _results;
      };

      PathChooser.prototype.initialize = function(query, path, depth, events, getDisabled, canSelectRefs, multiSelect) {
        var attr, cd, coll, name, ref, toPath,
          _this = this;
        this.query = query;
        this.path = path;
        this.depth = depth;
        this.getDisabled = getDisabled;
        this.canSelectRefs = canSelectRefs;
        this.multiSelect = multiSelect;
        this.evts = this.depth === 0 ? _.extend({}, Backbone.Events) : events;
        cd = this.path.getEndClass();
        toPath = function(f) {
          return _this.path.append(f);
        };
        this.attributes = (function() {
          var _ref, _results;
          _ref = cd.attributes;
          _results = [];
          for (name in _ref) {
            attr = _ref[name];
            _results.push(toPath(attr));
          }
          return _results;
        })();
        this.references = (function() {
          var _ref, _results;
          _ref = cd.references;
          _results = [];
          for (name in _ref) {
            ref = _ref[name];
            _results.push(toPath(ref));
          }
          return _results;
        })();
        this.collections = (function() {
          var _ref, _results;
          _ref = cd.collections;
          _results = [];
          for (name in _ref) {
            coll = _ref[name];
            _results.push(toPath(coll));
          }
          return _results;
        })();
        if (this.depth === 0) {
          return this.evts.on('chosen', events);
        }
      };

      PathChooser.DIVIDER = "<li class=\"divider\"></li>";

      PathChooser.prototype.render = function() {
        var apath, cd, isLoop, ref, rpath, _i, _j, _len, _len1, _ref, _ref1;
        cd = this.path.getEndClass();
        _ref = this.attributes;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          apath = _ref[_i];
          if (intermine.options.ShowId || apath.end.name !== 'id') {
            this.$el.append(new Attribute(this.query, apath, this.depth, this.evts, this.getDisabled, this.multiSelect).render().el);
          }
        }
        this.$el.append(PathChooser.DIVIDER);
        _ref1 = this.references.concat(this.collections);
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          rpath = _ref1[_j];
          isLoop = false;
          if ((rpath.end.reverseReference != null) && this.path.isReference()) {
            if (this.path.getParent().isa(rpath.end.referencedType)) {
              if (this.path.end.name === rpath.end.reverseReference) {
                isLoop = true;
              }
            }
          }
          if (isLoop) {
            ref = new ReverseReference(this.query, rpath, this.depth, this.evts, (function() {
              return true;
            }), this.multiSelect, this.canSelectRefs);
          } else {
            ref = new Reference(this.query, rpath, this.depth, this.evts, this.getDisabled, this.multiSelect, this.canSelectRefs);
          }
          this.$el.append(ref.render().el);
        }
        if (this.depth === 0) {
          this.$el.addClass(this.dropDownClasses);
        }
        this.$el.show();
        return this;
      };

      return PathChooser;

    })(Backbone.View);
    return exporting(ConstraintAdder = (function(_super) {

      __extends(ConstraintAdder, _super);

      function ConstraintAdder() {
        this.showTree = __bind(this.showTree, this);

        this.handleChoice = __bind(this.handleChoice, this);

        this.handleSubmission = __bind(this.handleSubmission, this);
        return ConstraintAdder.__super__.constructor.apply(this, arguments);
      }

      ConstraintAdder.prototype.tagName = "form";

      ConstraintAdder.prototype.className = "form im-constraint-adder row-fluid im-constraint";

      ConstraintAdder.prototype.initialize = function(query) {
        this.query = query;
      };

      ConstraintAdder.prototype.events = {
        'submit': 'handleSubmission'
      };

      ConstraintAdder.prototype.handleClick = function(e) {
        e.preventDefault();
        if (!$(e.target).is('button')) {
          e.stopPropagation();
        }
        if ($(e.target).is('button.btn-primary')) {
          return this.handleSubmission(e);
        }
      };

      ConstraintAdder.prototype.handleSubmission = function(e) {
        var con, _ref;
        e.preventDefault();
        e.stopPropagation();
        if (this.chosen != null) {
          con = {
            path: this.chosen.toString()
          };
          this.newCon = new intermine.query.NewConstraint(this.query, con);
          this.newCon.render().$el.insertAfter(this.el);
          this.$('.btn-primary').fadeOut('slow');
          if ((_ref = this.$pathfinder) != null) {
            _ref.remove();
          }
          this.$pathfinder = null;
          return this.query.trigger('editing-constraint');
        } else {
          return console.log("Nothing chosen");
        }
      };

      ConstraintAdder.prototype.handleChoice = function(path, isNewChoice) {
        if (isNewChoice) {
          this.chosen = path;
          return this.$('.btn-primary').fadeIn('slow');
        } else {
          this.chosen = null;
          return this.$('.btn-primary').fadeOut('slow');
        }
      };

      ConstraintAdder.prototype.isDisabled = function(path) {
        return false;
      };

      ConstraintAdder.prototype.getTreeRoot = function() {
        return this.query.getPathInfo(this.query.root);
      };

      ConstraintAdder.prototype.refsOK = true;

      ConstraintAdder.prototype.multiSelect = false;

      ConstraintAdder.prototype.reset = function() {
        this.$pathfinder.remove();
        return this.$pathfinder = null;
      };

      ConstraintAdder.prototype.showTree = function(e) {
        var pathFinder;
        if (this.$pathfinder != null) {
          return this.reset();
        } else {
          root = this.getTreeRoot();
          pathFinder = new PathChooser(this.query, root, 0, this.handleChoice, this.isDisabled, this.refsOK, this.multiSelect);
          pathFinder.render().$el.appendTo(this.el).show();
          pathFinder.$el.css({
            top: this.$el.height()
          });
          return this.$pathfinder = pathFinder;
        }
      };

      ConstraintAdder.prototype.isValid = function() {
        var _ref, _ref1;
        if (this.newCon != null) {
          if (!this.newCon.con.has('op')) {
            return false;
          }
          if (_ref = this.newCon.con.get('op'), __indexOf.call(intermine.Query.ATTRIBUTE_VALUE_OPS.concat(intermine.Query.REFERENCE_OPS), _ref) >= 0) {
            return this.newCon.con.has('value');
          }
          if (_ref1 = this.newCon.con.get('op'), __indexOf.call(intermine.Query.MULTIVALUE_OPS, _ref1) >= 0) {
            return this.newCon.con.has('values');
          }
          return true;
        } else {
          return false;
        }
      };

      ConstraintAdder.prototype.render = function() {
        var approver, browser;
        browser = $("<button type=\"button\" class=\"btn btn-chooser\" data-toggle=\"button\">\n    <i class=\"icon-sitemap\"></i>\n    Browse for column\n</button>");
        approver = $(this.make('button', {
          type: "button",
          "class": "btn btn-primary"
        }, "Choose"));
        this.$el.append(browser);
        this.$el.append(approver);
        approver.click(this.handleSubmission);
        browser.click(this.showTree);
        return this;
      };

      return ConstraintAdder;

    })(Backbone.View));
  });

  scope("intermine.query.tools", function(exporting) {
    var PANE_HTML, Step, TAB_HTML, ToolBar, Tools, Trail;
    TAB_HTML = _.template("<li>\n    <a href=\"#<%= ref %>\" data-toggle=\"tab\">\n        <%= title %>\n    </a>\n</li>");
    PANE_HTML = _.template("<div class=\"tab-pane\" id=\"<%= ref %>\"></div>");
    exporting(Tools = (function(_super) {

      __extends(Tools, _super);

      function Tools() {
        return Tools.__super__.constructor.apply(this, arguments);
      }

      Tools.prototype.className = "im-query-tools";

      Tools.prototype.initialize = function(query) {
        this.query = query;
      };

      Tools.prototype.render = function() {
        var $pane, actions, c, columns, conf, content, filters, tabs, view, _i, _j, _len, _len1;
        tabs = this.make("ul", {
          "class": "nav nav-tabs"
        });
        conf = [
          filters = {
            title: "Filters",
            ref: "filters",
            view: intermine.query.filters.Filters
          }, columns = {
            title: "Columns",
            ref: "columns",
            view: intermine.query.columns.Columns
          }, actions = {
            title: "Actions",
            ref: "actions",
            view: intermine.query.actions.Actions
          }
        ];
        for (_i = 0, _len = conf.length; _i < _len; _i++) {
          c = conf[_i];
          $(tabs).append(TAB_HTML(c));
        }
        this.$el.append(tabs);
        content = this.make("div", {
          "class": "tab-content"
        });
        for (_j = 0, _len1 = conf.length; _j < _len1; _j++) {
          c = conf[_j];
          $pane = $(PANE_HTML(c)).appendTo(content);
          view = new c.view(this.query);
          $pane.append(view.render().el);
        }
        $(content).find('.tab-pane').first().addClass("active");
        $(tabs).find("a").first().tab('show');
        this.$el.append(content);
        return this;
      };

      return Tools;

    })(Backbone.View));
    exporting(ToolBar = (function(_super) {

      __extends(ToolBar, _super);

      function ToolBar() {
        return ToolBar.__super__.constructor.apply(this, arguments);
      }

      ToolBar.prototype.className = "im-query-actionbar row-fluid";

      ToolBar.prototype.initialize = function(query) {
        this.query = query;
      };

      ToolBar.prototype.render = function() {
        var actions;
        actions = new intermine.query.actions.ActionBar(this.query);
        actions.render().$el.appendTo(this.el);
        return this;
      };

      return ToolBar;

    })(Backbone.View));
    Step = (function(_super) {

      __extends(Step, _super);

      function Step() {
        return Step.__super__.constructor.apply(this, arguments);
      }

      Step.prototype.className = 'im-step';

      Step.prototype.tagName = 'li';

      Step.prototype.initialize = function(opts) {
        var _this = this;
        Step.__super__.initialize.call(this, opts);
        this.model.on('got:count', function(count) {
          return _this.$('.im-step-count .count').text(intermine.utils.numToString(count, ',', 3));
        });
        this.model.on('is:current', function(isCurrent) {
          _this.$('.btn').toggleClass('btn-inverse', !isCurrent).attr({
            disabled: isCurrent
          });
          _this.$('.btn-main').text(isCurrent ? "Current State" : "Revert to this State");
          return _this.$('.btn i').toggleClass('icon-white', !isCurrent);
        });
        return this.model.on('remove', function() {
          return _this.remove();
        });
      };

      Step.prototype.events = {
        'click .icon-info-sign': 'showDetails',
        'click h4': 'toggleSection',
        'click .btn': 'revertToThisState'
      };

      Step.prototype.toggleSection = function(e) {
        e.stopPropagation();
        $(e.target).find('i').toggleClass("icon-chevron-right icon-chevron-down");
        return $(e.target).next().children().toggle();
      };

      Step.prototype.showDetails = function(e) {
        e.stopPropagation();
        return this.$('.im-step-details').toggle();
      };

      Step.prototype.revertToThisState = function(e) {
        this.model.trigger('revert', this.model);
        return this.$('.btn-small').tooltip('hide');
      };

      Step.prototype.sectionTempl = _.template("<div>\n    <h4>\n        <i class=\"icon-chevron-right\"></i>\n        <%= n %> <%= things %>\n    </h4>\n    <ul></ul>\n</div>");

      Step.prototype.render = function() {
        var addSection, c, clist, jlist, p, path, ps, q, style, toInfoLabel, toLabel, toPathLabel, toValLabel, v, vlist, _fn, _fn1, _fn2, _i, _j, _len, _len1, _ref, _ref1,
          _this = this;
        this.$el.append("<button class=\"btn btn-small im-state-revert\" disabled\n    title=\"Revert to this state\">\n    <i class=icon-undo></i>\n</button>\n<h3>" + (this.model.get('title')) + "</h3>\n<i class=\"icon-info-sign\"></i>\n</div>\n<span class=\"im-step-count\">\n    <span class=\"count\"></span> rows\n</span>\n<div class=\"im-step-details\">\n<div style=\"clear:both\"></div>");
        q = this.model.get('query');
        addSection = function(n, things) {
          return $(_this.sectionTempl({
            n: n,
            things: things
          })).appendTo(_this.$('.im-step-details')).find('ul');
        };
        toLabel = function(type, text) {
          return "<span class=\"label label-" + type + "\">" + text + "</span>";
        };
        toPathLabel = _.bind(toLabel, {}, 'path');
        toInfoLabel = _.bind(toLabel, {}, 'info');
        toValLabel = _.bind(toLabel, {}, 'value');
        this.$('.btn-small').tooltip({
          placement: 'right'
        });
        ps = (function() {
          var _i, _len, _ref, _results;
          _ref = q.views;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            v = _ref[_i];
            _results.push(q.getPathInfo(v));
          }
          return _results;
        })();
        vlist = addSection(ps.length, 'Columns');
        _fn = function(p) {
          var li;
          li = $('<li>');
          vlist.append(li);
          return p.getDisplayName(function(name) {
            return li.append(toPathLabel(name));
          });
        };
        for (_i = 0, _len = ps.length; _i < _len; _i++) {
          p = ps[_i];
          _fn(p);
        }
        clist = addSection(q.constraints.length, 'Filters');
        _ref = q.constraints;
        _fn1 = function(c) {
          var li;
          li = $('<li>');
          clist.append(li);
          return q.getPathInfo(c.path).getDisplayName(function(name) {
            li.append(toPathLabel(name));
            li.append(toInfoLabel(c.op));
            if (c.value != null) {
              return li.append(toValLabel(c.value));
            } else if (c.values != null) {
              return li.append(toValLabel(c.values.join(', ')));
            }
          });
        };
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          c = _ref[_j];
          _fn1(c);
        }
        jlist = addSection(_.size(q.joins), 'Joins');
        _ref1 = q.joins;
        _fn2 = function(path, style) {
          var li;
          li = $('<li>');
          jlist.append(li);
          return q.getPathInfo(path).getDisplayName(function(name) {
            li.append(toPathLabel(name));
            return li.append(toInfoLabel(style));
          });
        };
        for (path in _ref1) {
          style = _ref1[path];
          _fn2(path, style);
        }
        return this;
      };

      return Step;

    })(Backbone.View);
    return exporting(Trail = (function(_super) {

      __extends(Trail, _super);

      function Trail() {
        this.minumaximise = __bind(this.minumaximise, this);
        return Trail.__super__.constructor.apply(this, arguments);
      }

      Trail.prototype.className = "im-query-trail";

      Trail.prototype.tagName = "div";

      Trail.prototype.events = {
        'click a.details': 'minumaximise',
        'click a.shade': 'toggle',
        'click a.im-undo': 'undo'
      };

      Trail.prototype.toggle = function() {
        var _this = this;
        return this.$('.im-step').slideToggle('fast', function() {
          return _this.$el.toggleClass("toggled");
        });
      };

      Trail.prototype.minumaximise = function() {
        return this.$el.toggleClass("minimised");
      };

      Trail.prototype.startListening = function() {
        var _this = this;
        this.query.on("change:constraints", this.addStep("Changed Filters"));
        this.query.on("change:views", this.addStep("Changed Columns"));
        this.query.on('count:is', function(count) {
          return _this.states.last().trigger('got:count', count);
        });
        return this.query.on('undo', this.undo, this);
      };

      Trail.prototype.undo = function() {
        var newState;
        this.states.remove(this.states.last());
        newState = this.states.last();
        return newState.trigger('revert', newState);
      };

      Trail.prototype.initialize = function(query, display) {
        var _this = this;
        this.query = query;
        this.display = display;
        this.currentStep = 0;
        this.states = new Backbone.Collection();
        this.states.on('add', function(state) {
          return _this.$('.im-state-list').append(new Step({
            model: state
          }).render().el);
        });
        this.states.on('add remove', function() {
          _this.$('.im-trail-summary').text("query history: " + (_this.states.size()) + " states");
          return _this.$el.toggle(_this.states.size() > 1);
        });
        this.states.on('revert', function(state) {
          var num;
          _this.query = state.get('query').clone();
          num = state.get('stepNo');
          _this.display.loadQuery(_this.query);
          _this.startListening();
          _this.states.remove(_this.states.filter(function(s) {
            return s.get('stepNo') > num;
          }));
          return state.trigger('is:current', true);
        });
        return this.startListening();
      };

      Trail.prototype.addStep = function(title) {
        var _this = this;
        return function() {
          _this.states.each(function(state) {
            return state.trigger('is:current', false);
          });
          return _this.states.add({
            query: _this.query.clone(),
            title: title,
            stepNo: _this.currentStep++
          });
        };
      };

      Trail.prototype.render = function() {
        this.$el.append("<div class=\"btn-group\">\n  <a class=\"btn im-undo\" href=\"#\">\n    <i class=\"" + intermine.icons.Undo + "\"></i>\n    Undo\n  </a>\n  <a class=\"btn dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\">\n    <span class=\"caret\"></span>\n  </a>\n  <ul class=\"dropdown-menu im-state-list\">\n  </ul>\n</div>\n<div style=\"clear:both\"></div>");
        this.addStep('Original State')();
        return this;
      };

      return Trail;

    })(Backbone.View));
  });

  scope("intermine.css", {
    unsorted: "icon-sort",
    sortedASC: "icon-sort-up",
    sortedDESC: "icon-sort-down",
    headerIcon: "icon-white",
    headerIconRemove: "icon-remove-sign",
    headerIconHide: "icon-minus-sign"
  });

  scope('intermine.snippets.query', {
    UndoButton: '<button class="btn btn-primary pull-right"><i class="icon-undo"></i> undo</button>'
  });

  scope('intermine.messages.query', {
    CountSummary: _.template("<span class=\"hidden-phone\">\n <span class=\"im-only-widescreen\">Showing</span>\n <span>\n   <% if (last == 0) { %>\n       All\n   <% } else { %>\n       <%= first %> to <%= last %> of\n   <% } %>\n   <%= count %> <span class=\"visible-desktop\"><%= roots %></span>\n </span>\n</span>")
  });

  scope("intermine.query.results", function(exporting) {
    var NUMERIC_TYPES, Page, PageSizer, ResultsTable, Table;
    NUMERIC_TYPES = ["int", "Integer", "double", "Double", "float", "Float"];
    Page = (function() {

      function Page(start, size) {
        this.start = start;
        this.size = size;
      }

      Page.prototype.end = function() {
        return this.start + this.size;
      };

      Page.prototype.all = function() {
        return !this.size;
      };

      Page.prototype.toString = function() {
        return "Page(" + this.start + ", " + this.size + ")";
      };

      return Page;

    })();
    ResultsTable = (function(_super) {

      __extends(ResultsTable, _super);

      function ResultsTable() {
        this.addColumnHeaders = __bind(this.addColumnHeaders, this);

        this.handleError = __bind(this.handleError, this);

        this.appendRows = __bind(this.appendRows, this);
        return ResultsTable.__super__.constructor.apply(this, arguments);
      }

      ResultsTable.nextDirections = {
        ASC: "DESC",
        DESC: "ASC"
      };

      ResultsTable.prototype.className = "im-results-table table table-striped table-bordered";

      ResultsTable.prototype.tagName = "table";

      ResultsTable.prototype.attributes = {
        width: "100%",
        cellpadding: 0,
        border: 0,
        cellspacing: 0
      };

      ResultsTable.prototype.pageSize = 25;

      ResultsTable.prototype.pageStart = 0;

      ResultsTable.prototype.throbber = _.template("<tr class=\"im-table-throbber\">\n    <td colspan=\"<%= colcount %>\">\n        <h2>Requesting Data</h2>\n        <div class=\"progress progress-info progress-striped active\">\n            <div class=\"bar\" style=\"width: 100%\"></div>\n        </div>\n    </td>\n</tr>");

      ResultsTable.prototype.initialize = function(query, getData) {
        var _this = this;
        this.query = query;
        this.getData = getData;
        this.minimisedCols = {};
        return this.query.on("set:sortorder", function(oes) {
          _this.lastAction = 'resort';
          return _this.fill();
        });
      };

      ResultsTable.prototype.changePageSize = function(newSize) {
        this.pageSize = newSize;
        if (newSize === 0) {
          this.pageStart = 0;
        }
        return this.fill();
      };

      ResultsTable.prototype.render = function() {
        var promise;
        this.$el.empty();
        promise = this.fill();
        return promise.done(this.addColumnHeaders);
      };

      ResultsTable.prototype.goTo = function(start) {
        this.pageStart = parseInt(start);
        return this.fill();
      };

      ResultsTable.prototype.goToPage = function(page) {
        this.pageStart = page * this.pageSize;
        return this.fill();
      };

      ResultsTable.prototype.fill = function() {
        var promise, throbber,
          _this = this;
        throbber = $(this.throbber({
          colcount: this.query.views.length
        }));
        promise = this.getData(this.pageStart, this.pageSize);
        promise.then(this.appendRows, this.handleError).always(function() {
          return throbber.remove();
        });
        promise.done(function() {
          return _this.query.trigger("imtable:change:page", _this.pageStart, _this.pageSize);
        });
        return promise;
      };

      ResultsTable.prototype.handleEmptyTable = function() {
        var apology,
          _this = this;
        apology = $("<tr>\n    <td colspan=\"" + this.query.views.length + "\">\n        <div class=\"im-no-results alert alert-info\">\n            " + (this.query.__changed > 0 ? intermine.snippets.query.UndoButton : '') + "\n            <strong>NO RESULTS</strong>\n            This query returned 0 results.\n            <div style=\"clear:both\"></div>\n        </div>\n    </td>\n</tr>");
        return apology.appendTo(this.el).find('button').click(function(e) {
          return _this.query.trigger('undo');
        });
      };

      ResultsTable.prototype.appendRows = function(res) {
        var row, _i, _len, _ref;
        this.$("tbody > tr").remove();
        if (res.rows.length === 0) {
          this.handleEmptyTable();
        } else {
          _ref = res.rows;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            row = _ref[_i];
            this.appendRow(row);
          }
        }
        return this.query.trigger("table:filled");
      };

      ResultsTable.prototype.minimisedColumnPlaceholder = _.template("<td class=\"im-minimised-col\" style=\"width:<%= width %>px\">&hellip;</td>");

      ResultsTable.prototype.appendRow = function(row) {
        var cell, i, k, minWidth, minimised, tr, v, w, _fn, _i, _len,
          _this = this;
        tr = $("<tr>");
        minWidth = 10;
        minimised = (function() {
          var _ref, _results;
          _ref = this.minimisedCols;
          _results = [];
          for (k in _ref) {
            v = _ref[k];
            if (v) {
              _results.push(k);
            }
          }
          return _results;
        }).call(this);
        w = 1 / (row.length - minimised.length) * (this.$el.width() - (minWidth * minimised.length));
        _fn = function(cell, i) {
          if (_this.minimisedCols[i]) {
            return tr.append(_this.minimisedColumnPlaceholder({
              width: minWidth
            }));
          } else {
            return tr.append(cell.render().setWidth(w).$el);
          }
        };
        for (i = _i = 0, _len = row.length; _i < _len; i = ++_i) {
          cell = row[i];
          _fn(cell, i);
        }
        return tr.appendTo(this.el);
      };

      ResultsTable.prototype.errorTempl = _.template("<div class=\"alert alert-error\">\n    <h2>Oops!</h2>\n    <p><i><%- error %></i></p>\n</div>");

      ResultsTable.prototype.handleError = function(err, time) {
        var btn, mailto, notice, p;
        notice = $(this.errorTempl({
          error: err
        }));
        if (time != null) {
          notice.append("<p>Time: " + time + "</p>");
        }
        notice.append("<p>\n    This is most likely related to the query that was just run. If you have\n    time, please send us an email with details of this query to help us diagnose and\n    fix this bug.\n</p>");
        btn = $('<button class="btn btn-error">');
        notice.append(btn);
        p = $('<p style="display:none" class="well">');
        btn.text('show query');
        p.text(this.query.toXML());
        btn.click(function() {
          return p.slideToggle();
        });
        mailto = this.query.service.help + "?" + $.param({
          subject: "Error running embedded table query",
          body: "We encountered an error running a query from an\nembedded result table.\n\npage:       " + window.location + "\nservice:    " + this.query.service.root + "\nerror:      " + err + "\ndate-stamp: " + time + "\nquery:      " + (this.query.toXML())
        }, true);
        mailto = mailto.replace(/\+/g, '%20');
        notice.append("<a class=\"btn btn-primary pull-right\" href=\"mailto:" + mailto + "\">\n    Email the help-desk\n</a>");
        notice.append(p);
        return this.$el.append(notice);
      };

      ResultsTable.prototype.columnHeaderTempl = function(ctx) {
        return _.template(" \n<th>\n    <div class=\"navbar\">\n        <div class=\"im-th-buttons\">\n            <% if (sortable) { %>\n                <a href=\"#\" class=\"im-th-button im-col-sort-indicator\" title=\"sort this column\">\n                    <i class=\"icon-sorting " + intermine.css.unsorted + " " + intermine.css.headerIcon + "\"></i>\n                </a>\n            <% }; %>\n            <a href=\"#\" class=\"im-th-button im-col-remover\" title=\"remove this column\" data-view=\"<%= view %>\">\n                <i class=\"" + intermine.css.headerIconRemove + " " + intermine.css.headerIcon + "\"></i>\n            </a>\n            <a href=\"#\" class=\"im-th-button im-col-minumaximiser\" title=\"Toggle column\" data-col-idx=\"<%= i %>\">\n                <i class=\"" + intermine.css.headerIconHide + " " + intermine.css.headerIcon + "\"></i>\n            </a>\n            <div class=\"dropdown im-filter-summary\">\n                <a href=\"#\" class=\"im-th-button im-col-filters dropdown-toggle\"\n                     title=\"Filter by values in this column\"\n                     data-toggle=\"dropdown\" data-col-idx=\"<%= i %>\" >\n                    <i class=\"" + intermine.icons.Filter + " " + intermine.css.headerIcon + "\"></i>\n                </a>\n                <div class=\"dropdown-menu\">\n                    <div>Could not ititialise the filter summary.</div>\n                </div>\n            </div>\n            <div class=\"dropdown im-summary\">\n                <a href=\"#\" class=\"im-th-button summary-img dropdown-toggle\" title=\"column summary\"\n                    data-toggle=\"dropdown\" data-col-idx=\"<%= i %>\" >\n                    <i class=\"" + intermine.icons.Summary + " " + intermine.css.headerIcon + "\"></i>\n                </a>\n                <div class=\"dropdown-menu\">\n                    <div>Could not ititialise the column summary.</div>\n                </div>\n            </div>\n        </div>\n        <span class=\"im-col-title\">\n            <% _.each(titleParts, function(part, idx) { %>\n                <span class=\"im-title-part\"><%- part %></span>\n            <% }); %>\n        </span>\n    </div>\n</th>", ctx);
      };

      ResultsTable.prototype.buildColumnHeader = function(view, i, title, tr) {
        var cmd, cmds, direction, expandAll, filterSummary, isFormatted, minumaximiser, path, q, setDirectionClass, sortButton, sortable, summariser, th, titleParts,
          _this = this;
        q = this.query;
        titleParts = title.split(' > ');
        path = q.getPathInfo(view);
        direction = q.getSortDirection(view);
        sortable = !q.isOuterJoined(view);
        th = $(this.columnHeaderTempl({
          title: title,
          titleParts: titleParts,
          i: i,
          view: view,
          sortable: sortable
        }));
        tr.append(th);
        if (_.any(q.constraints, (function(c) {
          return !!c.path.match(view);
        }))) {
          th.addClass('im-has-constraint');
          th.find('.im-col-filters').attr({
            title: "" + (_.size(_.filter(q.constraints, function(c) {
              return !!c.path.match(view);
            }))) + " active filters"
          });
        }
        th.find('.im-th-button').tooltip({
          placement: "left"
        });
        sortButton = th.find('.icon-sorting');
        setDirectionClass = function(d) {
          sortButton.addClass(intermine.css.unsorted);
          sortButton.removeClass("" + intermine.css.sortedASC + " " + intermine.css.sortedDESC);
          if (d) {
            return sortButton.toggleClass("" + intermine.css.unsorted + " " + intermine.css['sorted' + d]);
          }
        };
        setDirectionClass(direction);
        this.query.on("set:sortorder", function() {
          var sd;
          sd = q.getSortDirection(view);
          return setDirectionClass(sd);
        });
        direction = ResultsTable.nextDirections[direction] || "ASC";
        sortButton.parent().click(function(e) {
          var $elem;
          $elem = $(this);
          q.orderBy([
            {
              path: view,
              direction: direction
            }
          ]);
          return direction = ResultsTable.nextDirections[direction];
        });
        minumaximiser = th.find('.im-col-minumaximiser');
        minumaximiser.click(function(e) {
          var isMinimised;
          minumaximiser.find('i').toggleClass("icon-minus-sign icon-plus-sign");
          isMinimised = _this.minimisedCols[i] = !_this.minimisedCols[i];
          th.find('.im-col-title').toggle(!isMinimised);
          return _this.fill();
        });
        isFormatted = path.isAttribute() && (path.end.name === 'id') && (intermine.results.getFormatter(q.model, path.getParent().getType()) != null);
        filterSummary = th.find('.im-col-filters');
        filterSummary.click(this.showFilterSummary(isFormatted ? path.getParent().toString() : view)).dropdown();
        summariser = th.find('.summary-img');
        if (path.isAttribute()) {
          if (isFormatted) {
            return summariser.click(this.showOuterJoinedColumnSummaries(path)).dropdown();
          } else {
            return summariser.click(this.showColumnSummary(path)).dropdown();
          }
        } else {
          summariser.click(this.showOuterJoinedColumnSummaries(path)).dropdown();
          expandAll = $("<a href=\"#\" class=\"im-th-button\" title=\"Expand/Collapse all subtables\">\n    <i class=\"icon-table icon-white\"></i>\n</a>");
          expandAll.tooltip({
            placement: 'left'
          });
          th.find('.im-th-buttons').prepend(expandAll);
          cmds = ['expand', 'collapse'];
          cmd = 0;
          this.query.on('subtable:expanded', function(node) {
            if (node.toString().match(path.toString())) {
              return cmd = 1;
            }
          });
          this.query.on('subtable:collapsed', function(node) {
            if (node.toString().match(path.toString())) {
              return cmd = 0;
            }
          });
          return expandAll.click(function(e) {
            e.stopPropagation();
            e.preventDefault();
            _this.query.trigger("" + cmds[cmd] + ":subtables", path);
            return cmd = (cmd + 1) % 2;
          });
        }
      };

      ResultsTable.prototype.addColumnHeaders = function(result) {
        var i, promise, q, thead, titles, tr, view, views, _fn, _i, _len,
          _this = this;
        thead = $("<thead>");
        tr = $("<tr>");
        thead.append(tr);
        q = this.query;
        if (result.results.length && _.has(result.results[0][0], 'column')) {
          views = result.results[0].map(function(row) {
            return row.column;
          });
          promise = new $.Deferred();
          titles = {};
          _.each(views, function(v) {
            var path, _ref;
            path = q.getPathInfo(v);
            if ((((_ref = path.end) != null ? _ref.name : void 0) === 'id') && (intermine.results.getFormatter(q.model, path.getParent().getType()) != null)) {
              path = path.getParent();
            }
            return path.getDisplayName(function(name) {
              titles[v] = name;
              if (_.size(titles) === views.length) {
                return promise.resolve(titles);
              }
            });
          });
          promise.done(function(titles) {
            var i, v, _i, _len, _results;
            _results = [];
            for (i = _i = 0, _len = views.length; _i < _len; i = ++_i) {
              v = views[i];
              _results.push(_this.buildColumnHeader(v, i, titles[v], tr));
            }
            return _results;
          });
        } else {
          views = q.views;
          _fn = function(view, i) {
            var title;
            title = result.columnHeaders[i].split(' > ').slice(1).join(" > ");
            return _this.buildColumnHeader(view, i, title, tr);
          };
          for (i = _i = 0, _len = views.length; _i < _len; i = ++_i) {
            view = views[i];
            _fn(view, i);
          }
        }
        return thead.appendTo(this.el);
      };

      ResultsTable.prototype.showOuterJoinedColumnSummaries = function(path) {
        var _this = this;
        return function(e) {
          var $el, summ;
          $el = jQuery(e.target).closest('.summary-img');
          if (!$el.parent().hasClass('open')) {
            summ = new intermine.query.results.OuterJoinDropDown(path, _this.query);
            $el.siblings('.dropdown-menu').html(summ.render().el);
          }
          return false;
        };
      };

      ResultsTable.prototype.checkHowFarOver = function(e) {
        var bounds, thb;
        thb = $(e.target).closest('.im-th-button');
        bounds = thb.closest('.im-table-container');
        if ((thb.offset().left + 350) >= (bounds.offset().left + bounds.width())) {
          return thb.closest('th').addClass('too-far-over');
        }
      };

      ResultsTable.prototype.showFilterSummary = function(path) {
        var _this = this;
        return function(e) {
          var $el, summ;
          _this.checkHowFarOver(e);
          $el = jQuery(e.target).closest('.im-col-filters');
          if (!$el.parent().hasClass('open')) {
            summ = new intermine.query.filters.SingleColumnConstraints(_this.query, path);
            $el.siblings('.dropdown-menu').html(summ.render().el);
          }
          return false;
        };
      };

      ResultsTable.prototype.showColumnSummary = function(path) {
        var _this = this;
        return function(e) {
          var $el, summ, view;
          _this.checkHowFarOver(e);
          $el = jQuery(e.target).closest('.summary-img');
          view = path.toString();
          if (!view) {
            e.stopPropagation();
            e.preventDefault();
          } else if (!$el.parent().hasClass("open")) {
            summ = new intermine.query.results.DropDownColumnSummary(view, _this.query);
            $el.siblings('.dropdown-menu').html(summ.render().el);
          }
          return false;
        };
      };

      return ResultsTable;

    })(Backbone.View);
    PageSizer = (function(_super) {

      __extends(PageSizer, _super);

      function PageSizer() {
        return PageSizer.__super__.constructor.apply(this, arguments);
      }

      PageSizer.prototype.tagName = 'form';

      PageSizer.prototype.className = "im-page-sizer form-horizontal";

      PageSizer.prototype.sizes = [[10], [25], [50], [100], [250]];

      PageSizer.prototype.initialize = function(query, pageSize) {
        var _this = this;
        this.query = query;
        this.pageSize = pageSize;
        if (this.pageSize != null) {
          if (!_.include(this.sizes.map(function(s) {
            return s[0];
          }), this.pageSize)) {
            this.sizes.unshift([this.pageSize, this.pageSize]);
          }
        } else {
          this.pageSize = this.sizes[0][0];
        }
        return this.query.on('page-size:revert', function(size) {
          return _this.$('select').val(size);
        });
      };

      PageSizer.prototype.render = function() {
        var ps, select, _i, _len, _ref,
          _this = this;
        this.$el.append("<label>\n    <span class=\"im-only-widescreen\">Rows per page:</span>\n    <select class=\"span1\" title=\"Rows per page\">\n    </select>\n</label>");
        select = this.$('select');
        _ref = this.sizes;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          ps = _ref[_i];
          select.append(this.make('option', {
            value: ps[0],
            selected: ps[0] === this.pageSize
          }, ps[1] || ps[0]));
        }
        select.change(function(e) {
          return _this.query.trigger("page-size:selected", parseInt(select.val()));
        });
        return this;
      };

      return PageSizer;

    })(Backbone.View);
    return exporting(Table = (function(_super) {

      __extends(Table, _super);

      function Table() {
        this.updatePageDisplay = __bind(this.updatePageDisplay, this);

        this.removeColumn = __bind(this.removeColumn, this);

        this.removeOverlay = __bind(this.removeOverlay, this);

        this.overlayTable = __bind(this.overlayTable, this);

        this.getRowData = __bind(this.getRowData, this);

        this.showError = __bind(this.showError, this);

        this.handlePageSizeSelection = __bind(this.handlePageSizeSelection, this);

        this.refresh = __bind(this.refresh, this);

        this.onDraw = __bind(this.onDraw, this);
        return Table.__super__.constructor.apply(this, arguments);
      }

      Table.prototype.className = "im-table-container";

      Table.prototype.events = {
        'click .im-col-remover': 'removeColumn',
        'submit .im-page-form': 'pageFormSubmit',
        'click .im-pagination-button': 'pageButtonClick'
      };

      Table.prototype.paginationTempl = _.template("<div class=\"pagination pagination-right\">\n    <ul>\n        <li title=\"Go to start\">\n            <a class=\"im-pagination-button\" data-goto=start>&#x21e4;</a>\n        </li>\n        <li title=\"Go back five pages\" class=\"visible-desktop\">\n            <a class=\"im-pagination-button\" data-goto=fast-rewind>&#x219e;</a>\n        </li>\n        <li title=\"Go to previous page\">\n            <a class=\"im-pagination-button\" data-goto=prev>&larr;</a>\n        </li>\n        <li class=\"im-current-page\">\n            <a data-goto=here  href=\"#\">&hellip;</a>\n            <form class=\"im-page-form input-append form form-horizontal\" style=\"display:none;\">\n            <div class=\"control-group\"></div>\n        </form>\n        </li>\n        <li title=\"Go to next page\">\n            <a class=\"im-pagination-button\" data-goto=next>&rarr;</a>\n        </li>\n        <li title=\"Go forward five pages\" class=\"visible-desktop\">\n            <a class=\"im-pagination-button\" data-goto=fast-forward>&#x21a0;</a>\n        </li>\n        <li title=\"Go to last page\">\n            <a class=\"im-pagination-button\" data-goto=end>&#x21e5;</a>\n        </li>\n    </ul>\n</div>");

      Table.prototype.reallyDialogue = "<div class=\"modal fade im-page-size-sanity-check\">\n    <div class=\"modal-header\">\n        <h3>\n            Are you sure?\n        </h3>\n    </div>\n    <div class=\"modal-body\">\n        <p>\n            You have requested a very large table size. Your\n            browser may struggle to render such a large table,\n            and the page will probably become unresponsive. It\n            will be very difficult for you to read the whole table\n            in the page. We suggest the following alternatives:\n        </p>\n        <ul>\n            <li>\n                <p>\n                    If you are looking for something specific, you can use the\n                    <span class=\"label label-info\">filtering tools</span>\n                    to narrow down the result set. Then you \n                    might be able to fit the items you are interested in in a\n                    single page.\n                </p>\n                <button class=\"btn im-alternative-action\" data-event=\"add-filter-dialogue:please\">\n                    <i class=\"" + intermine.icons.Filter + "\"></i>\n                    Add a new filter.\n                </button>\n            </li>\n            <li>\n                <p>\n                    If you want to see all the data, you can page \n                    <span class=\"label label-info\">\n                        <i class=\"icon-chevron-left\"></i>\n                        backwards\n                    </span>\n                    and \n                    <span class=\"label label-info\">\n                        forwards\n                        <i class=\"icon-chevron-right\"></i>\n                    </span>\n                    through the results.\n                </p>\n                <div class=\"btn-group\">\n                    <a class=\"btn im-alternative-action\" data-event=\"page:backwards\" href=\"#\">\n                        <i class=\"icon-chevron-left\"></i>\n                        go one page back\n                    </a>\n                    <a class=\"btn im-alternative-action\" data-event=\"page:forwards\" href=\"#\">\n                        go one page forward\n                        <i class=\"icon-chevron-right\"></i>\n                    </a>\n                </div>\n            </li>\n            <li>\n                <p>\n                    If you want to get and save the results, we suggest\n                    <span class=\"label label-info\">downloading</span>\n                    the results in a format that suits you. \n                <p>\n                <button class=\"btn im-alternative-action\" data-event=\"download-menu:open\">\n                    <i class=\"" + intermine.icons.Export + "\"></i>\n                    Open the download menu.\n                </buttn>\n            </li>\n        </ul>\n    </div>\n    <div class=\"modal-footer\">\n        <button class=\"btn btn-primary pull-right\">\n            I know what I'm doing.\n        </button>\n        <button class=\"btn pull-left im-alternative-action\">\n            OK, no worries then.\n        </button>\n    </div>\n</div>";

      Table.prototype.onDraw = function() {
        if (this.__selecting) {
          this.query.trigger("start:list-creation");
        }
        return this.drawn = true;
      };

      Table.prototype.refresh = function() {
        var _ref;
        this.query.__changed = (this.query.__changed || 0) + 1;
        if ((_ref = this.table) != null) {
          _ref.remove();
        }
        this.drawn = false;
        return this.render();
      };

      Table.prototype.initialize = function(query, selector) {
        var _this = this;
        this.query = query;
        this.cache = {};
        this.itemModels = {};
        this._pipe_factor = 10;
        this.$parent = jQuery(selector);
        this.__selecting = false;
        this.visibleViews = this.query.views.slice();
        this.query.on("change:views", function() {
          _this.visibleViews = _this.query.views.slice();
          return _this.refresh();
        });
        this.query.on("start:list-creation", function() {
          return _this.__selecting = true;
        });
        this.query.on("stop:list-creation", function() {
          return _this.__selecting = false;
        });
        this.query.on("change:constraints", this.refresh);
        this.query.on("change:joins", this.refresh);
        this.query.on("table:filled", this.onDraw);
        this.query.on('page:forwards', function() {
          return _this.goForward(1);
        });
        this.query.on('page:backwards', function() {
          return _this.goBack(1);
        });
        this.query.on("page-size:selected", this.handlePageSizeSelection);
        return this.query.on("add-filter-dialogue:please", function() {
          var dialogue;
          dialogue = new intermine.filters.NewFilterDialogue(_this.query);
          _this.$el.append(dialogue.el);
          return dialogue.render().openDialogue();
        });
      };

      Table.prototype.pageSizeFeasibilityThreshold = 250;

      Table.prototype.aboveSizeThreshold = function(size) {
        var total;
        if (size >= this.pageSizeFeasibilityThreshold) {
          return true;
        }
        if (size === 0) {
          total = this.cache.lastResult.iTotalRecords;
          return total >= this.pageSizeFeasibilityThreshold;
        }
        return false;
      };

      Table.prototype.handlePageSizeSelection = function(size) {
        var $really,
          _this = this;
        if (this.aboveSizeThreshold(size)) {
          $really = $(this.reallyDialogue);
          $really.find('.btn-primary').click(function() {
            return _this.table.changePageSize(size);
          });
          $really.find('.btn').click(function() {
            return $really.modal('hide');
          });
          $really.find('.im-alternative-action').click(function(e) {
            if ($(e.target).data('event')) {
              _this.query.trigger($(e.target).data('event'));
            }
            return _this.query.trigger('page-size:revert', _this.table.pageSize);
          });
          $really.on('hidden', function() {
            return $really.remove();
          });
          return $really.appendTo(this.el).modal().modal('show');
        } else {
          return this.table.changePageSize(size);
        }
      };

      Table.prototype.adjustSortOrder = function(params) {
        var i, noOfSortColumns, viewIndices;
        viewIndices = (function() {
          var _i, _ref, _results;
          _results = [];
          for (i = _i = 0, _ref = intermine.utils.getParameter(params, "iColumns"); 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
            _results.push(intermine.utils.getParameter(params, "mDataProp_" + i));
          }
          return _results;
        })();
        noOfSortColumns = intermine.utils.getParameter(params, "iSortingCols");
        if (noOfSortColumns) {
          return this.query.orderBy((function() {
            var _i, _results,
              _this = this;
            _results = [];
            for (i = _i = 0; 0 <= noOfSortColumns ? _i < noOfSortColumns : _i > noOfSortColumns; i = 0 <= noOfSortColumns ? ++_i : --_i) {
              _results.push((function(i) {
                var displayed, so;
                displayed = intermine.utils.getParameter(params, "iSortCol_" + i);
                so = {
                  path: _this.query.views[viewIndices[displayed]],
                  direction: intermine.utils.getParameter(params, "sSortDir_" + i)
                };
                return so;
              })(i));
            }
            return _results;
          }).call(this));
        }
      };

      Table.prototype.showError = function(resp) {
        var data, _ref, _ref1;
        try {
          data = JSON.parse(resp.responseText);
          return (_ref = this.table) != null ? _ref.handleError(data.error, data.executionTime) : void 0;
        } catch (err) {
          return (_ref1 = this.table) != null ? _ref1.handleError("Internal error", new Date().toString()) : void 0;
        }
      };

      Table.prototype.getRowData = function(start, size) {
        var end, freshness, isOutOfRange, isStale, page, promise, req,
          _this = this;
        end = start + size;
        isOutOfRange = false;
        freshness = this.query.getSorting() + this.query.getConstraintXML() + this.query.views.join();
        isStale = freshness !== this.cache.freshness;
        if (isStale) {
          this.cache = {};
        } else {
          isOutOfRange = this.cache.lowerBound < 0 || start < this.cache.lowerBound || end > this.cache.upperBound || size <= 0;
        }
        promise = new jQuery.Deferred();
        if (isStale || isOutOfRange) {
          page = this.getPage(start, size);
          this.overlayTable();
          req = this.query[this.fetchMethod]({
            start: page.start,
            size: page.size
          }, function(rows, rs) {
            _this.addRowsToCache(page, rs);
            return _this.cache.freshness = freshness;
          });
          req.fail(this.showError);
          req.done(function() {
            return promise.resolve(_this.serveResultsFromCache(start, size));
          });
          req.always(this.removeOverlay);
        } else {
          promise.resolve(this.serveResultsFromCache(start, size));
        }
        return promise;
      };

      Table.prototype.overlayTable = function() {
        var elOffset, tableOffset,
          _this = this;
        if (!(this.table && this.drawn)) {
          return;
        }
        elOffset = this.$el.offset();
        tableOffset = this.table.$el.offset();
        jQuery('.im-table-overlay').remove();
        this.overlay = jQuery(this.make("div", {
          "class": "im-table-overlay discrete"
        }));
        this.overlay.css({
          top: elOffset.top,
          left: elOffset.left,
          width: this.table.$el.outerWidth(true),
          height: (tableOffset.top - elOffset.top) + this.table.$el.outerHeight()
        });
        this.overlay.append(this.make("h1", {}, "Requesting data..."));
        this.overlay.find("h1").css({
          top: (this.table.$el.height() / 2) + "px",
          left: (this.table.$el.width() / 4) + "px"
        });
        this.overlay.appendTo('body');
        return _.delay((function() {
          return _this.overlay.removeClass("discrete");
        }), 100);
      };

      Table.prototype.removeOverlay = function() {
        var _ref;
        return (_ref = this.overlay) != null ? _ref.remove() : void 0;
      };

      Table.prototype.getPage = function(start, size) {
        var page;
        page = new Page(start, size);
        if (!this.cache.lastResult) {
          page.size *= this._pipe_factor;
          return page;
        }
        if (start < this.cache.lowerBound) {
          page.start = Math.max(0, start - (size * this._pipe_factor));
        }
        if (size > 0) {
          page.size *= this._pipe_factor;
        } else {
          page.size = '';
        }
        if (page.size && (page.end() < this.cache.lowerBound)) {
          if ((this.cache.lowerBound - page.end()) > (page.size * 10)) {
            this.cache = {};
            page.size *= 2;
            return page;
          } else {
            page.size = this.cache.lowerBound - page.start;
          }
        }
        if (this.cache.upperBound < page.start) {
          if ((page.start - this.cache.upperBound) > (page.size * 10)) {
            this.cache = {};
            page.size *= 2;
            page.start = Math.max(0, page.start - (size * this._pipe_factor));
            return page;
          }
          if (page.size) {
            page.size += page.start - this.cache.upperBound;
          }
          page.start = this.cache.upperBound;
        }
        return page;
      };

      Table.prototype.addRowsToCache = function(page, result) {
        var merged, rows;
        if (!this.cache.lastResult) {
          this.cache.lastResult = result;
          this.cache.lowerBound = result.start;
          return this.cache.upperBound = page.end();
        } else {
          rows = result.results;
          merged = this.cache.lastResult.results.slice();
          if (page.start < this.cache.lowerBound) {
            merged = rows.concat(merged.slice(page.end() - this.cache.lowerBound));
          }
          if (this.cache.upperBound < page.end() || page.all()) {
            merged = merged.slice(0, page.start - this.cache.lowerBound).concat(rows);
          }
          this.cache.lowerBound = Math.min(this.cache.lowerBound, page.start);
          this.cache.upperBound = this.cache.lowerBound + merged.length;
          return this.cache.lastResult.results = merged;
        }
      };

      Table.prototype.updateSummary = function(start, size, result) {
        var html, summary;
        summary = this.$('.im-table-summary');
        html = intermine.messages.query.CountSummary({
          first: start + 1,
          last: size === 0 ? 0 : Math.min(start + size, result.iTotalRecords),
          count: intermine.utils.numToString(result.iTotalRecords, ",", 3),
          roots: "rows"
        });
        summary.html(html);
        return this.query.trigger('count:is', result.iTotalRecords);
      };

      Table.prototype.serveResultsFromCache = function(start, size) {
        var base, fields, makeCell, result, v,
          _this = this;
        base = this.query.service.root.replace(/\/service\/?$/, "");
        result = jQuery.extend(true, {}, this.cache.lastResult);
        result.results.splice(0, start - this.cache.lowerBound);
        if (size > 0) {
          result.results.splice(size, result.results.length);
        }
        this.updateSummary(start, size, result);
        fields = (function() {
          var _i, _len, _ref, _results;
          _ref = result.views;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            v = _ref[_i];
            _results.push([this.query.getPathInfo(v).getParent(), v.replace(/^.*\./, "")]);
          }
          return _results;
        }).call(this);
        makeCell = function(obj) {
          var args, field, model, node, _base, _name;
          if (_.has(obj, 'rows')) {
            return new intermine.results.table.SubTable(_this.query, makeCell, obj);
          } else {
            node = _this.query.getPathInfo(obj.column).getParent();
            field = obj.column.replace(/^.*\./, '');
            model = obj.id != null ? (_base = _this.itemModels)[_name = obj.id] || (_base[_name] = new intermine.model.IMObject(_this.query, obj, field, base)) : !(obj["class"] != null) ? new intermine.model.NullObject(_this.query, field) : new intermine.model.FPObject(_this.query, obj, field, node.getType().name);
            model.merge(obj, field);
            args = {
              model: model,
              node: node,
              field: field
            };
            args.query = _this.query;
            return new intermine.results.table.Cell(args);
          }
        };
        result.rows = result.results.map(function(row) {
          return row.map(function(cell, idx) {
            var field, imo, _base, _name;
            if (_.has(cell, 'column')) {
              return makeCell(cell);
            } else if ((cell != null ? cell.id : void 0) != null) {
              field = fields[idx];
              imo = (_base = _this.itemModels)[_name = cell.id] || (_base[_name] = new intermine.model.IMObject(_this.query, cell, field[1], base));
              imo.merge(cell, field[1]);
              return new intermine.results.table.Cell({
                model: imo,
                node: field[0],
                field: field[1],
                query: _this.query
              });
            } else if ((cell != null ? cell.value : void 0) != null) {
              return new intermine.results.table.Cell({
                model: new intermine.model.FPObject(_this.query, cell, field[1]),
                query: _this.query,
                field: field[1]
              });
            } else {
              return new intermine.results.table.NullCell({
                query: _this.query
              });
            }
          });
        });
        return result;
      };

      Table.prototype.tableAttrs = {
        "class": "table table-striped table-bordered",
        width: "100%",
        cellpadding: 0,
        border: 0,
        cellspacing: 0
      };

      Table.prototype.render = function() {
        var tel;
        this.$el.empty();
        tel = this.make("table", this.tableAttrs);
        this.$el.append(tel);
        jQuery(tel).append("<h2>Building table</h2>\n<div class=\"progress progress-striped active progress-info\">\n    <div class=\"bar\" style=\"width: 100%\"></div>\n</div>");
        return this.query.service.fetchVersion(this.doRender(tel)).fail(this.onSetupError(tel));
      };

      Table.prototype.doRender = function(tel) {
        var _this = this;
        return function(version) {
          var path, setupParams;
          _this.fetchMethod = version >= 10 ? 'tableRows' : 'table';
          path = "query/results";
          setupParams = {
            format: "jsontable",
            query: _this.query.toXML(),
            token: _this.query.service.token
          };
          _this.$el.appendTo(_this.$parent);
          _this.query.service.makeRequest(path, setupParams, _this.onSetupSuccess(tel), "POST").fail(_this.onSetupError(tel));
          return _this;
        };
      };

      Table.prototype.removeColumn = function(e) {
        var $el, unwanted, v, view;
        e.stopPropagation();
        e.preventDefault();
        $el = jQuery(e.target).closest('.im-col-remover');
        $el.tooltip("hide");
        view = $el.data("view");
        unwanted = (function() {
          var _i, _len, _ref, _results;
          _ref = this.query.views;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            v = _ref[_i];
            if (v.match(view)) {
              _results.push(v);
            }
          }
          return _results;
        }).call(this);
        this.query.removeFromSelect(unwanted);
        return false;
      };

      Table.prototype.horizontalScroller = "<div class=\"scroll-bar-wrap well\">\n    <div class=\"scroll-bar-containment\">\n        <div class=\"scroll-bar alert-info alert\"></div>\n    </div>\n</div>";

      Table.prototype.onSetupSuccess = function(telem) {
        var _this = this;
        return function(result) {
          var $pagination, $scrollwrapper, $telem, $widgets, currentPageButton, currentPos, managementGroup, pageSizer, scrollbar;
          $telem = jQuery(telem).empty();
          $widgets = $('<div>').insertBefore(telem);
          _this.table = new ResultsTable(_this.query, _this.getRowData);
          _this.table.setElement(telem);
          if (_this.pageSize != null) {
            _this.table.pageSize = _this.pageSize;
          }
          if (_this.pageStart != null) {
            _this.table.pageStart = _this.pageStart;
          }
          _this.table.render();
          _this.query.on("imtable:change:page", _this.updatePageDisplay);
          pageSizer = new PageSizer(_this.query, _this.pageSize);
          pageSizer.render().$el.appendTo($widgets);
          $pagination = $(_this.paginationTempl()).appendTo($widgets);
          $pagination.find('li').tooltip({
            placement: "left"
          });
          $widgets.append("<span class=\"im-table-summary\"></div>");
          currentPageButton = $pagination.find(".im-current-page a").click(function() {
            var total;
            total = _this.cache.lastResult.iTotalRecords;
            if (_this.table.pageSize >= total) {
              return false;
            }
            currentPageButton.hide();
            return $pagination.find('form').show();
          });
          managementGroup = new intermine.query.tools.ManagementTools(_this.query);
          managementGroup.render().$el.appendTo($widgets);
          if (_this.bar === 'horizontal') {
            $scrollwrapper = $(_this.horizontalScroller).appendTo($widgets);
            scrollbar = _this.$('.scroll-bar');
            currentPos = 0;
            scrollbar.draggable({
              axis: "x",
              containment: "parent",
              stop: function(event, ui) {
                scrollbar.removeClass("scrolling");
                scrollbar.tooltip("hide");
                return _this.table.goTo(currentPos);
              },
              start: function() {
                return $(this).addClass("scrolling");
              },
              drag: function(event, ui) {
                var left, total;
                scrollbar.tooltip("show");
                left = ui.position.left;
                total = ui.helper.closest('.scroll-bar-wrap').width();
                return currentPos = _this.cache.lastResult.iTotalRecords * left / total;
              }
            });
            scrollbar.css({
              position: "absolute"
            }).parent().css({
              position: "relative"
            });
            scrollbar.tooltip({
              trigger: "manual",
              title: function() {
                return "" + ((currentPos + 1).toFixed()) + " ... " + ((currentPos + _this.table.pageSize).toFixed());
              }
            });
          }
          return $widgets.append("<div style=\"clear:both\"></div>");
        };
      };

      Table.prototype.getCurrentPage = function() {
        if (this.table.pageSize) {
          return Math.floor(this.table.pageStart / this.table.pageSize);
        } else {
          return 0;
        }
      };

      Table.prototype.getMaxPage = function() {
        var total;
        total = this.cache.lastResult.iTotalRecords;
        return Math.floor(total / this.table.pageSize);
      };

      Table.prototype.goBack = function(pages) {
        return this.table.goTo(Math.max(0, this.table.pageStart - (pages * this.table.pageSize)));
      };

      Table.prototype.goForward = function(pages) {
        return this.table.goTo(Math.min(this.getMaxPage() * this.table.pageSize, this.table.pageStart + (pages * this.table.pageSize)));
      };

      Table.prototype.pageButtonClick = function(e) {
        var $elem;
        $elem = $(e.target);
        if (!$elem.parent().is('.active')) {
          switch ($elem.data("goto")) {
            case "start":
              return this.table.goTo(0);
            case "prev":
              return this.goBack(1);
            case "fast-rewind":
              return this.goBack(5);
            case "next":
              return this.goForward(1);
            case "fast-forward":
              return this.goForward(5);
            case "end":
              return this.table.goTo(this.getMaxPage() * this.table.pageSize);
          }
        }
      };

      Table.prototype.updatePageDisplay = function(start, size) {
        var buttons, centre, cg, handle, maxPage, overhang, p, pageForm, pageSelector, proportion, scaled, scrollbar, tbl, total, totalWidth, unit, _i, _results;
        total = this.cache.lastResult.iTotalRecords;
        if (size === 0) {
          size = total;
        }
        scrollbar = this.$('.scroll-bar-wrap');
        if (scrollbar.length) {
          totalWidth = scrollbar.width();
          proportion = size / total;
          scrollbar.toggle(size < total);
          unit = totalWidth / total;
          scaled = Math.max(totalWidth * proportion, 20);
          overhang = size - ((total - (size * Math.floor(total / size))) % size);
          scrollbar.find('.scroll-bar-containment').css({
            width: totalWidth + (unit * overhang)
          });
          handle = scrollbar.find('.scroll-bar').css({
            width: scaled
          });
          handle.animate({
            left: unit * start
          });
        }
        tbl = this.table;
        buttons = this.$('.im-pagination-button');
        buttons.each(function() {
          var $elem, isActive, li;
          $elem = $(this);
          li = $elem.parent();
          isActive = (function() {
            switch ($elem.data("goto")) {
              case "start":
              case 'prev':
                return start === 0;
              case 'fast-rewind':
                return start === 0;
              case "next":
              case 'end':
                return start + size >= total;
              case "fast-forward":
                return start + (5 * size) >= total;
            }
          })();
          return li.toggleClass('active', isActive);
        });
        centre = this.$('.im-current-page');
        centre.find('a').text("p. " + (this.getCurrentPage() + 1));
        centre.toggleClass("active", size >= total);
        pageForm = centre.find('form');
        cg = pageForm.find('.control-group').empty().removeClass('error');
        maxPage = this.getMaxPage();
        if (maxPage <= 100) {
          pageSelector = $('<select>').appendTo(cg);
          pageSelector.val(this.getCurrentPage());
          pageSelector.change(function(e) {
            e.stopPropagation();
            e.preventDefault();
            tbl.goToPage(parseInt(pageSelector.val()));
            centre.find('a').show();
            return pageForm.hide();
          });
          _results = [];
          for (p = _i = 1; 1 <= maxPage ? _i <= maxPage : _i >= maxPage; p = 1 <= maxPage ? ++_i : --_i) {
            _results.push(pageSelector.append("<option value=\"" + (p - 1) + "\">p. " + p + "</option>"));
          }
          return _results;
        } else {
          cg.append("<input type=text placeholder=\"go to page...\">");
          return cg.append("<button class=\"btn\" type=\"submit\">go</button>");
        }
      };

      Table.prototype.pageFormSubmit = function(e) {
        var centre, destination, inp, newSelectorVal, pageForm;
        e.stopPropagation();
        e.preventDefault();
        pageForm = this.$('.im-page-form');
        centre = this.$('.im-current-page');
        inp = pageForm.find('input');
        if (inp.size()) {
          destination = inp.val().replace(/\s*/g, "");
        }
        if (destination.match(/^\d+$/)) {
          newSelectorVal = Math.min(this.getMaxPage(), Math.max(parseInt(destination) - 1, 0));
          this.table.goToPage(newSelectorVal);
          centre.find('a').show();
          return pageForm.hide();
        } else {
          pageForm.find('.control-group').addClass('error');
          inp.val('');
          return inp.attr({
            placeholder: "1 .. " + (this.getMaxPage())
          });
        }
      };

      Table.prototype.onSetupError = function(telem) {
        var _this = this;
        return function(xhr) {
          var explanation, issue, notice, part, parts;
          $(telem).empty();
          console.log("SETUP FAILURE", arguments);
          notice = _this.make("div", {
            "class": "alert alert-error"
          });
          explanation = "Could not load the data-table. The server may be down, or \nincorrectly configured, or we could be pointed at an invalid URL.";
          if (xhr != null ? xhr.responseText : void 0) {
            explanation = (typeof JSON !== "undefined" && JSON !== null ? JSON.parse(xhr.responseText).error : void 0) || explanation;
            parts = _((function() {
              var _i, _len, _ref, _results;
              _ref = explanation.split("\n");
              _results = [];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                part = _ref[_i];
                if (part != null) {
                  _results.push(part);
                }
              }
              return _results;
            })()).groupBy(function(p, i) {
              return i > 0;
            });
            explanation = [
              _this.make("span", {}, parts[false] + ""), _this.make("ul", {}, (function() {
                var _i, _len, _ref, _results;
                _ref = parts[true];
                _results = [];
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                  issue = _ref[_i];
                  _results.push(this.make("li", {}, issue));
                }
                return _results;
              }).call(_this))
            ];
          }
          return $(notice).append(_this.make("a", {
            "class": "close",
            "data-dismiss": "alert"
          }, "close")).append(_this.make("strong", {}, "Ooops...! ")).append(explanation).appendTo(telem);
        };
      };

      return Table;

    })(Backbone.View));
  });

  scope('intermine.filters', function(exporting) {
    var NewFilterDialogue;
    return exporting(NewFilterDialogue = (function(_super) {

      __extends(NewFilterDialogue, _super);

      function NewFilterDialogue() {
        return NewFilterDialogue.__super__.constructor.apply(this, arguments);
      }

      NewFilterDialogue.prototype.tagName = "div";

      NewFilterDialogue.prototype.className = "im-constraint-dialogue modal fade";

      NewFilterDialogue.prototype.html = "<div class=\"modal-header\">\n    <a href=\"#\" class=\"close pull-right im-close\">close</a>\n    <h3>Add New Filter</h3>\n</div>\n<div class=\"modal-body\">\n</div>\n<div class=\"modal-footer\">\n    <button class=\"disabled btn btn-primary pull-right im-add-constraint\">\n        Add Filter\n    </button>\n    <button class=\"btn im-close pull-left\">\n        Cancel\n    </button>\n</div>";

      NewFilterDialogue.prototype.initialize = function(query) {
        var _this = this;
        this.query = query;
        this.query.on('change:constraints', this.closeDialogue, this);
        return this.query.on('editing-constraint', function() {
          return _this.$('.im-add-constraint').removeClass('disabled');
        });
      };

      NewFilterDialogue.prototype.events = {
        'click .im-close': 'closeDialogue',
        'hidden': 'remove',
        'click .im-add-constraint': 'addConstraint'
      };

      NewFilterDialogue.prototype.closeDialogue = function(e) {
        return this.$el.modal('hide');
      };

      NewFilterDialogue.prototype.openDialogue = function() {
        return this.$el.modal().modal('show');
      };

      NewFilterDialogue.prototype.addConstraint = function() {
        if (this.conAdder.isValid()) {
          this.$el.modal('hide');
          return this.$('.im-constraint.new .btn-primary').click();
        } else {
          return this.$('.im-constraint.new').addClass('error');
        }
      };

      NewFilterDialogue.prototype.render = function() {
        this.$el.append(this.html);
        this.conAdder = new intermine.query.ConstraintAdder(this.query);
        this.$el.find('.modal-body').append(this.conAdder.render().el);
        return this;
      };

      return NewFilterDialogue;

    })(Backbone.View));
  });

  scope("intermine.query.results", function(exporting) {
    var DropDownColumnSummary, OuterJoinDropDown, SummaryHeading;
    exporting(OuterJoinDropDown = (function(_super) {

      __extends(OuterJoinDropDown, _super);

      function OuterJoinDropDown() {
        return OuterJoinDropDown.__super__.constructor.apply(this, arguments);
      }

      OuterJoinDropDown.prototype.className = "im-summary-selector";

      OuterJoinDropDown.prototype.tagName = 'ul';

      OuterJoinDropDown.prototype.initialize = function(path, query) {
        this.path = path;
        this.query = query;
      };

      OuterJoinDropDown.prototype.render = function() {
        var a, as, name, parent, v, vs, _fn, _i, _len,
          _this = this;
        vs = [];
        if (this.path.isAttribute()) {
          parent = this.path.getParent();
          as = (function() {
            var _ref, _results;
            _ref = parent.getEndClass().attributes;
            _results = [];
            for (name in _ref) {
              a = _ref[name];
              _results.push(name);
            }
            return _results;
          })();
          if (!intermine.options.ShowId) {
            as = _.without(as, 'id');
          }
          vs = as.map(function(name) {
            return parent.append(name).toString();
          });
        } else {
          vs = (function() {
            var _i, _len, _ref, _results;
            _ref = this.query.views;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              v = _ref[_i];
              if (v.match(this.path.toString())) {
                _results.push(v);
              }
            }
            return _results;
          }).call(this);
        }
        _fn = function(v) {
          var li;
          li = $("<li class=\"im-outer-joined-path\"><a href=\"#\"></a></li>");
          _this.$el.append(li);
          _this.query.getPathInfo(v).getDisplayName(function(name) {
            return li.find('a').text(name);
          });
          return li.click(function(e) {
            var summ;
            e.stopPropagation();
            e.preventDefault();
            summ = new intermine.query.results.DropDownColumnSummary(v, _this.query);
            _this.$el.parent().html(summ.render().el);
            return _this.remove();
          });
        };
        for (_i = 0, _len = vs.length; _i < _len; _i++) {
          v = vs[_i];
          _fn(v);
        }
        return this;
      };

      return OuterJoinDropDown;

    })(Backbone.View));
    exporting(DropDownColumnSummary = (function(_super) {

      __extends(DropDownColumnSummary, _super);

      function DropDownColumnSummary() {
        return DropDownColumnSummary.__super__.constructor.apply(this, arguments);
      }

      DropDownColumnSummary.prototype.className = "im-dropdown-summary";

      DropDownColumnSummary.prototype.initialize = function(view, query) {
        this.view = view;
        this.query = query;
      };

      DropDownColumnSummary.prototype.render = function() {
        var heading, summ;
        heading = new SummaryHeading(this.query, this.view);
        heading.render().$el.appendTo(this.el);
        summ = new intermine.results.ColumnSummary(this.view, this.query);
        summ.noTitle = true;
        summ.render().$el.appendTo(this.el);
        return this;
      };

      return DropDownColumnSummary;

    })(Backbone.View));
    return SummaryHeading = (function(_super) {

      __extends(SummaryHeading, _super);

      function SummaryHeading() {
        return SummaryHeading.__super__.constructor.apply(this, arguments);
      }

      SummaryHeading.prototype.initialize = function(query, view) {
        var _this = this;
        this.query = query;
        this.view = view;
        return this.query.on("got:summary:total", function(path, total, got, filteredTotal) {
          var available, nts;
          if (path === _this.view) {
            nts = function(num) {
              return intermine.utils.numToString(num, ',', 3);
            };
            available = filteredTotal != null ? filteredTotal : total;
            _this.$('.im-item-available').text(nts(available));
            return _this.$('.im-item-total').text(filteredTotal != null ? "(filtered from " + (nts(total)) + ")" : "");
          }
        });
      };

      SummaryHeading.prototype.template = _.template("<h3>\n    <span class=\"im-item-got\"></span>\n    <span class=\"im-item-available\"></span>\n    <span class=\"im-type-name\"></span>\n    <span class=\"im-attr-name\"></span>\n    <span class=\"im-item-total\"></span>\n</h3>");

      SummaryHeading.prototype.render = function() {
        var attr, s, type,
          _this = this;
        this.$el.append(this.template());
        s = this.query.service;
        type = this.query.getPathInfo(this.view).getParent().getType().name;
        attr = this.query.getPathInfo(this.view).end.name;
        s.makeRequest("model/" + type, {}, function(info) {
          return _this.$('.im-type-name').text(info.name);
        });
        s.makeRequest("model/" + type + "/" + attr, {}, function(info) {
          return _this.$('.im-attr-name').text(intermine.utils.pluralise(info.name));
        });
        return this;
      };

      return SummaryHeading;

    })(Backbone.View);
  });

  jQuery.fn.imWidget = function(arg0, arg1) {
    var cls, events, properties, query, service, token, type, url, view;
    if (typeof arg0 === 'string') {
      view = this.data('widget');
      if (arg0 === 'option') {
        switch (arg1) {
          case 'query':
            return view.query;
          case 'service':
            return view.service;
          case 'events':
            return view.queryEvents;
          case 'type':
            return this.data('widget-type');
          case 'properties':
            return this.data('widget-options');
          default:
            throw new Error("Unknown option " + arg1);
        }
      } else if (arg0 === 'table') {
        return view;
      } else {
        throw new Error("Unknown method " + arg0);
      }
    } else {
      type = arg0.type, service = arg0.service, url = arg0.url, token = arg0.token, query = arg0.query, events = arg0.events, properties = arg0.properties;
      if (service == null) {
        service = new intermine.Service({
          root: url,
          token: token
        });
      }
      if (type === 'table') {
        cls = intermine.query.results.CompactView;
        view = new cls(service, query, events, properties);
        this.empty().append(view.$el);
        view.render();
      } else if (type === 'dashboard') {
        cls = intermine.query.results.DashBoard;
        view = new cls(service, query, events, properties);
        this.empty().append(view.$el);
        view.render();
      } else {
        console.error("" + type + " widgets are not supported");
      }
      this.data('widget-options', properties);
      this.data('widget-type', type);
      return this.data('widget', view);
    }
  };

  scope("intermine.messages.filters", {
    AddNew: "Add Filter",
    DefineNew: 'Define a new filter',
    EditOrRemove: 'edit or remove the currently active filters',
    None: 'No active filters',
    Heading: "Active Filters"
  });

  scope("intermine.query.filters", function(exporting) {
    var Constraints, FACETS, Facets, FilterManager, Filters, SingleColumnConstraints, SingleColumnConstraintsSummary, SingleConstraintAdder;
    exporting(Filters = (function(_super) {

      __extends(Filters, _super);

      function Filters() {
        return Filters.__super__.constructor.apply(this, arguments);
      }

      Filters.prototype.className = "im-query-filters";

      Filters.prototype.initialize = function(query) {
        this.query = query;
      };

      Filters.prototype.render = function() {
        var constraints, facets;
        constraints = new Constraints(this.query);
        constraints.render().$el.appendTo(this.el);
        facets = new Facets(this.query);
        facets.render().$el.appendTo(this.el);
        return this;
      };

      return Filters;

    })(Backbone.View));
    FACETS = {
      Gene: [
        {
          title: "Pathways",
          path: "pathways.name"
        }, {
          title: "Expression Term",
          path: "mRNAExpressionResults.mRNAExpressionTerms.name"
        }, {
          title: "Ontology Term",
          path: "ontologyAnnotations.ontologyTerm.name"
        }, {
          title: "Protein Domains",
          path: "proteins.proteinDomains.name"
        }
      ]
    };
    Facets = (function(_super) {

      __extends(Facets, _super);

      function Facets() {
        this.render = __bind(this.render, this);
        return Facets.__super__.constructor.apply(this, arguments);
      }

      Facets.prototype.className = "im-query-facets";

      Facets.prototype.tagName = "dl";

      Facets.prototype.initialize = function(query) {
        this.query = query;
        this.query.on("change:constraints", this.render);
        return this.query.on("change:joins", this.render);
      };

      Facets.prototype.render = function() {
        var cs, f, facets, searcher, simplify, v, _i, _len,
          _this = this;
        this.$el.empty();
        simplify = function(x) {
          return x.replace(/^[^\.]+\./, "").replace(/\./g, " > ");
        };
        facets = (FACETS[this.query.root] || []).concat((function() {
          var _i, _len, _ref, _results;
          _ref = this.query.views;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            v = _ref[_i];
            _results.push({
              title: simplify(v),
              path: v
            });
          }
          return _results;
        }).call(this));
        if (facets) {
          searcher = this.make("input", {
            "class": "input-long",
            placeholder: "Filter facets..."
          });
          $(searcher).appendTo(this.el).keyup(function(e) {
            var pattern;
            pattern = new RegExp($(e.target).val(), "i");
            return _this.query.trigger("filter:facets", pattern);
          });
          for (_i = 0, _len = facets.length; _i < _len; _i++) {
            f = facets[_i];
            cs = new intermine.results.ColumnSummary(f, this.query);
            this.$el.append(cs.el);
            cs.render();
          }
        }
        return this;
      };

      return Facets;

    })(Backbone.View);
    Constraints = (function(_super) {

      __extends(Constraints, _super);

      function Constraints() {
        this.render = __bind(this.render, this);
        return Constraints.__super__.constructor.apply(this, arguments);
      }

      Constraints.prototype.className = "im-constraints";

      Constraints.prototype.initialize = function(query) {
        this.query = query;
        return this.query.on("change:constraints", this.render);
      };

      Constraints.prototype.getConstraints = function() {
        return this.query.constraints;
      };

      Constraints.prototype.getConAdder = function() {
        return new intermine.query.ConstraintAdder(this.query);
      };

      Constraints.prototype.render = function() {
        var c, conBox, cons, msgs, ul, _fn, _i, _len, _ref,
          _this = this;
        cons = this.getConstraints();
        msgs = intermine.messages.filters;
        this.$el.empty();
        this.$el.append(this.make("h3", {}, msgs.Heading));
        conBox = $('<div class="alert alert-info">');
        conBox.appendTo(this.el).append(this.make("p", {}, cons.length ? msgs.EditOrRemove : msgs.None)).append(ul = this.make("ul", {}));
        _fn = function(c) {
          var con;
          con = new intermine.query.ActiveConstraint(_this.query, c);
          return con.render().$el.appendTo($(ul));
        };
        for (_i = 0, _len = cons.length; _i < _len; _i++) {
          c = cons[_i];
          _fn(c);
        }
        if ((_ref = this.getConAdder()) != null) {
          _ref.render().$el.appendTo(this.el);
        }
        return this;
      };

      Constraints.prototype.events = {
        click: function(e) {
          return e.stopPropagation();
        }
      };

      return Constraints;

    })(Backbone.View);
    exporting(FilterManager = (function(_super) {

      __extends(FilterManager, _super);

      function FilterManager() {
        return FilterManager.__super__.constructor.apply(this, arguments);
      }

      FilterManager.prototype.className = "im-filter-manager modal fade";

      FilterManager.prototype.tagName = "div";

      FilterManager.prototype.initialize = function(query) {
        var _this = this;
        this.query = query;
        return this.query.on('change:constraints', function() {
          return _this.hideModal();
        });
      };

      FilterManager.prototype.html = "<div class=\"modal-header\">\n    <a href=\"#\" class=\"close im-closer\">close</a>\n    <h3>" + intermine.messages.filters.Heading + "</h3>\n</div>\n<div class=\"modal-body\">\n    <div class=\"alert alert-info\">\n        <p></p>\n        <ul></ul>\n    </div>\n    <button class=\"btn im-closer im-define-new-filter\">\n        " + intermine.messages.filters.DefineNew + "\n    </button>\n</div>";

      FilterManager.prototype.events = {
        'hidden': 'remove',
        'click .icon-remove-sign': 'hideModal',
        'click .im-closer': 'hideModal',
        'click .im-define-new-filter': 'addNewFilter'
      };

      FilterManager.prototype.addNewFilter = function(e) {
        return this.query.trigger('add-filter-dialogue:please');
      };

      FilterManager.prototype.hideModal = function(e) {
        this.$el.modal('hide');
        return $('.modal-backdrop').trigger('click');
      };

      FilterManager.prototype.showModal = function() {
        return this.$el.modal().modal('show');
      };

      FilterManager.prototype.render = function() {
        var c, cons, msgs, ul, _fn, _i, _len,
          _this = this;
        this.$el.append(this.html);
        cons = this.getConstraints();
        msgs = intermine.messages.filters;
        this.$('p').append(cons.length ? msgs.EditOrRemove : msgs.None);
        ul = this.$('ul');
        _fn = function(c) {
          var con;
          con = new intermine.query.ActiveConstraint(_this.query, c);
          return con.render().$el.appendTo(ul);
        };
        for (_i = 0, _len = cons.length; _i < _len; _i++) {
          c = cons[_i];
          _fn(c);
        }
        return this;
      };

      return FilterManager;

    })(Constraints));
    SingleConstraintAdder = (function(_super) {

      __extends(SingleConstraintAdder, _super);

      function SingleConstraintAdder() {
        return SingleConstraintAdder.__super__.constructor.apply(this, arguments);
      }

      SingleConstraintAdder.prototype.initialize = function(query, view) {
        var _this = this;
        this.view = view;
        SingleConstraintAdder.__super__.initialize.call(this, query);
        return this.query.on('cancel:add-constraint', function() {
          return _this.$('.btn-primary').attr({
            disabled: !_this.getTreeRoot().isAttribute()
          });
        });
      };

      SingleConstraintAdder.prototype.initPaths = function() {
        return [this.view];
      };

      SingleConstraintAdder.prototype.getTreeRoot = function() {
        return this.query.getPathInfo(this.view);
      };

      SingleConstraintAdder.prototype.render = function() {
        SingleConstraintAdder.__super__.render.call(this);
        this.$('input').remove();
        root = this.getTreeRoot();
        console.log(this.view);
        if (root.isAttribute()) {
          this.chosen = root;
          this.$('button.btn-primary').text(intermine.messages.filters.DefineNew).attr({
            disabled: false
          });
          this.$('button.btn-chooser').remove();
        }
        return this;
      };

      return SingleConstraintAdder;

    })(intermine.query.ConstraintAdder);
    exporting(SingleColumnConstraints = (function(_super) {

      __extends(SingleColumnConstraints, _super);

      function SingleColumnConstraints() {
        return SingleColumnConstraints.__super__.constructor.apply(this, arguments);
      }

      SingleColumnConstraints.prototype.initialize = function(query, view) {
        this.view = view;
        return SingleColumnConstraints.__super__.initialize.call(this, query);
      };

      SingleColumnConstraints.prototype.getConAdder = function() {
        return new SingleConstraintAdder(this.query, this.view);
      };

      SingleColumnConstraints.prototype.getConstraints = function() {
        var c, _i, _len, _ref, _results;
        _ref = this.query.constraints;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          c = _ref[_i];
          if (c.path.match(this.view)) {
            _results.push(c);
          }
        }
        return _results;
      };

      return SingleColumnConstraints;

    })(Constraints));
    return exporting(SingleColumnConstraintsSummary = (function(_super) {

      __extends(SingleColumnConstraintsSummary, _super);

      function SingleColumnConstraintsSummary() {
        return SingleColumnConstraintsSummary.__super__.constructor.apply(this, arguments);
      }

      SingleColumnConstraintsSummary.prototype.getConAdder = function() {};

      SingleColumnConstraintsSummary.prototype.render = function() {
        var cons;
        SingleColumnConstraintsSummary.__super__.render.call(this);
        cons = this.getConstraints();
        if (cons.length < 1) {
          this.undelegateEvents();
          this.$el.hide();
        }
        return this;
      };

      return SingleColumnConstraintsSummary;

    })(SingleColumnConstraints));
  });

  scope('intermine.snippets.actions', {
    DownloadDialogue: function() {
      return "<a class=\"btn im-open-dialogue\" href=\"#\">\n    <i class=\"" + intermine.icons.Export + "\"></i>\n    " + intermine.messages.actions.ExportButton + "\n</a>\n<div class=\"modal fade\">\n    <div class=\"modal-header\">\n        <a class=\"close btn-cancel\">close</a>\n        <h2>" + intermine.messages.actions.ExportTitle + "</h2>\n    </div>\n    <div class=\"modal-body\">\n        <form class=\"form\">\n            <div class=\"row-fluid\">\n            <label>\n                <span class=\"span4\">\n                    " + intermine.messages.actions.ExportFormat + "\n                </span>\n                <select class=\"im-export-format input-xlarge span8\">\n                </select>\n            </label>\n            </div>\n            <div class=\"row-fluid\">\n            <label title=\"" + intermine.messages.actions.ColumnsHelp + "\">\n                <span class=\"span4\">\n                    " + intermine.messages.actions.WhichColumns + "\n                </span>\n                <div class=\"im-col-btns radio btn-group pull-right span8\">\n                    <button class=\"btn active im-all-cols span6\">\n                        " + intermine.messages.actions.AllColumns + "\n                    </button>\n                    <button class=\"btn span5\">\n                        " + intermine.messages.actions.SomeColumns + "\n                    </button>\n                </div>\n            </label>\n            <div class=\"im-col-options\">\n                <ul class=\"well im-cols im-can-be-exported-cols\">\n                    <h4>" + intermine.messages.actions.PossibleColumns + "</h4>\n                </ul>\n                <ul class=\"well im-cols im-exported-cols\">\n                    <h4>" + intermine.messages.actions.ExportedColumns + "</h4>\n                </ul>\n                <div style=\"clear:both;\"></div>\n                <button class=\"im-reset-cols btn disabled\">\n                    <i class=\"" + intermine.icons.Undo + "\"></i>\n                    " + intermine.messages.actions.ResetColumns + "\n                </button>\n            </div>\n            </div>\n            <div class=\"row-fluid\">\n            <label title=\"" + intermine.messages.actions.RowsHelp + "\">\n                <span class=\"span4\">\n                    " + intermine.messages.actions.WhichRows + "\n                    </span>\n                <div class=\"im-row-btns radio span8 btn-group pull-right\" data-toggle=\"buttons-radio\">\n                    <button class=\"btn active im-all-rows span6\">" + intermine.messages.actions.AllRows + "</button>\n                    <button class=\"btn span5\">" + intermine.messages.actions.SomeRows + "</button>\n                </div>\n            </label>\n            <div class=\"form-horizontal\">\n            <fieldset class=\"im-row-selection control-group\">\n                <label class=\"control-label\">\n                    " + intermine.messages.actions.FirstRow + "\n                    <input type=\"text\" value=\"1\" class=\"disabled input-mini im-first-row im-range-limit\">\n                </label>\n                <label class=\"control-label\">\n                    " + intermine.messages.actions.LastRow + "\n                    <input type=\"text\" class=\"disabled input-mini im-last-row im-range-limit\">\n                </label>\n                <div style=\"clear:both\"></div>\n                <div class=\"slider im-row-range-slider\"></div>\n            </fieldset>\n            </div>\n            </div>\n            <div class=\"row-fluid\">\n            <fieldset class=\"im-export-options control-group\">\n            </fieldset>\n            </div>\n        </form>\n    </div>\n    <div class=\"modal-footer\">\n        <button class=\"btn btn-primary pull-right\" title=\"" + intermine.messages.actions.ExportHelp + "\">\n            " + intermine.messages.actions.Export + "\n        </button>\n        <div class=\"btn-group btn-alt pull-right\">\n            <a href=\"#\" class=\"btn btn-galaxy\" title=\"" + intermine.messages.actions.GalaxyHelp + "\">\n                " + intermine.messages.actions.SendToGalaxy + "\n            </a>\n            <a href=\"#\" title=\"" + intermine.messages.actions.GalaxyAlt + "\" \n                class=\"btn dropdown-toggle galaxy-toggle\" data-toggle=\"dropdown\">\n                <span class=\"caret\"></span>\n            </a>\n        </div>\n        <button class=\"btn btn-cancel pull-left\">\n            " + intermine.messages.actions.Cancel + "\n        </button>\n        <form class=\"well form-inline im-galaxy-options\">\n            <label>\n                " + intermine.messages.actions.GalaxyURILabel + "\n                <input type=\"text\" class=\"im-galaxy-uri input-xlarge\" \n                    value=\"" + intermine.options.GalaxyMain + "\">\n            </label>\n            <button type=\"submit\" class=\"btn\">\n                " + intermine.messages.actions.SendToOtherGalaxy + "\n            </button>\n            <div class=\"alert alert-info\">\n                <button class=\"close\" data-dismiss=\"alert\">×</button>\n                <strong>ps</strong>\n                " + intermine.messages.actions.GalaxyAuthExplanation + "\n            </div>\n        </form>\n    </div>\n</div>";
    }
  });

  scope("intermine.query.columns", function(exporting) {
    var ATTR_HTML, Columns, CurrentColumns, JOIN_TOGGLE_HTML, Selectable;
    exporting(Columns = (function(_super) {

      __extends(Columns, _super);

      function Columns() {
        return Columns.__super__.constructor.apply(this, arguments);
      }

      Columns.prototype.className = "im-query-columns";

      Columns.prototype.initialize = function(query) {
        this.query = query;
      };

      Columns.prototype.render = function() {
        var cls, _fn, _i, _len, _ref,
          _this = this;
        _ref = [ColumnAdder, CurrentColumns];
        _fn = function(cls) {
          var inst;
          inst = new cls(_this.query);
          return _this.$el.append(inst.render().el);
        };
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          cls = _ref[_i];
          _fn(cls);
        }
        return this;
      };

      return Columns;

    })(Backbone.View));
    CurrentColumns = (function(_super) {

      __extends(CurrentColumns, _super);

      function CurrentColumns() {
        return CurrentColumns.__super__.constructor.apply(this, arguments);
      }

      CurrentColumns.prototype.className = "node-remover";

      CurrentColumns.prototype.tagName = "dl";

      CurrentColumns.prototype.initialize = function(query) {
        this.query = query;
      };

      CurrentColumns.prototype.render = function() {
        var cd, rootSel, subnodes,
          _this = this;
        cd = this.query.service.model.classes[this.query.root];
        rootSel = new Selectable(this.query, cd);
        rootSel.render().$el.appendTo(this.el);
        subnodes = _({}).extend(cd.references, cd.collections);
        _(subnodes).chain().values().sortBy(function(f) {
          return f.name;
        }).each(function(f) {
          var sel, type;
          type = _this.query.getPathInfo(f).getEndClass();
          sel = new Selectable(_this.query, type, f);
          return sel.render().$el.appendTo(_this.el);
        });
        return this;
      };

      return CurrentColumns;

    })(Backbone.View);
    JOIN_TOGGLE_HTML = _.template("<form class=\"form-inline pull-right im-join\">\n<div class=\"btn-group\" data-toggle=\"buttons-radio\">\n    <button data-style=\"INNER\" class=\"btn btn-small <% print(outer ? \"\" : \"active\") %>\">\n    Required\n    </button>\n    <button data-style=\"OUTER\" class=\"btn btn-small <% print(outer ? \"active\" : \"\") %>\">\n    Optional\n    </button>\n</div></form>");
    ATTR_HTML = _.template("<input type=\"checkbox\" \n    data-path=\"<%= path %>\"\n    <% inQuery ? print(\"checked\") : \"\" %> >\n<span class=\"im-view-option\">\n    <%= name %> (<% print(type.replace(\"java.lang.\", \"\")) %>)\n</span>");
    return Selectable = (function(_super) {

      __extends(Selectable, _super);

      function Selectable() {
        this.render = __bind(this.render, this);

        this.setCheckBoxState = __bind(this.setCheckBoxState, this);
        return Selectable.__super__.constructor.apply(this, arguments);
      }

      Selectable.prototype.tagName = "dl";

      Selectable.prototype.className = "im-selectable-node";

      Selectable.prototype.initialize = function(query, table, field) {
        this.query = query;
        this.table = table;
        this.field = field;
        this.path = this.query.root + (this.field ? "." + this.field.name : "");
        return this.query.on("change:views", this.setCheckBoxState);
      };

      Selectable.prototype.events = {
        'click dt': 'toggleFields',
        'change input[type="checkbox"]': 'changeView'
      };

      Selectable.prototype.toggleFields = function(e) {
        return this.$('dd').slideToggle();
      };

      Selectable.prototype.changeView = function(e) {
        var $t, path;
        $t = $(e.target);
        path = $t.data("path");
        if ($t.attr("checked")) {
          return this.query.addToSelect(path);
        } else {
          return this.query.removeFromSelect(path);
        }
      };

      Selectable.prototype.setCheckBoxState = function(e) {
        var _this = this;
        return this.$('dd input').each(function(i, cbx) {
          var $cbx, path;
          $cbx = $(cbx);
          path = $cbx.data("path");
          return $cbx.attr({
            checked: _this.query.hasView(path)
          });
        });
      };

      Selectable.prototype.render = function() {
        var attr, dt, icon, isInView, name, title, _fn, _ref, _ref1,
          _this = this;
        this.$el.empty();
        title = this.make("h4", {}, ((_ref = this.field) != null ? _ref.name : void 0) || this.table.name);
        dt = this.make("dt", {
          "class": "im-column-group"
        }, title);
        this.$el.append(dt);
        isInView = _(this.query.views).any(function(v) {
          return this.path === v.substring(0, v.lastIndexOf("."));
        });
        icon = isInView ? "minus" : "plus";
        $("<i class=\"icon-" + icon + "-sign\"></i>").css({
          cursor: "pointer"
        }).appendTo(title);
        if (isInView && this.path !== this.query.root) {
          $(JOIN_TOGGLE_HTML({
            outer: this.query.isOuterJoin(this.path)
          })).submit(function(e) {
            var _this = this;
            return e.preventDefault().css("display", "inline-block".appendTo(title.find(".btn".click(function(e) {
              var style;
              e.stopPropagation();
              style = $(e.target).data("style");
              return _this.query.setJoinStyle(_this.path, style.button());
            }))));
          });
        }
        _ref1 = this.table.attributes;
        _fn = function(attr) {
          return _this.addAttribute(attr);
        };
        for (name in _ref1) {
          attr = _ref1[name];
          _fn(attr);
        }
        return this;
      };

      Selectable.prototype.addAttribute = function(a) {
        var ctx, dd, p;
        if (a.name !== "id") {
          dd = this.make("dd");
          p = "" + this.path + "." + a.name;
          ctx = {
            path: p,
            inQuery: __indexOf.call(this.query.views, p) >= 0
          };
          _(ctx).extend(a);
          return $(dd).append(ATTR_HTML(ctx)).appendTo(this.el);
        }
      };

      return Selectable;

    })(Backbone.View);
  });

  scope("intermine.messages.actions", {
    ExportTitle: "Download Results",
    ExportHelp: "Download file containing results to your computer",
    ExportButton: "Download",
    ExportFormat: "Format",
    Cancel: "Cancel",
    Export: "Download",
    SendToGalaxy: "Send to Galaxy Main",
    GalaxyHelp: "Start a file upload job within Galaxy",
    GalaxyURILabel: "Your Galaxy URI:",
    GalaxyAlt: "Send to a Different Galaxy",
    GalaxyAuthExplanation: "If you have already logged into Galaxy with this browser, then the data\nwill be sent into your active account. Otherwise it will appear in a \ntemporary anonymous account.",
    SendToOtherGalaxy: "Send",
    AllRows: "Whole Result Set",
    SomeRows: "Specific Range",
    WhichRows: "Rows to Export",
    RowsHelp: "Export all rows, or define a range of rows to export.",
    AllColumns: "All Current Columns",
    SomeColumns: "Choose Columns",
    ColumnsHelp: "Export all columns, or choose specific columns to export.",
    WhichColumns: "Columns to Export",
    ResetColumns: "Reset Columns.",
    FirstRow: "From",
    LastRow: "To",
    ColumnHeaders: "Include Column Headers",
    PossibleColumns: "Columns Available to Export",
    ExportedColumns: "Exported Columns (drag to reorder)",
    ChangeColumns: "You may add any of the columns in the right hand box by clicking on the\nplus sign. You may remove unwanted columns by clicking on the minus signs\nin the left hand box. Note that while adding these columns will not alter your query,\nif you remove all the attributes from an item, then you <b>may change</b> the results\nyou receive.",
    OuterJoinWarning: "This query has outer-joined collections. This means that the number of rows in \nthe table is likely to be different from the number of rows in the exported results.\n<b>You are strongly discouraged from specifying specific ranges for export</b>. If\nyou do specify a certain range, please check that you did in fact get all the \nresults you wanted.",
    IncludedFeatures: "Sequence Features in this Query - <strong>choose at least one</strong>:",
    FastaFeatures: "Features with Sequences in this Query - <strong>select one</strong>:",
    NoSuitableColumns: "There are no columns of a suitable type for this format.",
    ChrPrefix: "Prefix \"chr\" to the chromosome identifier as per UCSC convention (eg: chr2)"
  });

  scope("intermine.query.actions", function(exporting) {
    var ActionBar, Actions, BIO_FORMATS, CODE_GEN_LANGS, CodeGenerator, EXPORT_FORMATS, ExportDialogue, ILLEGAL_LIST_NAME_CHARS, Item, ListAppender, ListCreator, ListDialogue, ListManager, UniqItems, openWindowWithPost;
    Item = (function(_super) {

      __extends(Item, _super);

      function Item() {
        return Item.__super__.constructor.apply(this, arguments);
      }

      Item.prototype.initialize = function(item) {
        return this.set("item", item);
      };

      return Item;

    })(Backbone.Model);
    UniqItems = (function(_super) {

      __extends(UniqItems, _super);

      function UniqItems() {
        return UniqItems.__super__.constructor.apply(this, arguments);
      }

      UniqItems.prototype.model = Item;

      UniqItems.prototype.add = function(items, opts) {
        var item, _i, _len, _results;
        items = _(items).isArray() ? items : [items];
        _results = [];
        for (_i = 0, _len = items.length; _i < _len; _i++) {
          item = items[_i];
          if ((item != null) && "" !== item) {
            if (!(this.any(function(i) {
              return i.get("item") === item;
            }))) {
              _results.push(UniqItems.__super__.add.call(this, new Item(item, opts)));
            } else {
              _results.push(void 0);
            }
          }
        }
        return _results;
      };

      UniqItems.prototype.remove = function(item, opts) {
        var delenda;
        delenda = this.filter(function(i) {
          return i.get("item") === item;
        });
        return UniqItems.__super__.remove.call(this, delenda, opts);
      };

      return UniqItems;

    })(Backbone.Collection);
    ILLEGAL_LIST_NAME_CHARS = /[^\w\s\(\):+\.-]/g;
    exporting(Actions = (function(_super) {

      __extends(Actions, _super);

      function Actions() {
        return Actions.__super__.constructor.apply(this, arguments);
      }

      Actions.prototype.className = "im-query-actions row-fluid";

      Actions.prototype.tagName = "ul";

      Actions.prototype.initialize = function(query) {
        this.query = query;
      };

      Actions.prototype.actionClasses = function() {
        return [ListManager, CodeGenerator, Exporters];
      };

      Actions.prototype.extraClass = "im-action";

      Actions.prototype.render = function() {
        var action, cls, _i, _len, _ref;
        _ref = this.actionClasses();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          cls = _ref[_i];
          action = new cls(this.query);
          action.render().$el.addClass(this.extraClass).appendTo(this.el);
        }
        return this;
      };

      return Actions;

    })(Backbone.View));
    exporting(ActionBar = (function(_super) {

      __extends(ActionBar, _super);

      function ActionBar() {
        return ActionBar.__super__.constructor.apply(this, arguments);
      }

      ActionBar.prototype.extraClass = "im-action";

      ActionBar.prototype.actionClasses = function() {
        return [ListManager, CodeGenerator, ExportDialogue];
      };

      return ActionBar;

    })(Actions));
    ListDialogue = (function(_super) {

      __extends(ListDialogue, _super);

      function ListDialogue() {
        this.selectionChanged = __bind(this.selectionChanged, this);
        return ListDialogue.__super__.constructor.apply(this, arguments);
      }

      ListDialogue.prototype.tagName = "li";

      ListDialogue.prototype.className = "im-list-dialogue dropdown";

      ListDialogue.prototype.usingDefaultName = true;

      ListDialogue.prototype.initialize = function(query) {
        var _this = this;
        this.query = query;
        this.types = {};
        this.model = new Backbone.Model();
        return this.query.on("imo:selected", function(type, id, selected) {
          var commonType, m, types;
          if (selected) {
            _this.types[id] = type;
          } else {
            delete _this.types[id];
          }
          types = _(_this.types).values();
          if (types.length > 0) {
            m = _this.query.service.model;
            commonType = m.findCommonTypeOfMultipleClasses(types);
            if (commonType !== _this.commonType) {
              _this.newCommonType(commonType);
            }
          }
          return _this.selectionChanged();
        });
      };

      ListDialogue.prototype.selectionChanged = function(n) {
        var hasSelectedItems;
        n || (n = _(this.types).values().length);
        hasSelectedItems = !!n;
        this.$('.btn-primary').attr({
          disabled: !hasSelectedItems
        });
        this.$('.im-selection-instruction').hide();
        this.$('form').show();
        if (n < 1) {
          return this.nothingSelected();
        }
      };

      ListDialogue.prototype.newCommonType = function(type) {
        this.commonType = type;
        return this.query.trigger("common:type:selected", type);
      };

      ListDialogue.prototype.nothingSelected = function() {
        this.$('.im-selection-instruction').slideDown();
        this.$('form').hide();
        return this.query.trigger("selection:cleared");
      };

      ListDialogue.prototype.events = {
        'change .im-list-name': 'listNameChanged',
        'submit form': 'ignore',
        'click form': 'ignore',
        'click .btn-cancel': 'stop'
      };

      ListDialogue.prototype.startPicking = function() {
        var m,
          _this = this;
        this.query.trigger("start:list-creation");
        this.nothingSelected();
        m = this.$('.modal').show(function() {
          return $(this).addClass("in").draggable({
            handle: "h2"
          });
        });
        this.$('.modal-header h2').css({
          cursor: "move"
        }).tooltip({
          title: "Drag me around!"
        });
        return this.$('.btn-primary').unbind('click').click(function() {
          return _this.create();
        });
      };

      ListDialogue.prototype.stop = function(e) {
        var modal;
        this.query.trigger("stop:list-creation");
        modal = this.$('.modal');
        if (modal.is('.ui-draggable')) {
          return this.remove();
        } else {
          return modal.modal('hide');
        }
      };

      ListDialogue.prototype.ignore = function(e) {
        e.preventDefault();
        return e.stopPropagation();
      };

      ListDialogue.prototype.listNameChanged = function() {
        var $target, chosen,
          _this = this;
        this.usingDefaultName = false;
        $target = this.$('.im-list-name');
        $target.parent().removeClass("error");
        $target.next().text('');
        chosen = $target.val();
        return this.query.service.fetchLists(function(ls) {
          var l, _i, _len, _results;
          _results = [];
          for (_i = 0, _len = ls.length; _i < _len; _i++) {
            l = ls[_i];
            if (l.name === chosen) {
              $target.next().text("This name is already taken");
              _results.push($target.parent().addClass("error"));
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        });
      };

      ListDialogue.prototype.create = function(q) {
        throw "Override me!";
      };

      ListDialogue.prototype.openDialogue = function(type, q) {
        var _this = this;
        if (type == null) {
          type = this.query.root;
        }
        if (q == null) {
          q = this.query.clone();
        }
        q.joins = {};
        this.newCommonType(type);
        if (q != null) {
          q.count(this.selectionChanged);
        }
        this.$('.modal').modal("show").find('form').show();
        return this.$('.btn-primary').unbind('click').click(function() {
          return _this.create(q, type);
        });
      };

      ListDialogue.prototype.render = function() {
        var _this = this;
        this.$el.append(this.html);
        this.$('.modal').modal({
          show: false
        }).on("hidden", function() {
          return _this.remove();
        });
        return this;
      };

      return ListDialogue;

    })(Backbone.View);
    ExportDialogue = (function(_super) {

      __extends(ExportDialogue, _super);

      function ExportDialogue() {
        this.initCols = __bind(this.initCols, this);

        this.updateFormatOptions = __bind(this.updateFormatOptions, this);
        return ExportDialogue.__super__.constructor.apply(this, arguments);
      }

      ExportDialogue.prototype.tagName = "li";

      ExportDialogue.prototype.className = "im-export-dialogue dropdown";

      ExportDialogue.prototype.initialize = function(query) {
        var allOrSome, v, _i, _len, _ref,
          _this = this;
        this.query = query;
        this.requestInfo = new Backbone.Model({
          format: EXPORT_FORMATS[0].extension,
          allRows: true,
          allCols: true,
          start: 0,
          galaxyMain: intermine.options.GalaxyMain,
          galaxyAlt: intermine.options.GalaxyAlt || intermine.options.GalaxyMain
        });
        allOrSome = function(all, optSel, btnSel) {
          var btns, opts;
          opts = _this.$(optSel);
          btns = _this.$(btnSel).removeClass('active');
          if (all) {
            opts.fadeOut();
            return btns.first().addClass('active');
          } else {
            opts.fadeIn();
            return btns.last().addClass('active');
          }
        };
        this.exportedCols = new Backbone.Collection;
        this.query.on('download-menu:open', this.openDialogue, this);
        this.query.on('imtable:change:page', function(start, size) {
          return _this.requestInfo.set({
            start: start,
            end: start + size
          });
        });
        _ref = this.query.views;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          v = _ref[_i];
          this.exportedCols.add({
            path: this.query.getPathInfo(v)
          });
        }
        this.requestInfo.on('change:allRows', function(m, allRows) {
          return allOrSome(allRows, '.im-row-selection', '.im-row-btns .btn');
        });
        this.requestInfo.on('change:allCols', function(m, allCols) {
          return allOrSome(allCols, '.im-col-options', '.im-col-btns .btn');
        });
        this.requestInfo.on('change:format', this.updateFormatOptions);
        this.requestInfo.on('change:start', function(m, start) {
          var $elem, newVal;
          $elem = _this.$('.im-first-row');
          newVal = "" + (start + 1);
          if (newVal !== $elem.val()) {
            $elem.val(newVal);
          }
          return _this.$('.im-row-range-slider').slider('option', 'values', [start, m.get('end') - 1]);
        });
        this.requestInfo.on('change:end', function(m, end) {
          var $elem, newVal;
          $elem = _this.$('.im-last-row');
          newVal = "" + end;
          if (newVal !== $elem.val()) {
            $elem.val(newVal);
          }
          return _this.$('.im-row-range-slider').slider('option', 'values', [m.get('start'), end - 1]);
        });
        this.requestInfo.on("change:format", function(m, format) {
          return _this.$('.im-export-format').val(format);
        });
        return this.exportedCols.on('add remove reset', this.initCols);
      };

      ExportDialogue.prototype.events = {
        'click .im-reset-cols': 'resetCols',
        'click .im-col-btns': 'toggleColSelection',
        'click .im-row-btns': 'toggleRowSelection',
        'click a.im-open-dialogue': 'openDialogue',
        'click .btn-cancel': 'stop',
        'change .im-export-format': 'updateFormat',
        'click button.btn-primary': 'export',
        'click .galaxy-toggle': 'toggleGalaxyOptions',
        'change .im-galaxy-uri': 'changeGalaxyURI',
        'click .btn-galaxy': 'sendToGalaxy',
        'submit .im-galaxy-options': 'sendToAltGalaxy',
        'change .im-first-row': 'changeStart',
        'change .im-last-row': 'changeEnd',
        'keyup .im-range-limit': 'keyPressOnLimit'
      };

      ExportDialogue.prototype.keyPressOnLimit = function(e) {
        var input;
        input = $(e.target);
        switch (e.keyCode) {
          case 38:
            input.val(1 + parseInt(input.val(), 10));
            break;
          case 40:
            input.val(parseInt(input.val(), 10) - 1);
        }
        return input.change();
      };

      ExportDialogue.prototype.changeStart = function(e) {
        if (this.checkStartAndEnd()) {
          return this.requestInfo.set({
            start: parseInt(this.$('.im-first-row').val(), 10) - 1
          });
        }
      };

      ExportDialogue.prototype.changeEnd = function(e) {
        if (this.checkStartAndEnd()) {
          return this.requestInfo.set({
            end: parseInt(this.$('.im-last-row').val(), 10)
          });
        }
      };

      ExportDialogue.prototype.DIGITS = /^\s*\d+\s*$/;

      ExportDialogue.prototype.checkStartAndEnd = function() {
        var end, ok, start, valA, valB;
        start = this.$('.im-first-row');
        end = this.$('.im-last-row');
        valA = start.val();
        valB = end.val();
        ok = (this.DIGITS.test(valA) && parseInt(valA, 10) >= 1) && (this.DIGITS.test(valB) && parseInt(valB, 10) <= this.count);
        if (this.DIGITS.test(valA) && this.DIGITS.test(valB)) {
          ok = ok && (parseInt(valA, 10) <= parseInt(valB, 10));
        }
        $('.im-row-selection').toggleClass('error', !ok);
        return ok;
      };

      ExportDialogue.prototype.sendToGalaxy = function(e) {
        e.stopPropagation();
        e.preventDefault();
        return this.doGalaxy(this.requestInfo.get('galaxyMain'));
      };

      ExportDialogue.prototype.sendToAltGalaxy = function(e) {
        e.stopPropagation();
        e.preventDefault();
        return this.doGalaxy(this.requestInfo.get('galaxyAlt'));
      };

      ExportDialogue.prototype.doGalaxy = function(galaxy) {
        var c, format, qLists, uri,
          _this = this;
        console.log("Sending to " + galaxy);
        uri = this.getExportURI();
        format = this.requestInfo.get('format');
        qLists = (function() {
          var _i, _len, _ref, _results;
          _ref = this.query;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            c = _ref[_i];
            if (c.op === 'IN') {
              _results.push(c.value);
            }
          }
          return _results;
        }).call(this);
        return intermine.utils.getOrganisms(this.query, function(orgs) {
          return openWindowWithPost("" + galaxy + "/tool_runner", "Upload", {
            tool_id: 'flymine',
            organism: orgs.join(', '),
            URL: uri,
            name: "" + (orgs.length === 1 ? orgs[0] + ' ' : '') + _this.query.root + " data",
            data_type: format === 'tab' ? 'tabular' : format,
            info: "" + _this.query.root + " data from " + _this.query.service.root + ".\nUploaded from " + (window.location.toString().replace(/\?.*/, '')) + ".\n" + (qLists.length ? ' source: ' + lists.join(', ') : '') + "\n" + (orgs.length ? ' organisms: ' + orgs.join(', ') : '')
          });
        });
      };

      ExportDialogue.prototype.changeGalaxyURI = function(e) {
        return this.requestInfo.set({
          galaxyAlt: this.$('.im-galaxy-uri').val()
        });
      };

      ExportDialogue.prototype.toggleGalaxyOptions = function(e) {
        return this.$('.im-galaxy-options').slideToggle('fast');
      };

      ExportDialogue.prototype["export"] = function(e) {
        return window.open(this.getExportURI());
      };

      ExportDialogue.prototype.getExportURI = function() {
        var columns, f, idAttr, isIncluded, q, toPath, uri;
        q = this.query.clone();
        f = this.requestInfo.get('format');
        toPath = function(col) {
          return col.get('path');
        };
        idAttr = function(path) {
          return path.append('id');
        };
        isIncluded = function(col) {
          return col.get('included');
        };
        columns = (function() {
          switch (f) {
            case 'bed':
            case 'gff3':
              return this.seqFeatures.filter(isIncluded).map(_.compose(idAttr, toPath));
            case 'fasta':
              return this.fastaFeatures.filter(isIncluded).map(_.compose(idAttr, toPath));
            default:
              if (!this.requestInfo.get('allCols')) {
                return this.exportedCols.map(toPath);
              }
          }
        }).call(this);
        if (columns != null) {
          q.select(columns);
        }
        if ((__indexOf.call(_.pluck(BIO_FORMATS, 'extension'), f) >= 0)) {
          q.orderBy([]);
        }
        uri = q.getExportURI(this.requestInfo.get('format'));
        uri += this.getExtraOptions();
        return uri;
      };

      ExportDialogue.prototype.getExtraOptions = function() {
        var end, ret, start;
        ret = "";
        if (this.requestInfo.get('columnHeaders')) {
          ret += "&columnheaders=1";
        }
        if (!this.requestInfo.get('allRows')) {
          start = this.requestInfo.get('start');
          end = this.requestInfo.get('end');
          ret += "&start=" + start;
          if (end !== this.count) {
            ret += "&size=" + (end - start);
          }
        }
        return ret;
      };

      ExportDialogue.prototype.toggleColSelection = function(e) {
        this.requestInfo.set({
          allCols: !this.requestInfo.get('allCols')
        });
        return false;
      };

      ExportDialogue.prototype.toggleRowSelection = function(e) {
        this.requestInfo.set({
          allRows: !this.requestInfo.get('allRows')
        });
        return false;
      };

      ExportDialogue.prototype.openDialogue = function(e) {
        return this.$('.modal').modal('show');
      };

      ExportDialogue.prototype.stop = function(e) {
        this.$('.modal').modal('hide');
        return this.reset();
      };

      ExportDialogue.prototype.reset = function() {
        this.requestInfo.set({
          format: EXPORT_FORMATS[0].extension,
          allCols: true,
          allRows: true,
          start: 0,
          end: this.count
        });
        return this.resetCols();
      };

      ExportDialogue.prototype.resetCols = function(e) {
        var _this = this;
        if (e != null) {
          e.stopPropagation();
        }
        if (e != null) {
          e.preventDefault();
        }
        this.$('.im-reset-cols').addClass('disabled');
        return this.exportedCols.reset(this.query.views.map(function(v) {
          return {
            path: _this.query.getPathInfo(v)
          };
        }));
      };

      ExportDialogue.prototype.updateFormat = function(e) {
        return this.requestInfo.set({
          format: this.$('.im-export-format').val()
        });
      };

      ExportDialogue.prototype.updateFormatOptions = function() {
        var chrPref, format, opts, requestInfo;
        opts = this.$('.im-export-options').empty();
        requestInfo = this.requestInfo;
        format = requestInfo.get('format');
        if (__indexOf.call(BIO_FORMATS.map(function(f) {
          return f.extension;
        }), format) >= 0) {
          this.requestInfo.set({
            allCols: true
          });
          this.$('.im-all-cols').attr({
            disabled: true
          });
        } else {
          this.$('.im-all-cols').attr({
            disabled: false
          });
        }
        switch (format) {
          case 'tab':
          case 'csv':
            opts.append("<label>\n    <span class=\"span4\">\n        " + intermine.messages.actions.ColumnHeaders + "\n    </span>\n    <span class=\"span8\">\n        <input type=\"checkbox\" class=\"im-column-headers pull-right\">\n    </span>\n</label>");
            return opts.find('.im-column-headers').change(function(e) {
              return requestInfo.set({
                columnHeaders: $(this).is(':checked')
              });
            });
          case 'bed':
            chrPref = $("<label>\n    <span class=\"span4\">\n        " + intermine.messages.actions.ChrPrefix + "\n    </span>\n    <input type=\"checkbox\" class=\"span8\">\n    <div style=\"clear:both\"></div>\n</label>");
            chrPref.appendTo(opts);
            chrPref.find('input').attr({
              checked: !!requestInfo.get('useChrPrefix')
            }).change(function(e) {
              return requestInfo.set({
                useChrPrefix: $(this).is(':checked')
              });
            });
            return this.addSeqFeatureSelector();
          case 'gff3':
            return this.addSeqFeatureSelector();
          case 'fasta':
            return this.addFastaFeatureSelector();
        }
      };

      ExportDialogue.prototype.addFastaFeatureSelector = function() {
        var included, l, node, opts, seqFeatCols, _i, _len, _ref,
          _this = this;
        opts = this.$('.im-export-options');
        l = $("<label>\n    <span class=\"span4\">\n        " + intermine.messages.actions.FastaFeatures + "\n    </span>\n</label>");
        l.appendTo(opts);
        seqFeatCols = $('<ul class="well span8 im-sequence-features">');
        this.fastaFeatures = new Backbone.Collection;
        this.fastaFeatures.on('add', function(col) {
          var li, path;
          path = col.get('path');
          li = $('<li>');
          path.getDisplayName(function(name) {
            li.append("<span class=\"label " + (col.get('included') ? 'label-included' : 'label-available') + "\">\n    <a href=\"#\">\n        <i class=\"" + (col.get('included') ? intermine.icons.Yes : intermine.icons.No) + "\"></i>\n        " + name + "\n    </a>\n</span>");
            return li.find('a').click(function() {
              _this.fastaFeatures.each(function(other) {
                return other.set({
                  included: false
                });
              });
              return col.set({
                included: true
              });
            });
          });
          col.on('change:included', function() {
            li.find('i').toggleClass("" + intermine.icons.Yes + " " + intermine.icons.No);
            return li.find('span').toggleClass("label-success label-available");
          });
          return li.appendTo(seqFeatCols);
        });
        included = true;
        _ref = this.query.getViewNodes();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          node = _ref[_i];
          if ((node.isa('SequenceFeature')) || (node.isa('Protein'))) {
            this.fastaFeatures.add({
              path: node,
              included: included
            });
            included = false;
          }
        }
        if (this.fastaFeatures.isEmpty()) {
          seqFeatCols.append("<li>\n    <span class=\"label label-important\">\n    " + intermine.messages.actions.NoSuitableColumns + "\n    </span>\n</li>");
        }
        return seqFeatCols.appendTo(l);
      };

      ExportDialogue.prototype.addSeqFeatureSelector = function() {
        var l, node, opts, seqFeatCols, _i, _len, _ref,
          _this = this;
        opts = this.$('.im-export-options');
        l = $("<label>\n    <span class=\"span4 control-label\">\n        " + intermine.messages.actions.IncludedFeatures + "\n    </span>\n</label>");
        l.appendTo(opts);
        seqFeatCols = $('<ul class="well span8 im-sequence-features">');
        this.seqFeatures = new Backbone.Collection;
        this.seqFeatures.on('add', function(col) {
          var li, path;
          path = col.get('path');
          li = $('<li>');
          path.getDisplayName(function(name) {
            li.append("<span class=\"label label-included\">\n    <a href=\"#\">\n        <i class=\"" + (col.get('included') ? intermine.icons.Yes : intermine.icons.No) + "\"></i>\n        " + name + "\n    </a>\n</span>");
            return li.find('a').click(function() {
              return col.set({
                included: !col.get('included')
              });
            });
          });
          col.on('change:included', function() {
            console.log("Changed");
            li.find('i').toggleClass("" + intermine.icons.Yes + " " + intermine.icons.No);
            return li.find('span').toggleClass("label-included label-available");
          });
          return li.appendTo(seqFeatCols);
        });
        this.seqFeatures.on('change:included', function() {
          var atLeastOneIncluded;
          atLeastOneIncluded = _this.seqFeatures.any(function(col) {
            return col.get('included');
          });
          console.log("Go at least one: " + atLeastOneIncluded);
          return l.toggleClass("error", !atLeastOneIncluded);
        });
        _ref = this.query.getViewNodes();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          node = _ref[_i];
          if (node.isa('SequenceFeature')) {
            this.seqFeatures.add({
              path: node,
              included: true
            });
          }
        }
        if (this.seqFeatures.isEmpty()) {
          seqFeatCols.append("<li>\n    <span class=\"label label-important\">\n    " + intermine.messages.actions.NoSuitableColumns + "\n    </span>\n</li>");
        }
        return seqFeatCols.appendTo(l);
      };

      ExportDialogue.prototype.initCols = function() {
        var cn, cols, emphasise, li, maybes, n, _i, _len, _ref, _results,
          _this = this;
        this.$('.im-cols li').remove();
        emphasise = function(elem) {
          elem.addClass('active');
          return _.delay((function() {
            return elem.removeClass('active');
          }), 1000);
        };
        cols = this.$('.im-exported-cols');
        this.exportedCols.each(function(col) {
          var li, path;
          path = col.get('path');
          li = $("<li></li>");
          li.data({
            col: col
          }).appendTo(cols);
          return path.getDisplayName(function(name) {
            li.append("<div class=\"label label-included\">\n    <i class=\"" + intermine.icons.Move + " im-move pull-right\"></i>\n    " + name + "\n</div>");
            return li.find('a').click(function() {
              return li.slideUp('fast', function() {
                _this.$('.im-reset-cols').removeClass('disabled');
                _this.exportedCols.remove(col);
                return emphasise(maybes);
              });
            });
          });
        });
        cols.sortable({
          items: 'li',
          axis: 'y',
          placeholder: 'ui-state-highlight',
          update: function(e, ui) {
            _this.$('.im-reset-cols').removeClass('disabled');
            return _this.exportedCols.reset(cols.find('li').map(function(i, elem) {
              return $(elem).data('col');
            }).get(), {
              silent: true
            });
          }
        });
        maybes = this.$('.im-can-be-exported-cols');
        _ref = this.query.getQueryNodes();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          n = _ref[_i];
          _results.push((function() {
            var _j, _len1, _ref1, _results1,
              _this = this;
            _ref1 = n.getChildNodes();
            _results1 = [];
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              cn = _ref1[_j];
              if (cn.isAttribute() && !this.exportedCols.any(function(col) {
                return col.get('path').toString() === cn.toString();
              })) {
                if (intermine.options.ShowId || cn.end.name !== "id") {
                  li = $("<li></li>");
                  li.data({
                    col: new Backbone.Model({
                      col: cn
                    })
                  });
                  li.appendTo(maybes);
                  _results1.push((function(cn, li) {
                    return cn.getDisplayName(function(name) {
                      li.append("<div class=\"label label-available\">\n    <a href=\"#\"><i class=\"" + intermine.icons.Add + "\"></i></a>\n    " + name + "\n</div>");
                      return li.find('a').click(function(e) {
                        return li.slideUp('fast', function() {
                          _this.$('.im-reset-cols').removeClass('disabled');
                          _this.exportedCols.add({
                            path: cn
                          });
                          return emphasise(cols);
                        });
                      });
                    });
                  })(cn, li));
                } else {
                  _results1.push(void 0);
                }
              }
            }
            return _results1;
          }).call(this));
        }
        return _results;
      };

      ExportDialogue.prototype.warnOfOuterJoinedCollections = function() {
        var _this = this;
        if (_.any(this.query.joins, function(s, p) {
          return (s === 'OUTER') && _this.query.canHaveMultipleValues(p);
        })) {
          return this.$('.im-row-selection').append("<div class=\"alert alert-warning\">\n    <button class=\"close\" data-dismiss=\"alert\">×</button>\n    <strong>NB</strong>\n    " + intermine.messages.actions.OuterJoinWarning + "\n</div>");
        }
      };

      ExportDialogue.prototype.initFormats = function() {
        var format, formatToOpt, select, _i, _j, _len, _len1;
        select = this.$('.im-export-format');
        formatToOpt = function(format) {
          return "<option value=\"" + format.extension + "\">\n    " + format.name + "\n</option>";
        };
        for (_i = 0, _len = EXPORT_FORMATS.length; _i < _len; _i++) {
          format = EXPORT_FORMATS[_i];
          select.append(formatToOpt(format));
        }
        if (intermine.utils.modelIsBio(this.query.service.model)) {
          for (_j = 0, _len1 = BIO_FORMATS.length; _j < _len1; _j++) {
            format = BIO_FORMATS[_j];
            select.append(formatToOpt(format));
          }
        }
        return select.val(this.requestInfo.get('format'));
      };

      ExportDialogue.prototype.render = function() {
        this.$el.append(intermine.snippets.actions.DownloadDialogue());
        this.$('.modal-footer .btn').tooltip();
        this.initFormats();
        this.initCols();
        this.updateFormatOptions();
        this.warnOfOuterJoinedCollections();
        this.makeSlider();
        this.$el.find('.modal').hide();
        return this;
      };

      ExportDialogue.prototype.makeSlider = function() {
        var _this = this;
        return this.query.count(function(c) {
          var sl;
          _this.count = c;
          _this.requestInfo.set({
            end: c
          });
          return sl = _this.$('.slider').slider({
            range: true,
            min: 0,
            max: c - 1,
            values: [0, c - 1],
            step: 1,
            slide: function(e, ui) {
              return _this.requestInfo.set({
                start: ui.values[0],
                end: ui.values[1] + 1
              });
            }
          });
        });
      };

      return ExportDialogue;

    })(Backbone.View);
    exporting(ListAppender = (function(_super) {

      __extends(ListAppender, _super);

      function ListAppender() {
        this.selectionChanged = __bind(this.selectionChanged, this);
        return ListAppender.__super__.constructor.apply(this, arguments);
      }

      ListAppender.prototype.html = "<div class=\"modal fade\">\n    <div class=\"modal-header\">\n        <a class=\"close btn-cancel\">close</a>\n        <h2>Add Items To Existing List</h2>\n    </div>\n    <div class=\"modal-body\">\n        <form class=\"form-horizontal form\">\n            <fieldset class=\"control-group\">\n                <label>\n                    Add\n                    <span class=\"im-item-count\"></span>\n                    <span class=\"im-item-type\"></span>\n                    to:\n                    <select class=\"im-receiving-list\">\n                        <option value=\"\"><i>Select a list</i></option>\n                    </select>\n                </label>\n                <span class=\"help-inline\"></span>\n            </fieldset>\n        </form>\n        <div class=\"alert alert-error im-none-compatible-error\">\n            <b>Sorry!</b> You don't have access to any compatible lists.\n        </div>\n        <div class=\"alert alert-info im-selection-instruction\">\n            <b>Get started!</b> Choose items from the table below.\n            You can move this dialogue around by dragging it, if you \n            need access to a column it is covering up.\n        </div>\n    </div>\n    <div class=\"modal-footer\">\n        <div class=\"btn-group\">\n            <button disabled class=\"btn btn-primary\">Add to list</button>\n            <button class=\"btn btn-cancel\">Cancel</button>\n        </div>\n    </div>\n</div>";

      ListAppender.prototype.selectionChanged = function(n) {
        ListAppender.__super__.selectionChanged.call(this, n);
        n || (n = _(this.types).values().length);
        this.$('.im-item-count').text(n);
        this.$('.im-item-type').text(intermine.utils.pluralise(this.commonType, n));
        if (n < 1) {
          return this.nothingSelected;
        }
      };

      ListAppender.prototype.nothingSelected = function() {
        var _this = this;
        ListAppender.__super__.nothingSelected.call(this);
        return this.$('form select option').each(function(i, elem) {
          return $(elem).attr({
            disabled: false
          });
        });
      };

      ListAppender.prototype.newCommonType = function(type) {
        ListAppender.__super__.newCommonType.call(this, type);
        return this.onlyShowCompatibleOptions();
      };

      ListAppender.prototype.onlyShowCompatibleOptions = function() {
        var compatibles, m, type,
          _this = this;
        type = this.commonType;
        m = this.query.service.model;
        compatibles = 0;
        this.$('form select option').each(function(i, elem) {
          var $o, compat, path;
          $o = $(elem);
          $o.attr({
            disabled: true
          });
          if (type && elem.value) {
            path = m.getPathInfo(type);
            compat = path.isa($o.data("type"));
            $o.attr({
              disabled: !compat
            });
            if (compat) {
              return compatibles++;
            }
          }
        });
        this.$('.btn-primary').attr({
          disabled: compatibles < 1
        });
        if (type) {
          return this.$('.im-none-compatible-error').toggle(compatibles < 1);
        }
      };

      ListAppender.prototype.create = function(q) {
        var backToNormal, cg, ids, ilh, lName, listQ, receiver, selectedOption, targetSize, targetType,
          _this = this;
        ids = _(this.types).keys();
        receiver = this.$('.im-receiving-list');
        if (!(lName = receiver.val())) {
          cg = receiver.closest('.control-group').addClass('error');
          ilh = this.$('.help-inline').text("No receiving list selected").show();
          backToNormal = function() {
            return ilh.fadeOut(1000, function() {
              ilh.text("");
              return cg.removeClass("error");
            });
          };
          _.delay(backToNormal, 5000);
          return false;
        }
        selectedOption = receiver.find(':selected').first();
        targetType = selectedOption.data('type');
        targetSize = selectedOption.data('size');
        listQ = q || {
          select: ["id"],
          from: targetType,
          where: {
            id: ids
          }
        };
        return this.query.service.query(listQ, function(q) {
          var promise;
          promise = q.appendToList(receiver.val(), function(updatedList) {
            _this.query.trigger("list-update:success", updatedList, updatedList.size - parseInt(targetSize, 10));
            return _this.stop();
          });
          return promise.fail(function(xhr, level, message) {
            if (xhr.responseText) {
              message = (JSON.parse(xhr.responseText)).error;
            }
            return _this.query.trigger("list-update:failure", message);
          });
        });
      };

      ListAppender.prototype.render = function() {
        ListAppender.__super__.render.call(this);
        this.fillSelect();
        return this;
      };

      ListAppender.prototype.fillSelect = function() {
        var _this = this;
        this.query.service.fetchLists(function(ls) {
          var toOpt;
          toOpt = function(l) {
            return _this.make("option", {
              value: l.name,
              "data-type": l.type,
              "data-size": l.size
            }, "" + l.name + " (" + l.size + " " + (intermine.utils.pluralise(l.type, l.size)) + ")");
          };
          _this.$('.im-receiving-list').append(ls.filter(function(l) {
            return !l.hasTag("im:public");
          }).map(toOpt));
          return _this.onlyShowCompatibleOptions();
        });
        return this;
      };

      ListAppender.prototype.startPicking = function() {
        ListAppender.__super__.startPicking.call(this);
        return this.$('.im-none-compatible-error').hide();
      };

      return ListAppender;

    })(ListDialogue));
    openWindowWithPost = function(uri, name, params) {
      var form, value, w;
      form = $("<form method=\"POST\" action=\"" + uri + "\" target=\"" + name + "\">");
      for (name in params) {
        value = params[name];
        form.append("<input name=\"" + name + "\" value=\"" + value + "\" type=\"hidden\">");
      }
      form.appendTo('body');
      w = window.open("someNonExistantPathToSomeWhere", name);
      form.submit();
      form.remove();
      return w.close();
    };
    EXPORT_FORMATS = [
      {
        name: "Spreadsheet (tab separated values)",
        extension: "tab"
      }, {
        name: "Spreadsheet (comma separated values)",
        extension: "csv"
      }, {
        name: "XML",
        extension: "xml"
      }, {
        name: "JSON",
        extension: "json"
      }
    ];
    BIO_FORMATS = [
      {
        name: "GFF3",
        extension: "gff3"
      }, {
        name: "UCSC-BED",
        extension: "bed"
      }, {
        name: "FASTA",
        extension: "fasta"
      }
    ];
    CODE_GEN_LANGS = [
      {
        name: "Perl",
        extension: "pl"
      }, {
        name: "Python",
        extension: "py"
      }, {
        name: "Ruby",
        extension: "rb"
      }, {
        name: "Java",
        extension: "java"
      }, {
        name: "JavaScript",
        extension: "js"
      }, {
        name: "XML",
        extension: "xml"
      }
    ];
    CodeGenerator = (function(_super) {

      __extends(CodeGenerator, _super);

      function CodeGenerator() {
        this.expand = __bind(this.expand, this);

        this.compact = __bind(this.compact, this);

        this.doMainAction = __bind(this.doMainAction, this);

        this.getAndShowCode = __bind(this.getAndShowCode, this);

        this.showComments = __bind(this.showComments, this);

        this.render = __bind(this.render, this);
        return CodeGenerator.__super__.constructor.apply(this, arguments);
      }

      CodeGenerator.prototype.tagName = "li";

      CodeGenerator.prototype.className = "im-code-gen";

      CodeGenerator.prototype.html = _.template("<div class=\"btn-group\">\n    <a class=\"btn btn-action\" href=\"#\">\n        <i class=\"" + intermine.icons.Script + "\"></i>\n        <span class=\"im-only-widescreen\">Get</span>\n        <span class=\"im-code-lang\"></span>\n        Code\n    </a>\n    <a class=\"btn dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\" style=\"height: 18px\">\n        <span class=\"caret\"></span>\n    </a>\n    <ul class=\"dropdown-menu\">\n        <% _(langs).each(function(lang) { %>\n          <li>\n            <a href=\"#\" data-lang=\"<%= lang.extension %>\">\n               <i class=\"icon-<%= lang.extension %>\"></i>\n               <%= lang.name %>\n            </a>\n          </li>\n        <% }); %>\n    </ul>\n</div>\n<div class=\"modal fade\">\n    <div class=\"modal-header\">\n        <a class=\"close\" data-dismiss=\"modal\">close</a>\n        <h3>Generated <span class=\"im-code-lang\"></span> Code</h3>\n    </div>\n    <div class=\"modal-body\">\n        <pre class=\"im-generated-code prettyprint linenums\">\n        </pre>\n    </div>\n    <div class=\"modal-footer\">\n        <a href=\"#\" class=\"btn btn-save\"><i class=\"icon-file\"></i>Save</a>\n        <!-- <button href=\"#\" class=\"btn im-show-comments\" data-toggle=\"button\">Show Comments</button> -->\n        <a href=\"#\" data-dismiss=\"modal\" class=\"btn\">Close</a>\n    </div>\n</div>", {
        langs: CODE_GEN_LANGS
      });

      CodeGenerator.prototype.initialize = function(query) {
        this.query = query;
      };

      CodeGenerator.prototype.render = function() {
        this.$el.append(this.html);
        return this;
      };

      CodeGenerator.prototype.events = {
        'click .im-show-comments': 'showComments',
        'click .dropdown-menu a': 'getAndShowCode',
        'click .btn-action': 'doMainAction'
      };

      CodeGenerator.prototype.showComments = function(e) {
        if ($(e.target).is('.active')) {
          return this.compact();
        } else {
          return this.expand();
        }
      };

      CodeGenerator.prototype.getAndShowCode = function(e) {
        var $m, $t, xml,
          _this = this;
        $t = $(e.target);
        $m = this.$('.modal');
        this.lang = $t.data('lang') || this.lang;
        $m.find('h3 .im-code-lang').text(this.lang);
        this.$('a .im-code-lang').text(this.lang);
        if (this.lang === 'xml') {
          xml = this.query.toXML().replace(/></g, ">\n<");
          $m.find('pre').text(xml);
          $m.modal('show');
          return prettyPrint(function() {});
        } else {
          $m.find('.btn-save').attr({
            href: this.query.getCodeURI(this.lang)
          });
          return this.query.fetchCode(this.lang, function(code) {
            $m.find('pre').text(code);
            $m.modal('show');
            return prettyPrint(function() {});
          });
        }
      };

      CodeGenerator.prototype.doMainAction = function(e) {
        if (this.lang) {
          return this.getAndShowCode(e);
        } else {
          return $(e.target).next().dropdown('toggle');
        }
      };

      CodeGenerator.prototype.compact = function() {
        var $m;
        $m = this.$('.modal');
        $m.find('span.com').closest('li').slideUp();
        return $m.find('.linenums li').filter(function() {
          return $(this).text().replace(/\s+/g, "") === "";
        }).slideUp();
      };

      CodeGenerator.prototype.expand = function() {
        var $m;
        $m = this.$('.modal');
        return $m.find('linenums li').slideDown();
      };

      return CodeGenerator;

    })(Backbone.View);
    exporting(ListCreator = (function(_super) {

      __extends(ListCreator, _super);

      function ListCreator() {
        this.updateTagBox = __bind(this.updateTagBox, this);

        this.handleFailure = __bind(this.handleFailure, this);

        this.handleSuccess = __bind(this.handleSuccess, this);

        this.makeNewList = __bind(this.makeNewList, this);
        return ListCreator.__super__.constructor.apply(this, arguments);
      }

      ListCreator.prototype.html = "<div class=\"modal fade im-list-creation-dialogue\">\n    <div class=\"modal-header\">\n        <a class=\"close btn-cancel\">close</a>\n        <h2>List Details</h2>\n    </div>\n    <div class=\"modal-body\">\n        <form class=\"form form-horizontal\">\n            <p class=\"im-list-summary\"></p>\n            <fieldset class=\"control-group\">\n                <label>Name</label>\n                <input class=\"im-list-name input-xlarge\" type=\"text\" placeholder=\"required identifier\">\n                <span class=\"help-inline\"></span>\n            </fieldset>\n            <fieldset class=\"control-group\">\n                <label>Description</label>\n                <input class=\"im-list-desc input-xlarge\" type=\"text\" placeholder=\"an optional description\" >\n            </fieldset>\n            <fieldset class=\"control-group im-tag-options\">\n                <label>Add Tags</label>\n                <input type=\"text\" class=\"im-available-tags input-medium\" placeholder=\"categorize your list\">\n                <button class=\"btn im-confirm-tag\" disabled>Add</button>\n                <ul class=\"im-list-tags choices well\">\n                    <div style=\"clear:both\"></div>\n                </ul>\n                <h5><i class=\"icon-chevron-down\"></i>Suggested Tags</h5>\n                <ul class=\"im-list-tags suggestions well\">\n                    <div style=\"clear:both\"></div>\n                </ul>\n            </fieldset>\n            <input type=\"hidden\" class=\"im-list-type\">\n        </form>\n        <div class=\"alert alert-info im-selection-instruction\">\n            <b>Get started!</b> Choose items from the table below.\n            You can move this dialogue around by dragging it, if you \n            need access to a column it is covering up.\n        </div>\n    </div>\n    <div class=\"modal-footer\">\n        <div class=\"btn-group\">\n            <button class=\"btn btn-primary\">Create</button>\n            <button class=\"btn btn-cancel\">Cancel</button>\n            <button class=\"btn btn-reset\">Reset</button>\n        </div>\n    </div>\n</div>";

      ListCreator.prototype.initialize = function(query) {
        var _this = this;
        this.query = query;
        ListCreator.__super__.initialize.call(this, this.query);
        this.query.service.whoami(function(me) {
          _this.canTag = me.username != null;
          if (_this.rendered && !_this.canTag) {
            return _this.hideTagOptions();
          }
        });
        this.tags = new UniqItems();
        this.suggestedTags = new UniqItems();
        this.tags.on("add", this.updateTagBox);
        this.suggestedTags.on("add", this.updateTagBox);
        this.tags.on("remove", this.updateTagBox);
        return this.initTags();
      };

      ListCreator.prototype.hideTagOptions = function() {
        return this.$('.im-tag-options').hide();
      };

      ListCreator.prototype.newCommonType = function(type) {
        var $target, cd, copyNo, dateStr, ids, now, oq, text, textBase,
          _this = this;
        ListCreator.__super__.newCommonType.call(this, type);
        now = new Date();
        dateStr = ("" + now).replace(/\s\d\d:\d\d:\d\d\s.*$/, '');
        text = "" + type + " list - " + dateStr;
        $target = this.$('.im-list-name');
        if (this.usingDefaultName) {
          copyNo = 1;
          textBase = text;
          $target.val(text);
          this.query.service.fetchLists(function(ls) {
            var l, _i, _len, _ref;
            _ref = _.sortBy(ls, function(l) {
              return l.name;
            });
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              l = _ref[_i];
              if (l.name === text) {
                text = "" + textBase + " (" + (copyNo++) + ")";
                $target.val(text);
              }
            }
            return _this.usingDefaultName = true;
          });
          cd = this.query.service.model.classes[type];
          if (cd.fields['organism'] != null) {
            ids = _.keys(this.types);
            if (ids != null ? ids.length : void 0) {
              oq = {
                select: 'organism.shortName',
                from: type,
                where: {
                  id: _.keys(this.types)
                }
              };
              this.query.service.query(oq, function(orgQuery) {
                return orgQuery.count(function(c) {
                  if (c === 1) {
                    return orgQuery.rows(function(rs) {
                      var newVal;
                      newVal = "" + type + " list for " + rs[0][0] + " - " + dateStr;
                      textBase = newVal;
                      return $target.val(newVal);
                    });
                  }
                });
              });
            }
          }
        }
        return this.$('.im-list-type').val(type);
      };

      ListCreator.prototype.openDialogue = function(type, q) {
        ListCreator.__super__.openDialogue.call(this, type, q);
        return this.initTags();
      };

      ListCreator.prototype.initTags = function() {
        var add, c, now, _fn, _i, _len, _ref,
          _this = this;
        this.tags.reset();
        this.suggestedTags.reset();
        add = function(tag) {
          return _this.suggestedTags.add(tag, {
            silent: true
          });
        };
        _ref = this.query.constraints;
        _fn = function(c) {
          var title;
          title = c.title || c.path.replace(/^[^\.]+\./, "");
          if (c.op === "IN") {
            return add("source: " + c.value, silently);
          } else if (c.op === "=") {
            return add("" + title + ": " + c.value);
          } else if (c.op === "<") {
            return add("" + title + " below " + c.value);
          } else if (c.op === ">") {
            return add("" + title + " above " + c.value);
          } else if (c.type) {
            return add("" + title + " is a " + c.type);
          } else {
            return add("" + title + " " + c.op + " " + (c.value || c.values));
          }
        };
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          c = _ref[_i];
          _fn(c);
        }
        now = new Date();
        add("month: " + (now.getFullYear()) + "-" + (now.getMonth() + 1));
        add("year: " + (now.getFullYear()));
        add("day: " + (now.getFullYear()) + "-" + (now.getMonth() + 1) + "-" + (now.getDate()));
        return this.updateTagBox();
      };

      ListCreator.prototype.events = _.extend({}, ListDialogue.prototype.events, {
        'click .remove-tag': 'removeTag',
        'click .accept-tag': 'acceptTag',
        'click .im-confirm-tag': 'addTag',
        'click .btn-reset': 'reset',
        'click .control-group h5': 'rollUpNext'
      });

      ListCreator.prototype.rollUpNext = function(e) {
        $(e.target).next().slideToggle();
        return $(e.target).find("i").toggleClass("icon-chevron-right icon-chevron-down");
      };

      ListCreator.prototype.reset = function() {
        var field, _i, _len, _ref;
        _ref = ["name", "desc", "type"];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          field = _ref[_i];
          this.$(".im-list-" + field).val("");
        }
        return this.initTags();
      };

      ListCreator.prototype.create = function(q) {
        var $nameInput, illegals, listQ, newListDesc, newListName, newListTags, newListType, opts;
        $nameInput = this.$('.im-list-name');
        newListName = $nameInput.val();
        newListDesc = this.$('.im-list-desc').val();
        newListType = this.$('.im-list-type').val();
        newListTags = this.tags.map(function(t) {
          return t.get("item");
        });
        if (!newListName) {
          $nameInput.next().text("A list requires a name. Please enter one.");
          return $nameInput.parent().addClass("error");
        } else if (illegals = newListName.match(ILLEGAL_LIST_NAME_CHARS)) {
          $nameInput.next().text("This name contains illegal characters (" + illegals + "). Please remove them");
          return $nameInput.parent().addClass("error");
        } else {
          listQ = q || {
            select: ["id"],
            from: newListType,
            where: {
              id: _(this.types).keys()
            }
          };
          opts = {
            name: newListName,
            description: newListDesc,
            tags: newListTags
          };
          this.makeNewList(listQ, opts);
          return this.$('.btn-primary').unbind('click');
        }
      };

      ListCreator.prototype.makeNewList = function(query, opts) {
        var _this = this;
        if (query.service != null) {
          query.saveAsList(opts, this.handleSuccess).fail(this.handleFailure);
          return this.stop();
        } else {
          return this.query.service.query(query, function(q) {
            return _this.makeNewList(q, opts);
          });
        }
      };

      ListCreator.prototype.handleSuccess = function(list) {
        console.log("Created a list", list);
        return this.query.trigger("list-creation:success", list);
      };

      ListCreator.prototype.handleFailure = function(xhr, level, message) {
        if (xhr.responseText) {
          message = (JSON.parse(xhr.responseText)).error;
        }
        return this.query.trigger("list-creation:failure", message);
      };

      ListCreator.prototype.removeTag = function(e) {
        var tag;
        tag = $(e.target).closest('.label').find('.tag-text').text();
        this.tags.remove(tag);
        this.suggestedTags.add(tag);
        return $('.tooltip').remove();
      };

      ListCreator.prototype.acceptTag = function(e) {
        var tag;
        console.log("Accepting", e);
        tag = $(e.target).closest('.label').find('.tag-text').text();
        $('.tooltip').remove();
        this.suggestedTags.remove(tag);
        return this.tags.add(tag);
      };

      ListCreator.prototype.updateTagBox = function() {
        var box;
        box = this.$('.im-list-tags.choices');
        box.empty();
        this.tags.each(function(t) {
          var $li;
          $li = $("<li title=\"" + (t.escape("item")) + "\">\n    <span class=\"label label-warning\">\n        <i class=\"icon-tag icon-white\"></i>\n        <span class=\"tag-text\">" + (t.escape("item")) + "</span>\n        <a href=\"#\">\n            <i class=\"icon-remove-circle icon-white remove-tag\"></i>\n        </a>\n    </span>\n</li>");
          return $li.tooltip({
            placement: "top"
          }).appendTo(box);
        });
        box.append("<div style=\"clear:both\"></div>");
        box = this.$('.im-list-tags.suggestions');
        box.empty();
        this.suggestedTags.each(function(t) {
          var $li;
          $li = $("<li title=\"This tag is a suggestion. Click the 'ok' sign to add it\">\n    <span class=\"label\">\n        <i class=\"icon-tag icon-white\"></i>\n        <span class=\"tag-text\">" + (t.escape("item")) + "</span>\n        <a href=\"#\" class=\"accept-tag\">\n            <i class=\"icon-ok-circle icon-white\"></i>\n        </a>\n    </span>\n</li>");
          return $li.tooltip({
            placement: "top"
          }).appendTo(box);
        });
        return box.append("<div style=\"clear:both\"></div>");
      };

      ListCreator.prototype.addTag = function(e) {
        var tagAdder;
        e.preventDefault();
        tagAdder = this.$('.im-available-tags');
        this.tags.add(tagAdder.val());
        tagAdder.val("");
        return tagAdder.next().attr({
          disabled: true
        });
      };

      ListCreator.prototype.rendered = false;

      ListCreator.prototype.render = function() {
        var tagAdder,
          _this = this;
        ListCreator.__super__.render.call(this);
        this.updateTagBox();
        tagAdder = this.$('.im-available-tags');
        this.$('a').button();
        this.query.service.fetchLists(function(ls) {
          var tags;
          tags = _(ls).reduce((function(a, l) {
            return _.union(a, l.tags);
          }), []);
          return tagAdder.typeahead({
            source: tags,
            items: 10,
            matcher: function(item) {
              var pattern;
              if (!this.query) {
                return true;
              }
              pattern = new RegExp(this.query, "i");
              return pattern.test(item);
            }
          });
        });
        tagAdder.keyup(function(e) {
          _this.$('.im-confirm-tag').attr("disabled", false);
          if (e.which === 13) {
            return _this.addTag(e);
          }
        });
        if ((this.canTag != null) && !this.canTag) {
          this.hideTagOptions();
        }
        this.rendered = true;
        return this;
      };

      return ListCreator;

    })(ListDialogue));
    return ListManager = (function(_super) {

      __extends(ListManager, _super);

      function ListManager() {
        this.updateTypeOptions = __bind(this.updateTypeOptions, this);

        this.changeAction = __bind(this.changeAction, this);
        return ListManager.__super__.constructor.apply(this, arguments);
      }

      ListManager.prototype.tagName = "li";

      ListManager.prototype.className = "im-list-management dropdown";

      ListManager.prototype.initialize = function(query) {
        this.query = query;
        this.query.on("change:views", this.updateTypeOptions);
        this.query.on("change:constraints", this.updateTypeOptions);
        return this.action = ListManager.actions.create;
      };

      ListManager.prototype.html = "<a href=\"#\" class=\"btn\" data-toggle=\"dropdown\">\n    <i class=\"icon-list-alt\"></i>\n    <span class=\"im-only-widescreen\">Create / Add to</span>\n    List\n    <b class=\"caret\"></b>\n</a>\n<ul class=\"dropdown-menu im-type-options pull-right\">\n    <div class=\"btn-group\" data-toggle=\"buttons-radio\">\n        <button class=\"btn active im-list-action-chooser\" data-action=\"create\">\n            Create New List\n        </button>\n        <button class=\"btn im-list-action-chooser\" data-action=\"append\">\n            Add to Existing List\n        </button>\n    </div>\n</ul>";

      ListManager.prototype.events = {
        'click .btn-group > .im-list-action-chooser': 'changeAction',
        'click .im-pick-and-choose': 'startPicking'
      };

      ListManager.actions = {
        create: ListCreator,
        append: ListAppender
      };

      ListManager.prototype.changeAction = function(e) {
        var $t;
        e.stopPropagation();
        e.preventDefault();
        $t = $(e.target).button("toggle");
        return this.action = ListManager.actions[$t.data('action')];
      };

      ListManager.prototype.openDialogue = function(type, q) {
        var dialog;
        dialog = new this.action(this.query);
        dialog.render().$el.appendTo(this.el);
        return dialog.openDialogue(type, q);
      };

      ListManager.prototype.startPicking = function() {
        var dialog;
        dialog = new this.action(this.query);
        dialog.render().$el.appendTo(this.el);
        return dialog.startPicking();
      };

      ListManager.prototype.updateTypeOptions = function() {
        var node, ul, _fn, _i, _len, _ref,
          _this = this;
        ul = this.$('.im-type-options');
        ul.find("li").remove();
        _ref = this.query.getViewNodes();
        _fn = function(node) {
          var colNos, countQuery, i, li, v;
          li = $("<li></li>");
          ul.append(li);
          countQuery = _this.query.clone();
          countQuery.select([node.append("id").toPathString()]);
          countQuery.orderBy([]);
          li.click(function() {
            return _this.openDialogue(node.getType().name, countQuery);
          });
          colNos = (function() {
            var _j, _len1, _ref1, _results;
            _ref1 = this.query.views;
            _results = [];
            for (i = _j = 0, _len1 = _ref1.length; _j < _len1; i = ++_j) {
              v = _ref1[i];
              if (this.query.getPathInfo(v).getParent().toPathString() === node.toPathString()) {
                _results.push(i + 1);
              }
            }
            return _results;
          }).call(_this);
          li.mouseover(function() {
            return _this.query.trigger("start:highlight:node", node);
          });
          li.mouseout(function() {
            return _this.query.trigger("stop:highlight");
          });
          return countQuery.count(function(n) {
            var col, quantifier, typeName;
            if (n < 1) {
              return li.remove();
            }
            quantifier = (function() {
              switch (n) {
                case 1:
                  return "The";
                case 2:
                  return "Both";
                default:
                  return "All " + n;
              }
            })();
            typeName = intermine.utils.pluralise(node.getType().name, n);
            col = intermine.utils.pluralise("column", colNos.length);
            return li.append("<a href=\"#\">\n    " + quantifier + " " + typeName + " from " + col + " " + (colNos.join(", ")) + "\n</a>");
          });
        };
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          node = _ref[_i];
          _fn(node);
        }
        return ul.append("<li class=\"im-pick-and-choose\">\n    <a href=\"#\">Choose individual items from the table</a>\n</li>");
      };

      ListManager.prototype.render = function() {
        this.$el.append(this.html);
        this.updateTypeOptions();
        return this;
      };

      return ListManager;

    })(Backbone.View);
  });

  scope("intermine.results.formatters", {
    Manager: function(model, query, $cell) {
      var id, name, title;
      id = model.get('id');
      if (model.has('title') && model.has('name')) {
        title = model.get('title');
        name = model.get('name');
        return {
          value: "" + title + " " + name,
          field: "id"
        };
      } else {
        query.service.findById('Manager', id, function(manager) {
          var display;
          display = "" + manager.title + " " + manager.name;
          model.set({
            title: manager.title,
            name: manager.name
          });
          return $cell.find('.im-cell-link').text(display);
        });
        return {
          value: id,
          field: "id"
        };
      }
    }
  });

  scope("intermine.results", {
    getFormatter: function(model, type) {
      var formatter, t, types, _i, _len;
      formatter = null;
      type = type.name || type;
      types = [type].concat(model.getAncestorsOf(type));
      for (_i = 0, _len = types.length; _i < _len; _i++) {
        t = types[_i];
        formatter || (formatter = intermine.results.formatters[t]);
      }
      return formatter;
    }
  });

  scope("intermine.results.table", function(exporting) {
    var CELL_HTML, Cell, HIDDEN_FIELDS, NullCell, SubTable;
    CELL_HTML = _.template("<input class=\"list-chooser\" type=\"checkbox\" style=\"display: none\" data-obj-id=\"<%= id %>\" \n    <% if (selected) { %>checked <% }; %>\n    data-obj-type=\"<%= type %>\">\n<% if (value == null) { %>\n    <span class=\"null-value\">no value</span>\n<% } else { %>\n    <% if (url != null && url.match(/^http/)) { %>\n      <a class=\"im-cell-link\" href=\"<%= url %>\">\n        <% if (!url.match(window.location.origin)) { %>\n            <i class=\"icon-globe\"></i>\n        <% } %>\n    <% } else { %>\n      <a class=\"im-cell-link\" href=\"<%= base %><%= url %>\">\n    <% } %>\n        <%- value %>\n    </a>\n<% } %>\n<% if (field == 'url') { %>\n    <a class=\"im-cell-link external\" href=\"<%= value %>\"><i class=\"icon-globe\"></i>link</a>\n<% } %>");
    HIDDEN_FIELDS = ["class", "objectId"];
    exporting(SubTable = (function(_super) {

      __extends(SubTable, _super);

      function SubTable() {
        return SubTable.__super__.constructor.apply(this, arguments);
      }

      SubTable.prototype.tagName = "td";

      SubTable.prototype.className = "im-result-subtable";

      SubTable.prototype.initialize = function(query, cellify, subtable) {
        var _this = this;
        this.query = query;
        this.cellify = cellify;
        this.rows = subtable.rows;
        this.view = subtable.view;
        this.column = this.query.getPathInfo(subtable.column);
        this.query.on('expand:subtables', function(path) {
          if (path.toString() === _this.column.toString()) {
            return _this.$('.im-subtable').slideDown();
          }
        });
        return this.query.on('collapse:subtables', function(path) {
          if (path.toString() === _this.column.toString()) {
            return _this.$('.im-subtable').slideUp();
          }
        });
      };

      SubTable.prototype.getSummaryText = function() {
        if (this.column.isCollection()) {
          return "" + this.rows.length + " " + (this.column.getType().name) + "s";
        } else {
          if (this.rows.length === 0) {
            return "No " + (this.column.getType().name);
          } else {
            return "" + this.rows[0][0].value + " (" + (this.rows[0].slice(1).map(function(c) {
              return c.value;
            }).join(', ')) + ")";
          }
        }
      };

      SubTable.prototype.render = function() {
        var appendRow, colRoot, colStr, icon, row, summary, t, v, _fn, _i, _j, _len, _len1, _ref, _ref1,
          _this = this;
        icon = this.rows.length > 0 ? '<i class=icon-table></i>' : '<i class=icon-non-existent></i>';
        summary = $("<span>" + icon + "&nbsp;" + (this.getSummaryText()) + "</span>");
        summary.addClass('im-subtable-summary').appendTo(this.$el);
        t = $('<table><thead><tr></tr></thead><tbody></tbody></table>');
        colRoot = this.column.getType().name;
        colStr = this.column.toString();
        if (this.rows.length > 0) {
          _ref = this.view;
          _fn = function(v) {
            var path, th;
            th = $("<th>\n    <i class=\"" + intermine.css.headerIconRemove + "\"></i>\n    <span></span>\n</th>");
            th.find('i').click(function(e) {
              return _this.query.removeFromSelect(v);
            });
            path = _this.query.getPathInfo(v);
            _this.column.getDisplayName(function(colName) {
              var span, _ref1;
              span = th.find('span');
              if ((((_ref1 = path.end) != null ? _ref1.name : void 0) === 'id') && (intermine.results.getFormatter(_this.query.model, path.getParent().getType()) != null)) {
                path = path.getParent();
              }
              return path.getDisplayName(function(pathName) {
                if (pathName.match(colName)) {
                  return span.text(pathName.replace(colName, '').replace(/^\s*>?\s*/, ''));
                } else {
                  return span.text(pathName.replace(/^[^>]*\s*>\s*/, ''));
                }
              });
            });
            return t.children('thead').children('tr').append(th);
          };
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            v = _ref[_i];
            _fn(v);
          }
          appendRow = function(t, row) {
            var cell, tr, w, _fn1, _j, _len1;
            tr = $('<tr>');
            w = _this.$el.width() / _this.view.length;
            _fn1 = function(tr, cell) {
              return tr.append((_this.cellify(cell)).render().setWidth(w).el);
            };
            for (_j = 0, _len1 = row.length; _j < _len1; _j++) {
              cell = row[_j];
              _fn1(tr, cell);
            }
            t.children('tbody').append(tr);
            return null;
          };
          if (this.column.isCollection()) {
            _ref1 = this.rows;
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              row = _ref1[_j];
              appendRow(t, row);
            }
          } else {
            appendRow(t, this.rows[0]);
          }
        }
        t.addClass('im-subtable table table-condensed table-striped');
        this.$el.append(t);
        summary.css({
          cursor: 'pointer'
        }).click(function(e) {
          console.log(t);
          e.stopPropagation();
          if (t.is(':visible')) {
            _this.query.trigger('subtable:collapsed', _this.column);
          } else {
            _this.query.trigger('subtable:expanded', _this.column);
          }
          return t.slideToggle();
        });
        return this;
      };

      SubTable.prototype.getUnits = function() {
        if (this.rows.length = 0) {
          return this.view.length;
        } else {
          return _.reduce(this.rows[0], (function(a, item) {
            return a + (item.view != null ? item.view.length : 1);
          }), 0);
        }
      };

      SubTable.prototype.setWidth = function(w) {
        this.$el.css({
          width: (w * this.view.length) + "px"
        });
        this.$('.im-cell-link').css({
          "max-width": ((w * this.view.length) - 5) + "px"
        });
        return this;
      };

      return SubTable;

    })(Backbone.View));
    exporting(Cell = (function(_super) {

      __extends(Cell, _super);

      function Cell() {
        return Cell.__super__.constructor.apply(this, arguments);
      }

      Cell.prototype.tagName = "td";

      Cell.prototype.className = "im-result-field";

      Cell.prototype.getUnits = function() {
        return 1;
      };

      Cell.prototype.events = {
        'click': 'activateChooser'
      };

      Cell.prototype.initialize = function() {
        var _this = this;
        this.model.on("change:selected", function(model, selected) {
          _this.$el.toggleClass("active", selected);
          return _this.$('input').attr({
            checked: selected
          });
        });
        this.model.on("change:selectable", function(model, selectable) {
          return _this.$('input').attr({
            disabled: !selectable
          });
        });
        this.options.query.on("start:list-creation", function() {
          if (_this.model.get("selectable")) {
            return _this.$('input').show();
          }
        });
        this.options.query.on("stop:list-creation", function() {
          _this.$('input').hide();
          _this.$el.removeClass("active");
          return _this.model.set("selected", false);
        });
        this.options.query.on("start:highlight:node", function(node) {
          var _ref;
          if (((_ref = _this.options.node) != null ? _ref.toPathString() : void 0) === node.toPathString()) {
            return _this.$el.addClass("im-highlight");
          }
        });
        return this.options.query.on("stop:highlight", function() {
          return _this.$el.removeClass("im-highlight");
        });
      };

      Cell.prototype.setupPreviewOverlay = function() {
        var cellLink, content, id, s, type;
        content = $("<table class=\"im-item-details table table-condensed table-bordered\">\n<colgroup>\n    <col class=\"im-item-field\"/>\n    <col class=\"im-item-value\"/>\n</colgroup>\n</table>");
        type = this.model.get('type');
        id = this.model.get('id');
        s = this.options.query.service;
        return cellLink = this.$el.find('.im-cell-link').first().popover({
          placement: function() {
            var table;
            table = cellLink.closest("table");
            if (cellLink.offset().left + +cellLink.width() + 300 >= table.offset().left + table.width()) {
              return "left";
            } else {
              return "right";
            }
          },
          title: type,
          trigger: "hover",
          delay: {
            show: 500,
            hide: 100
          },
          content: function() {
            if (!cellLink.data("content")) {
              s.findById(type, id, function(item) {
                var field, getLeaves, v, value, values;
                for (field in item) {
                  value = item[field];
                  if (!(value && (__indexOf.call(HIDDEN_FIELDS, field) < 0) && !value['objectId'])) {
                    continue;
                  }
                  v = value + "";
                  v = v.length > 100 ? v.substring(0, 100) + "..." : v;
                  content.append("<tr>\n    <td>" + field + "</td>\n    <td>" + v + "</td>\n</tr>");
                }
                getLeaves = function(o) {
                  var leaf, leaves, name, values, x, _i, _len;
                  leaves = [];
                  values = (function() {
                    var _results;
                    _results = [];
                    for (name in o) {
                      leaf = o[name];
                      if (__indexOf.call(HIDDEN_FIELDS, name) < 0) {
                        _results.push(leaf);
                      }
                    }
                    return _results;
                  })();
                  for (_i = 0, _len = values.length; _i < _len; _i++) {
                    x = values[_i];
                    if (x['objectId']) {
                      leaves = leaves.concat(getLeaves(x));
                    } else {
                      leaves.push(x);
                    }
                  }
                  return leaves;
                };
                for (field in item) {
                  value = item[field];
                  if (!(value && value['objectId'])) {
                    continue;
                  }
                  values = getLeaves(value);
                  content.append("<tr>\n    <td>" + field + "</td>\n    <td>" + (values.join(', ')) + "</td>\n</tr>");
                }
                cellLink.data({
                  content: content
                });
                return cellLink.popover("show");
              });
            }
            return content;
          }
        });
      };

      Cell.prototype.render = function() {
        var data, formatter, id, type;
        type = this.model.get("type");
        id = this.model.get("id");
        if ((this.options.field === 'id') && (formatter = intermine.results.getFormatter(this.options.query.model, type))) {
          data = formatter(this.model, this.options.query, this.$el);
        } else {
          data = {
            value: this.model.get(this.options.field),
            field: this.options.field
          };
        }
        this.$el.append(CELL_HTML(_.extend({}, this.model.toJSON(), data))).toggleClass({
          active: this.model.get("selected")
        });
        if (id != null) {
          this.setupPreviewOverlay();
        }
        return this;
      };

      Cell.prototype.setWidth = function(w) {
        this.$el.css({
          width: w + "px"
        });
        this.$('.im-cell-link').css({
          "max-width": (w - 5) + "px"
        });
        return this;
      };

      Cell.prototype.activateChooser = function() {
        if (this.model.get("selectable")) {
          if (this.$('input').is(':visible')) {
            return this.model.set({
              selected: !this.model.get("selected")
            });
          }
        }
      };

      return Cell;

    })(Backbone.View));
    return exporting(NullCell = (function(_super) {

      __extends(NullCell, _super);

      function NullCell() {
        return NullCell.__super__.constructor.apply(this, arguments);
      }

      NullCell.prototype.setupPreviewOverlay = function() {};

      NullCell.prototype.initialize = function() {
        this.model = new Backbone.Model({
          selected: false,
          selectable: false,
          value: null,
          id: null,
          url: null,
          base: null,
          type: null
        });
        return NullCell.__super__.initialize.call(this);
      };

      return NullCell;

    })(Cell));
  });

  scope("intermine", function(exporting) {
    var utils;
    return exporting(utils = (function() {

      function utils() {}

      utils.pluralise = function(word, count) {
        if (count === 1) {
          return word;
        } else if (word.match(/(s|x|ch)$/)) {
          return word + "es";
        } else if (word.match(/[^aeiou]y$/)) {
          return word.replace(/y$/, "ies");
        } else {
          return word + "s";
        }
      };

      utils.numToString = function(num, sep, every) {
        var chars, groups, i, len, rets;
        rets = [];
        i = 0;
        chars = (num + "").split("");
        len = chars.length;
        groups = _(chars).groupBy(function(c, i) {
          return Math.floor((len - (i + 1)) / every).toFixed();
        });
        while (groups[i]) {
          rets.unshift(groups[i].join(""));
          i++;
        }
        return rets.join(sep);
      };

      utils.getParameter = function(params, name) {
        return _(params).chain().select(function(p) {
          return p.name === name;
        }).pluck('value').first().value();
      };

      utils.modelIsBio = function(model) {
        return !!(model != null ? model.classes['Gene'] : void 0);
      };

      utils.getOrganisms = function(query, cb) {
        var c, n, newView, nodes, onodes, onodes2, orgs, promise, restrictedOrganisms, toRun, v;
        restrictedOrganisms = (function() {
          var _i, _len, _ref, _results;
          _ref = query.constraints;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            c = _ref[_i];
            if (c.path.match(/(o|O)rganism/)) {
              _results.push(c.value);
            }
          }
          return _results;
        })();
        if (restrictedOrganisms.length) {
          return cb(restrictedOrganisms);
        } else {
          toRun = query.clone();
          orgs = [];
          nodes = (function() {
            var _i, _len, _ref, _results;
            _ref = toRun.views;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              v = _ref[_i];
              _results.push(toRun.getPathInfo(v).getParent());
            }
            return _results;
          })();
          onodes = (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = nodes.length; _i < _len; _i++) {
              n = nodes[_i];
              if (n.toPathString() === "Organism" || (n.getType().fields["organism"] != null)) {
                _results.push(n);
              }
            }
            return _results;
          })();
          onodes2 = ((function() {
            var _i, _len, _results;
            if (n.toPathString() === "Organism") {
              return n;
            } else {
              _results = [];
              for (_i = 0, _len = onodes.length; _i < _len; _i++) {
                n = onodes[_i];
                _results.push(n.append("organism"));
              }
              return _results;
            }
          })());
          newView = (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = onodes2.length; _i < _len; _i++) {
              n = onodes2[_i];
              _results.push("" + (n.toPathString()) + ".shortName");
            }
            return _results;
          })();
          toRun.views = _.uniq(newView);
          if (toRun.views.length) {
            toRun.sortOrder = [];
            promise = toRun.rows(function(rows) {
              var row, _i, _len;
              for (_i = 0, _len = rows.length; _i < _len; _i++) {
                row = rows[_i];
                orgs = orgs.concat(row);
              }
              return cb(_.uniq(orgs));
            });
            return promise.fail(function() {
              return cb(orgs);
            });
          } else {
            return cb(orgs);
          }
        }
      };

      return utils;

    })());
  });

  scope("intermine.model", function(exporting) {
    var FPObject, IMObject, NullObject;
    exporting(IMObject = (function(_super) {

      __extends(IMObject, _super);

      function IMObject() {
        return IMObject.__super__.constructor.apply(this, arguments);
      }

      IMObject.prototype.initialize = function(query, obj, field, base) {
        var m, pathInfo,
          _this = this;
        obj.type = obj["class"];
        obj[field] = obj.value;
        obj.base = base;
        obj.selected = false;
        obj.selectable = true;
        this.attributes = obj;
        m = query.service.model;
        pathInfo = m.getPathInfo(obj.type);
        query.on("selection:cleared", function() {
          return _this.set({
            selectable: true
          });
        });
        query.on("common:type:selected", function(type) {
          var typesAreCompatible;
          typesAreCompatible = type && (pathInfo.isa(type) || (m.getPathInfo(type).isa(_this.get("type"))));
          return _this.set({
            selectable: typesAreCompatible || !type
          });
        });
        return this.on("change:selected", function() {
          return query.trigger("imo:selected", this.get("type"), this.get("id"), this.get("selected"));
        });
      };

      IMObject.prototype.merge = function(obj, field) {
        return this.set(field, obj.value);
      };

      return IMObject;

    })(Backbone.Model));
    exporting(NullObject = (function(_super) {

      __extends(NullObject, _super);

      function NullObject() {
        return NullObject.__super__.constructor.apply(this, arguments);
      }

      NullObject.prototype.initialize = function(query, field, type) {
        this.attributes = {};
        this.set(field, null);
        this.set('id', null);
        this.set('type', type);
        this.set('selected', false);
        return this.set('selectable', false);
      };

      NullObject.prototype.merge = function() {};

      return NullObject;

    })(IMObject));
    return exporting(FPObject = (function(_super) {

      __extends(FPObject, _super);

      function FPObject() {
        return FPObject.__super__.constructor.apply(this, arguments);
      }

      FPObject.prototype.initialize = function(query, obj, field) {
        obj.type = obj["class"];
        obj[field] = obj.value;
        obj.selected = false;
        obj.selectable = false;
        return this.attributes = obj;
      };

      return FPObject;

    })(Backbone.Model));
  });

  scope("intermine.query.results", function(exporting) {
    var CompactView, DashBoard;
    exporting(DashBoard = (function(_super) {

      __extends(DashBoard, _super);

      function DashBoard() {
        return DashBoard.__super__.constructor.apply(this, arguments);
      }

      DashBoard.prototype.tagName = "div";

      DashBoard.prototype.className = "query-display row-fluid";

      DashBoard.prototype.initialize = function(service, query, queryEvents, tableProperties) {
        var _ref;
        this.query = query;
        this.queryEvents = queryEvents;
        this.tableProperties = tableProperties;
        console.log(this.tableProperties);
        if ((_ref = this.events) == null) {
          this.events = {};
        }
        if (_(service).isString()) {
          return this.service = new intermine.Service({
            root: service
          });
        } else if (service.fetchModel) {
          return this.service = service;
        } else {
          return this.service = new intermine.Service(service);
        }
      };

      DashBoard.prototype.TABLE_CLASSES = "span9 im-query-results";

      DashBoard.prototype.loadQuery = function(q) {
        var cb, evt, k, v, _ref, _ref1, _ref2, _results;
        this.main.empty();
        if ((_ref = this.toolbar) != null) {
          _ref.remove();
        }
        this.table = new intermine.query.results.Table(q, this.main);
        _ref1 = this.tableProperties;
        for (k in _ref1) {
          v = _ref1[k];
          this.table[k] = v;
        }
        this.table.render();
        this.renderTools(q);
        _ref2 = this.queryEvents;
        _results = [];
        for (evt in _ref2) {
          cb = _ref2[evt];
          _results.push(q.on(evt, cb));
        }
        return _results;
      };

      DashBoard.prototype.render = function() {
        var promise,
          _this = this;
        this.$el.addClass("bootstrap");
        promise = this.service.query(this.query, function(q) {
          _this.main = $(_this.make("div", {
            "class": _this.TABLE_CLASSES
          }));
          _this.$el.append(_this.main);
          _this.loadQuery(q);
          return _this.renderTrail(q);
        });
        promise.fail(function(xhr, err, msg) {
          return _this.$el.append("<div class=\"alert alert-error\">\n    <h1>" + err + "</h1>\n    <p>Unable to construct query: " + msg + "</p>\n</div>");
        });
        return this;
      };

      DashBoard.prototype.renderTools = function(q) {
        var tools;
        tools = this.make("div", {
          "class": "span3 im-query-toolbox"
        });
        this.$el.append(tools);
        this.toolbar = new intermine.query.tools.Tools(q);
        return this.toolbar.render().$el.appendTo(tools);
      };

      DashBoard.prototype.renderTrail = function(q) {
        var trail;
        trail = new intermine.query.tools.Trail(q, this);
        return trail.render().$el.prependTo(this.el);
      };

      return DashBoard;

    })(Backbone.View));
    return exporting(CompactView = (function(_super) {

      __extends(CompactView, _super);

      function CompactView() {
        return CompactView.__super__.constructor.apply(this, arguments);
      }

      CompactView.prototype.className = "im-query-display compact";

      CompactView.prototype.TABLE_CLASSES = "im-query-results";

      CompactView.prototype.renderTools = function(q) {
        this.toolbar = new intermine.query.tools.ToolBar(q);
        return this.toolbar.render().$el.insertBefore(this.main);
      };

      return CompactView;

    })(DashBoard));
  });

  scope('intermine.messages.results', {
    ReorderHelp: 'Drag the columns to reorder them'
  });

  scope('intermine.messages.columns', {
    OrderTitle: 'Add / Remove / Re-Arrange Columns',
    SortTitle: 'Define Sort-Order'
  });

  scope("intermine.query.results.table", function(exporting) {
    var ColumnAdder, ColumnsDialogue, NewViewNodes, OuterJoinGroup, ViewNode;
    OuterJoinGroup = (function(_super) {

      __extends(OuterJoinGroup, _super);

      function OuterJoinGroup() {
        return OuterJoinGroup.__super__.constructor.apply(this, arguments);
      }

      OuterJoinGroup.prototype.tagName = 'li';

      OuterJoinGroup.prototype.className = 'im-reorderable breadcrumb';

      OuterJoinGroup.prototype.initialize = function(query, newView) {
        this.query = query;
        this.newView = newView;
        return this.newView.on('destroy', this.remove, this);
      };

      OuterJoinGroup.prototype.render = function() {
        var h4, key, rem, ul, _fn, _i, _len, _ref,
          _this = this;
        this.$el.append('<i class="icon-reorder pull-right"></i>');
        this.$el.append("<a href=\"#\" class=\"pull-left im-col-remover\" title=\"Remove these columns\">\n    <i class=\"" + intermine.icons.Remove + "\"></i>\n</a>");
        rem = this.$('.im-col-remover').tooltip().click(function(e) {
          e.stopPropagation();
          rem.tooltip('hide');
          return _this.newView.destroy();
        });
        h4 = $('<h4>');
        this.$el.append(h4);
        this.newView.get('path').getDisplayName(function(name) {
          return h4.text(name);
        });
        this.$el.data('path', this.newView.get('path').toString());
        ul = $('<ul>');
        _ref = _.sortBy(_.keys(this.newView.nodes), function(k) {
          return k.length;
        });
        _fn = function(key) {
          var p, paths, _j, _len1, _results;
          paths = _this.newView.nodes[key];
          _results = [];
          for (_j = 0, _len1 = paths.length; _j < _len1; _j++) {
            p = paths[_j];
            _results.push((function(p) {
              var li;
              li = $("<li class=\"im-outer-joined-path\">\n    <a href=\"#\"><i class=\"" + intermine.icons.Remove + "\"></i></a>\n    <span></span>\n</li>");
              ul.append(li);
              li.find('a').click(function(e) {
                e.stopPropagation();
                return _this.newView.set({
                  paths: _.without(_this.newView.get('paths'), p)
                });
              });
              li.toggleClass('new', !!_this.newView.newPaths[p.toString()]);
              return p.getDisplayName(function(name) {
                return _this.newView.get('path').getDisplayName(function(ojname) {
                  return li.find('span').text(name.replace(ojname, '').replace(/^\s*>?\s*/, ''));
                });
              });
            })(p));
          }
          return _results;
        };
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          key = _ref[_i];
          _fn(key);
        }
        this.$el.append(ul);
        return this;
      };

      return OuterJoinGroup;

    })(Backbone.View);
    ColumnAdder = (function(_super) {

      __extends(ColumnAdder, _super);

      function ColumnAdder() {
        this.isDisabled = __bind(this.isDisabled, this);

        this.handleSubmission = __bind(this.handleSubmission, this);

        this.handleChoice = __bind(this.handleChoice, this);
        return ColumnAdder.__super__.constructor.apply(this, arguments);
      }

      ColumnAdder.prototype.className = "form node-adder btn-group";

      ColumnAdder.prototype.initialize = function(query) {
        ColumnAdder.__super__.initialize.call(this, query);
        return this.chosen = [];
      };

      ColumnAdder.prototype.handleChoice = function(path) {
        if (_.include(this.chosen, path)) {
          this.chosen = _.without(this.chosen, path);
        } else {
          this.chosen.push(path);
        }
        if (this.chosen.length > 0) {
          return this.$('.btn-primary').fadeIn('slow');
        } else {
          return this.$('.btn-primary').fadeOut('slow');
        }
      };

      ColumnAdder.prototype.handleSubmission = function(e) {
        e.preventDefault();
        e.stopPropagation();
        this.query.trigger('column-orderer:selected', this.chosen);
        return this.reset();
      };

      ColumnAdder.prototype.reset = function() {
        ColumnAdder.__super__.reset.call(this);
        this.chosen = [];
        this.$('.btn-chooser').button('reset');
        return this.$('.btn-primary').fadeOut('slow');
      };

      ColumnAdder.prototype.refsOK = false;

      ColumnAdder.prototype.multiSelect = true;

      ColumnAdder.prototype.isDisabled = function(path) {
        var _ref;
        return _ref = path.toString(), __indexOf.call(this.query.views, _ref) >= 0;
      };

      ColumnAdder.prototype.render = function() {
        ColumnAdder.__super__.render.call(this);
        this.$('input').remove();
        return this;
      };

      return ColumnAdder;

    })(intermine.query.ConstraintAdder);
    ViewNode = (function(_super) {

      __extends(ViewNode, _super);

      function ViewNode() {
        return ViewNode.__super__.constructor.apply(this, arguments);
      }

      ViewNode.prototype.initialize = function() {
        this.newPaths = {};
        if (this.get('isOuterJoined')) {
          this.nodes = _.groupBy(this.get('paths'), function(p) {
            return p.getParent().toString();
          });
        }
        if (!this.has('isNew')) {
          return this.set({
            isNew: false
          });
        }
      };

      ViewNode.prototype.addPath = function(path) {
        var node;
        node = this.nodes[path.getParent().toString()];
        if (node == null) {
          node = this.nodes[path.getParent().toString()] = [];
        }
        node.push(path);
        this.newPaths[path.toString()] = true;
        this.trigger("change");
        return this.trigger("change:paths");
      };

      ViewNode.prototype.getViews = function() {
        var key, ret, _fn, _i, _len, _ref,
          _this = this;
        if (this.get('isOuterJoined')) {
          ret = [];
          _ref = _.sortBy(_.keys(this.nodes), function(k) {
            return k.length;
          });
          _fn = function(key) {
            var node, p, _j, _len1, _results;
            node = _this.nodes[key];
            _results = [];
            for (_j = 0, _len1 = node.length; _j < _len1; _j++) {
              p = node[_j];
              _results.push(ret.push(p.toString()));
            }
            return _results;
          };
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            key = _ref[_i];
            _fn(key);
          }
        } else {
          ret = [this.get('path').toString()];
        }
        return ret;
      };

      return ViewNode;

    })(Backbone.Model);
    NewViewNodes = (function(_super) {

      __extends(NewViewNodes, _super);

      function NewViewNodes() {
        return NewViewNodes.__super__.constructor.apply(this, arguments);
      }

      NewViewNodes.prototype.model = ViewNode;

      return NewViewNodes;

    })(Backbone.Collection);
    return exporting(ColumnsDialogue = (function(_super) {

      __extends(ColumnsDialogue, _super);

      function ColumnsDialogue() {
        this.initSorting = __bind(this.initSorting, this);
        return ColumnsDialogue.__super__.constructor.apply(this, arguments);
      }

      ColumnsDialogue.prototype.tagName = "div";

      ColumnsDialogue.prototype.className = "im-column-dialogue modal fade";

      ColumnsDialogue.prototype.initialize = function(query) {
        var _this = this;
        this.query = query;
        this.newView = new NewViewNodes();
        this.newView.on('add remove change', this.drawOrder, this);
        this.newView.on('destroy', function(nv) {
          return _this.newView.remove(nv);
        });
        return this.query.on('column-orderer:selected', function(paths) {
          var ojg, ojgs, path, pstr, _i, _len, _results;
          _results = [];
          for (_i = 0, _len = paths.length; _i < _len; _i++) {
            path = paths[_i];
            pstr = path.toString();
            if (_this.query.isOuterJoined(pstr)) {
              ojgs = _this.newView.filter(function(nv) {
                return nv.get('isOuterJoined');
              }).filter(function(nv) {
                return !!pstr.match(nv.get('path').toString());
              });
              ojg = _.last(_.sortBy(ojgs, function(nv) {
                return nv.get('path').descriptors.length;
              }));
              _results.push(ojg.addPath(_this.query.getPathInfo(pstr)));
            } else {
              _results.push(_this.newView.add({
                path: _this.query.getPathInfo(pstr),
                isNew: true
              }));
            }
          }
          return _results;
        });
      };

      ColumnsDialogue.prototype.html = "<div class=\"modal-header\">\n    <a class=\"close\" data-dismiss=\"modal\">close</a>\n    <h3>Manage Columns</a>\n</div>\n<div class=\"modal-body\">\n    <ul class=\"nav nav-tabs\">\n        <li class=\"active\">\n            <a data-target=\".im-reordering\" data-toggle=\"tab\">\n                " + intermine.messages.columns.OrderTitle + "\n            </a>\n        </li>\n        <li>\n            <a data-target=\".im-sorting\" data-toggle=\"tab\">\n                " + intermine.messages.columns.SortTitle + "\n            </a>\n        </li>\n    </ul>\n    <div class=\"tab-content\">\n        <div class=\"tab-pane fade im-reordering active in\">\n            <div class=\"node-adder\"></div>\n            <ul class=\"im-reordering-container well\"></ul>\n        </div>\n        <div class=\"tab-pane fade im-sorting\">\n            <ul class=\"im-sorting-container well\"></ul>\n            <ul class=\"im-sorting-container-possibilities well\"></ul>\n        </div>\n    </div>\n</div>\n<div class=\"modal-footer\">\n    <a class=\"btn btn-cancel\">\n        Cancel\n    </a>\n    <a class=\"btn pull-right btn-primary\">\n        Apply\n    </a>\n</div>";

      ColumnsDialogue.prototype.viewTemplate = _.template("<li class=\"im-reorderable breadcrumb<% if (isNew) {%> new<% } %>\" data-path=\"<%- path %>\">\n    <i class=\"icon-reorder pull-right\"\"></i>\n    <a class=\"pull-left im-col-remover\" title=\"Remove this column\" href=\"#\">\n        <i class=\"" + intermine.icons.Remove + "\"></i>\n    </a>\n    <h4 class=\"im-display-name\"><%- path %></span>\n</li>");

      ColumnsDialogue.prototype.render = function() {
        var _this = this;
        this.$el.append(this.html);
        this.initOrdering();
        this.initSorting();
        this.$('.nav-tabs li a').each(function(i, e) {
          var $elem;
          $elem = $(e);
          return $elem.data({
            target: _this.$($elem.data("target"))
          });
        });
        return this;
      };

      ColumnsDialogue.prototype.events = {
        'hidden': 'remove',
        'click .btn-cancel': 'hideModal',
        'click .btn-primary': 'applyChanges',
        'click .nav-tabs li a': 'changeTab',
        'click .im-soe .im-remove-soe': 'removeSortOrder',
        'click .im-add-soe': 'addSortOrder',
        'click .im-sort-direction': 'sortCol',
        'sortupdate .im-reordering-container': 'updateOrder'
      };

      ColumnsDialogue.prototype.changeTab = function(e) {
        return $(e.target).tab("show");
      };

      ColumnsDialogue.prototype.initOrdering = function() {
        var isOuterJoined, node, oj, ojStr, path, paths, v, _i, _len, _ref,
          _this = this;
        this.newView.reset();
        this.ojgs = {};
        _ref = this.query.views;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          v = _ref[_i];
          path = this.query.getPathInfo(v);
          isOuterJoined = this.query.isOuterJoined(v);
          if (isOuterJoined) {
            oj = this.query.joins[path.toString()] === 'OUTER' ? path : null;
            node = path;
            while (!(node != null ? node.isRoot() : void 0)) {
              node = node.getParent();
              oj = this.query.joins[node.toString()] === 'OUTER' ? node : oj;
            }
            ojStr = oj.toString();
            if (!this.ojgs[ojStr]) {
              paths = this.query.views.filter(function(v) {
                return v.match(ojStr);
              }).map(function(v) {
                return _this.query.getPathInfo(v);
              });
              path = oj;
              this.newView.add({
                path: path,
                paths: paths,
                isOuterJoined: isOuterJoined
              }, {
                silent: true
              });
              this.ojgs[ojStr] = this.newView.last();
            }
          } else {
            this.newView.add({
              path: path,
              isOuterJoined: isOuterJoined
            }, {
              silent: true
            });
          }
        }
        return this.drawOrder();
      };

      ColumnsDialogue.prototype.drawOrder = function() {
        var ca, colContainer, nodeAdder,
          _this = this;
        colContainer = this.$('.im-reordering-container');
        colContainer.empty();
        colContainer.tooltip({
          title: intermine.messages.results.ReorderHelp,
          placement: 'top'
        });
        this.newView.each(function(newView, i) {
          var isFormatted, moveableView, ojg, path, rem, toShow, _ref;
          if (newView.get('isOuterJoined')) {
            ojg = new OuterJoinGroup(_this.query, newView);
            moveableView = ojg.render().el;
          } else {
            path = newView.get('path');
            moveableView = $(_this.viewTemplate(newView.toJSON()));
            rem = moveableView.find('.im-col-remover').tooltip().click(function(e) {
              rem.tooltip('hide');
              moveableView.remove();
              newView.destroy();
              return e.stopPropagation();
            });
            isFormatted = path.isAttribute && (((_ref = path.end) != null ? _ref.name : void 0) === 'id') && (intermine.results.getFormatter(_this.query.model, path.getParent().getType()) != null);
            toShow = isFormatted ? path.getParent() : path;
            toShow.getDisplayName(function(name) {
              return moveableView.find('.im-display-name').text(name);
            });
          }
          return colContainer.append(moveableView);
        });
        nodeAdder = this.$('.node-adder');
        ca = new ColumnAdder(this.query);
        nodeAdder.empty().append(ca.render().el);
        return colContainer.sortable({
          items: 'li.im-reorderable'
        });
      };

      ColumnsDialogue.prototype.updateOrder = function(e, ui) {
        var lis, newView, paths,
          _this = this;
        lis = this.$('.im-reordering-container li');
        paths = lis.map(function(i, e) {
          return $(e).data('path');
        }).get();
        newView = paths.map(function(p) {
          return _this.newView.find(function(nv) {
            return p === nv.get('path').toString();
          });
        });
        return this.newView.reset(newView);
      };

      ColumnsDialogue.prototype.sortCol = function(e) {
        var $elem, newDirection;
        $elem = $(e.target).parent();
        newDirection = $elem.data("direction") === "ASC" ? "DESC" : "ASC";
        $elem.data({
          direction: newDirection
        });
        return $(e.target).toggleClass("asc desc");
      };

      ColumnsDialogue.prototype.soTemplate = _.template("<li class=\"im-reorderable breadcrumb im-soe\" data-path=\"<%- path %>\" data-direction=\"<%- direction %>\">\n    <i class=\"icon-reorder pull-right\"></i>\n    <a class=\"pull-right im-remove-soe\" href=\"#\">\n        <i class=\"icon-minus\" title=\"Remove this column from the sort order\"></i>\n    </a>\n    <a class=\"pull-left im-sort-direction <% if (direction === 'ASC') { %>asc<% } else { %>desc<% } %>\" href=\"#\"></a>\n    <span class=\"im-path\" title=\"<%- path %>\"><%- path %></span>\n</li>");

      ColumnsDialogue.prototype.possibleSortOptionTemplate = _.template("<li class=\"breadcrumb\" data-path=\"<%- path %>\">\n    <i class=\"icon-reorder pull-right\"></i>\n    <a class=\"pull-right im-add-soe\" title=\"Add this column to the sort order\" href=\"#\">\n        <i class=\"icon-plus\"></i>\n    </a>\n    <span title=\"<%- path %>\"><%- path %></span>\n</li>");

      ColumnsDialogue.prototype.removeSortOrder = function(e) {
        var $elem, path, possibilities, psoe,
          _this = this;
        $elem = $(e.target).closest('.im-soe');
        path = $elem.data("path");
        $('.tooltip').remove();
        $elem.find('.im-remove-soe').tooltip("hide");
        $elem.remove();
        possibilities = this.$('.im-sorting-container-possibilities');
        psoe = $(this.possibleSortOptionTemplate({
          path: path
        }));
        (function(psoe) {
          return _this.query.getPathInfo(path).getDisplayName(function(name) {
            return psoe.find('span').text(name);
          });
        })(psoe);
        psoe.draggable({
          revert: "invalid",
          revertDuration: 100
        });
        psoe.find(".im-add-soe").tooltip();
        return possibilities.append(psoe);
      };

      ColumnsDialogue.prototype.addSortOrder = function(e) {
        var $elem, path;
        $elem = $(e.target).closest('.breadcrumb');
        path = $elem.data("path");
        $elem.find('.im-add-soe').tooltip('hide');
        $elem.remove();
        return this.$('.im-sorting-container').append(this.makeSortOrderElem({
          path: path,
          direction: "ASC"
        }));
      };

      ColumnsDialogue.prototype.sortingPlaceholder = "<div class=\"placeholder\">\n    Drop columns here.\n</div>";

      ColumnsDialogue.prototype.makeSortOrderElem = function(so) {
        var soe, _ref;
        soe = $(this.soTemplate(so));
        this.query.getPathInfo(so.path).getDisplayName(function(name) {
          return soe.find('.im-path').text(name);
        });
        if (_ref = this.query.getPathInfo(so.path).getType(), __indexOf.call(intermine.Model.NUMERIC_TYPES, _ref) >= 0) {
          soe.addClass("numeric");
        }
        soe.find('.im-remove-soe').tooltip();
        return soe;
      };

      ColumnsDialogue.prototype.makeSortOption = function(path) {
        var option,
          _this = this;
        option = $(this.possibleSortOptionTemplate({
          path: path
        }));
        (function(option) {
          return _this.query.getPathInfo(path).getDisplayName(function(name) {
            return option.find('span').text(name);
          });
        })(option);
        return option;
      };

      ColumnsDialogue.prototype.initSorting = function() {
        var cn, container, i, n, possibilities, so, v, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2, _ref3, _ref4,
          _this = this;
        container = this.$('.im-sorting-container');
        container.empty().append(this.sortingPlaceholder);
        _ref = this.query.sortOrder || [];
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          so = _ref[i];
          container.append(this.makeSortOrderElem(so));
        }
        possibilities = this.$('.im-sorting-container-possibilities');
        possibilities.empty();
        _ref1 = this.query.views;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          v = _ref1[_j];
          if (!this.query.getSortDirection(v) && !this.query.isOuterJoined(v)) {
            possibilities.append(this.makeSortOption(v));
          }
        }
        _ref2 = this.query.getQueryNodes();
        for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
          n = _ref2[_k];
          if (!this.query.isOuterJoined(n.toPathString())) {
            _ref3 = n.getChildNodes();
            for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
              cn = _ref3[_l];
              if (cn.isAttribute() && (_ref4 = cn.toPathString(), __indexOf.call(this.query.views, _ref4) < 0)) {
                possibilities.append(this.makeSortOption(cn.toPathString()));
              }
            }
          }
        }
        possibilities.find("li").draggable({
          revert: "invalid",
          revertDuration: 100
        });
        possibilities.find(".im-add-soe").tooltip();
        return container.sortable().droppable({
          drop: function(event, ui) {
            var path;
            path = $(ui.draggable).data("path");
            $(ui.draggable).remove();
            return container.append(_this.makeSortOrderElem({
              path: path,
              direction: "ASC"
            }));
          }
        });
      };

      ColumnsDialogue.prototype.hideModal = function() {
        return this.$el.modal('hide');
      };

      ColumnsDialogue.prototype.showModal = function() {
        return this.$el.modal({
          show: true
        });
      };

      ColumnsDialogue.prototype.applyChanges = function(e) {
        if (this.$('.im-reordering').is('.active')) {
          return this.changeOrder(e);
        } else {
          return this.changeSorting(e);
        }
      };

      ColumnsDialogue.prototype.changeOrder = function(e) {
        var newViews;
        newViews = _.flatten(this.newView.map(function(v) {
          return v.getViews();
        }));
        this.hideModal();
        return this.query.select(newViews);
      };

      ColumnsDialogue.prototype.changeSorting = function(e) {
        var lis, newSO;
        lis = this.$('.im-sorting-container li');
        newSO = lis.map(function(i, e) {
          return {
            path: $(e).data('path'),
            direction: $(e).data("direction")
          };
        }).get();
        this.hideModal();
        return this.query.orderBy(newSO);
      };

      return ColumnsDialogue;

    })(Backbone.View));
  });

  scope('intermine.snippets.facets', {
    OnlyOne: _.template("<div class=\"alert alert-info im-all-same\">\n    All <%= count %> values are the same: <strong><%= item %></strong>\n</div>")
  });

  scope("intermine.results", function(exporting) {
    var BooleanFacet, ColumnSummary, FACET_TEMPLATE, FACET_TITLE, FacetRow, FacetView, FrequencyFacet, HistoFacet, MORE_FACETS_HTML, NormalCurve, NumericFacet, PieFacet;
    NormalCurve = function(mean, stdev) {
      return function(x) {
        var a;
        a = x - mean;
        return Math.exp(-(a * a) / (2 * stdev * stdev)) / (Math.sqrt(2 * Math.PI) * stdev);
      };
    };
    MORE_FACETS_HTML = "<i class=\"icon-plus-sign pull-right\" title=\"Showing top ten. Click to see all values\"></i>";
    FACET_TITLE = _.template("<dt><i class=\"icon-chevron-right\"></i><%= title %></dt>");
    FACET_TEMPLATE = _.template("<dd>\n    <a href=#>\n        <b class=\"im-facet-count pull-right\">\n            (<%= count %>)\n        </b>\n        <%= item %>\n    </a>\n</dd>");
    exporting(ColumnSummary = (function(_super) {

      __extends(ColumnSummary, _super);

      function ColumnSummary() {
        this.render = __bind(this.render, this);
        return ColumnSummary.__super__.constructor.apply(this, arguments);
      }

      ColumnSummary.prototype.tagName = 'div';

      ColumnSummary.prototype.className = "im-column-summary";

      ColumnSummary.prototype.initialize = function(facet, query) {
        this.query = query;
        if (_(facet).isString()) {
          return this.facet = {
            path: facet,
            title: facet.replace(/^[^\.]+\./, "").replace(/\./g, " > "),
            ignoreTitle: true
          };
        } else {
          return this.facet = facet;
        }
      };

      ColumnSummary.prototype.render = function() {
        var attrType, clazz, fac, initialLimit;
        attrType = this.query.getPathInfo(this.facet.path).getType();
        if (__indexOf.call(intermine.Model.NUMERIC_TYPES, attrType) >= 0) {
          clazz = NumericFacet;
        } else {
          clazz = FrequencyFacet;
        }
        initialLimit = 400;
        fac = new clazz(this.query, this.facet, initialLimit, this.noTitle);
        this.$el.append(fac.el);
        fac.render();
        return this;
      };

      return ColumnSummary;

    })(Backbone.View));
    exporting(FacetView = (function(_super) {

      __extends(FacetView, _super);

      function FacetView() {
        this.render = __bind(this.render, this);
        return FacetView.__super__.constructor.apply(this, arguments);
      }

      FacetView.prototype.tagName = "dl";

      FacetView.prototype.initialize = function(query, facet, limit, noTitle) {
        this.query = query;
        this.facet = facet;
        this.limit = limit;
        this.noTitle = noTitle;
        this.query.on("change:constraints", this.render);
        return this.query.on("filter:summary", this.render);
      };

      FacetView.prototype.render = function() {
        var _this = this;
        if (!this.noTitle) {
          this.$dt = $(FACET_TITLE(this.facet)).appendTo(this.el);
          this.$dt.click(function() {
            _this.$dt.siblings().slideToggle();
            return _this.$dt.find('i').first().toggleClass('icon-chevron-right icon-chevron-down');
          });
        }
        return this;
      };

      return FacetView;

    })(Backbone.View));
    exporting(FrequencyFacet = (function(_super) {

      __extends(FrequencyFacet, _super);

      function FrequencyFacet() {
        this.addItem = __bind(this.addItem, this);
        return FrequencyFacet.__super__.constructor.apply(this, arguments);
      }

      FrequencyFacet.prototype.render = function(filterTerm) {
        var $progress, promise,
          _this = this;
        if (filterTerm == null) {
          filterTerm = "";
        }
        if (this.rendering) {
          return;
        }
        this.rendering = true;
        this.$el.empty();
        FrequencyFacet.__super__.render.call(this);
        $progress = $("<div class=\"progress progress-info progress-striped active\">\n    <div class=\"bar\" style=\"width:100%\"></div>\n</div>");
        $progress.appendTo(this.el);
        promise = this.query.filterSummary(this.facet.path, filterTerm, this.limit, function(items, total, filteredTotal) {
          var hasMore, hf, more, pf, _ref;
          _this.query.trigger("got:summary:total", _this.facet.path, total, items.length, filteredTotal);
          $progress.remove();
          if ((_ref = _this.$dt) != null) {
            _ref.append(" (" + total + ")");
          }
          hasMore = items.length < _this.limit ? false : total > _this.limit;
          if (hasMore) {
            more = $(MORE_FACETS_HTML).appendTo(_this.$dt).tooltip({
              placement: "left"
            }).click(function(e) {
              var got, show;
              e.stopPropagation();
              got = _this.$('dd').length;
              show = _this.$('dd').first().is(':visible');
              _this.query.summarise(_this.facet.path, function(items) {
                var item, _i, _len, _ref1, _results;
                _ref1 = items.slice(got);
                _results = [];
                for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                  item = _ref1[_i];
                  _results.push((_this.addItem(item)).toggle(show));
                }
                return _results;
              });
              return more.tooltip('hide').remove();
            });
          }
          if (total <= 12 && !_this.query.canHaveMultipleValues(_this.facet.path)) {
            pf = new PieFacet(_this.query, _this.facet, items, hasMore, filterTerm);
            _this.$el.append(pf.el);
            pf.render();
          } else {
            hf = new HistoFacet(_this.query, _this.facet, items, hasMore, filterTerm);
            _this.$el.append(hf.el);
            hf.render();
          }
          if (total <= 1) {
            _this.$el.empty();
            if (total === 1) {
              _this.$el.append(intermine.snippets.facets.OnlyOne(items[0]));
            } else {
              _this.$el.append("No results");
            }
          }
          return _this.rendering = false;
        });
        promise.fail(this.remove);
        return this;
      };

      FrequencyFacet.prototype.addItem = function(item) {
        var $dd,
          _this = this;
        $dd = $(FACET_TEMPLATE(item)).appendTo(this.el);
        $dd.click(function() {
          return _this.query.addConstraint({
            title: _this.facet.title,
            path: _this.facet.path,
            op: "=",
            value: item.item
          });
        });
        return $dd;
      };

      return FrequencyFacet;

    })(FacetView));
    exporting(NumericFacet = (function(_super) {

      __extends(NumericFacet, _super);

      function NumericFacet() {
        this.drawCurve = __bind(this.drawCurve, this);

        this.drawChart = __bind(this.drawChart, this);

        this.drawSlider = __bind(this.drawSlider, this);

        this.drawStats = __bind(this.drawStats, this);

        this.handleSummary = __bind(this.handleSummary, this);
        return NumericFacet.__super__.constructor.apply(this, arguments);
      }

      NumericFacet.prototype.events = {
        'click': function(e) {
          return e.stopPropagation();
        }
      };

      NumericFacet.prototype.className = "im-numeric-facet";

      NumericFacet.prototype.render = function() {
        var canvas, promise;
        NumericFacet.__super__.render.call(this);
        this.container = this.make("div", {
          "class": "facet-content im-facet"
        });
        this.$el.append(this.container);
        canvas = this.make("div");
        $(this.container).append(canvas);
        this.paper = Raphael(canvas, this.$el.width(), 75);
        this.throbber = $("<div class=\"progress progress-info progress-striped active\">\n    <div class=\"bar\" style=\"width:100%\"></div>\n</div>");
        this.throbber.appendTo(this.el);
        promise = this.query.summarise(this.facet.path, this.handleSummary);
        promise.fail(this.remove);
        return this;
      };

      NumericFacet.prototype.handleSummary = function(items, total) {
        var hasMore, hf, summary;
        this.throbber.remove();
        summary = items[0];
        if (summary.item != null) {
          if (items.length > 1) {
            hasMore = items.length < this.limit ? false : total > this.limit;
            this.paper.remove();
            hf = new HistoFacet(this.query, this.facet, items, hasMore, "");
            this.$el.append(hf.el);
            return hf.render();
          } else {
            return this.$el.empty().append(intermine.snippets.facets.OnlyOne(summary));
          }
        }
        this.mean = parseFloat(summary.average);
        this.dev = parseFloat(summary.stdev);
        this.max = summary.max;
        this.min = summary.min;
        if (summary.count != null) {
          this.drawChart(items);
        } else {
          this.drawCurve();
        }
        this.drawStats();
        return this.drawSlider();
      };

      NumericFacet.prototype.drawStats = function() {
        return $(this.container).append("<table class=\"table table-bordered table-condensed\">\n    <thead>\n        <tr>\n            <th>Min</th>\n            <th>Max</th>\n            <th>Mean</th>\n            <th>Standard Deviation</th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr>\n            <td>" + this.min + "</td>\n            <td>" + this.max + "</td>\n            <td>" + (this.mean.toFixed(5)) + "</td>\n            <td>" + (this.dev.toFixed(5)) + "</td>\n        </tr>\n    </tbody>\n</table>");
      };

      NumericFacet.prototype.drawSlider = function() {
        var $slider, step, _ref,
          _this = this;
        $(this.container).append("<label>Range:</label>\n<input type=\"text\" class=\"im-range-min input\" value=\"" + this.min + "\">\n<span>...</span>\n<input type=\"text\" class=\"im-range-max input\" value=\"" + this.max + "\">\n<button class=\"btn btn-primary disabled\">Apply</button>\n<button class=\"btn btn-cancel disabled\">Reset</button>\n<div class=\"slider\"></div>");
        step = (_ref = this.query.getType(this.facet.path)) === "int" || _ref === "Integer" ? 1 : 0.1;
        $slider = this.$('.slider').slider({
          range: true,
          min: this.min,
          max: this.max,
          values: [this.min, this.max],
          step: step,
          slide: function(e, ui) {
            var changed;
            changed = ui.values[0] > _this.min || ui.values[1] < _this.max;
            _this.$('.btn').toggleClass("disabled", !changed);
            _this.$('input.im-range-min').val(ui.values[0]);
            return _this.$('input.im-range-max').val(ui.values[1]);
          }
        });
        this.$('.btn-cancel').click(function() {
          $slider.slider('values', 0, _this.min);
          $slider.slider('values', 1, _this.max);
          _this.$('input.im-range-min').val(_this.min);
          _this.$('input.im-range-max').val(_this.max);
          return _this.$('.btn').addClass("disabled");
        });
        return this.$('.btn-primary').click(function() {
          _this.query.constraints = _(_this.query.constraints).filter(function(c) {
            return c.path !== _this.facet.path;
          });
          return _this.query.addConstraints([
            {
              path: _this.facet.path,
              op: ">=",
              value: _this.$('input.im-range-min').val()
            }, {
              path: _this.facet.path,
              op: "<=",
              value: _this.$('input.im-range-max').val()
            }
          ]);
        });
      };

      NumericFacet.prototype.drawChart = function(items) {
        var acceptableGap, baseLine, curX, fixity, gap, h, hh, i, item, lastX, leftMargin, max, p, stepWidth, tick, topMargin, val, w, xtick, yaxis, _fn, _fn1, _fn2, _i, _j, _k, _l, _len, _len1, _ref, _ref1,
          _this = this;
        h = 75;
        hh = h * 0.7;
        max = _.max(_.pluck(items, "count"));
        w = this.$el.closest(':visible').width() * 0.95;
        acceptableGap = Math.max(w / 15, ("" + items[0].max).split("").length * 5 * 1.5);
        console.log(acceptableGap, max);
        p = this.paper;
        gap = 0;
        topMargin = h * 0.1;
        leftMargin = 20;
        stepWidth = (w - (leftMargin + 1)) / items[0].buckets;
        baseLine = hh + topMargin;
        _fn = function(tick) {
          var line;
          line = p.path("M" + (leftMargin - 4) + "," + (baseLine - (hh / 10 * tick)) + " h" + (w - gap));
          return line.node.setAttribute("class", "tickline");
        };
        for (tick = _i = 0; _i <= 10; tick = ++_i) {
          _fn(tick);
        }
        yaxis = this.paper.path("M" + (leftMargin - 4) + ", " + baseLine + " v-" + hh);
        yaxis.node.setAttribute("class", "yaxis");
        _ref = [0, 5, 10];
        _fn1 = function(tick) {
          var t, val, ypos;
          ypos = baseLine - (hh / 10 * tick);
          val = max / 10 * tick;
          t = _this.paper.text(leftMargin - 6, ypos, val.toFixed()).attr({
            "text-anchor": "end",
            "font-size": "10px"
          });
          if ($.browser.webkit) {
            if (!_this.$el.offsetParent().filter(function() {
              return $(this).css("position") === "absolute";
            }).length) {
              return t.translate(0, -ypos);
            }
          }
        };
        for (_j = 0, _len = _ref.length; _j < _len; _j++) {
          tick = _ref[_j];
          _fn1(tick);
        }
        _fn2 = function(item, i) {
          var path, pathCmd, prop;
          prop = item.count / max;
          pathCmd = "M" + ((item.bucket - 1) * stepWidth + leftMargin) + "," + baseLine + " v-" + (hh * prop) + " h" + (stepWidth - gap) + " v" + (hh * prop) + " z";
          return path = _this.paper.path(pathCmd);
        };
        for (i = _k = 0, _len1 = items.length; _k < _len1; i = ++_k) {
          item = items[i];
          _fn2(item, i);
        }
        item = items[0];
        fixity = item.max - item.min > 5 ? 0 : 2;
        lastX = 0;
        for (xtick = _l = 0, _ref1 = item.buckets; 0 <= _ref1 ? _l <= _ref1 : _l >= _ref1; xtick = 0 <= _ref1 ? ++_l : --_l) {
          curX = xtick * stepWidth + leftMargin;
          if (lastX === 0 || curX - lastX >= acceptableGap || xtick === item.buckets) {
            lastX = curX;
            val = item.min + (xtick * ((item.max - item.min) / item.buckets));
            this.paper.text(curX, baseLine + 5, val.toFixed(fixity));
          }
        }
        return this;
      };

      NumericFacet.prototype.drawCurve = function() {
        var drawDivider, f, factor, getPathCmd, h, invert, nc, pathCmd, points, scale, sections, stdevs, w, x, xs, _i, _j, _ref, _results, _results1,
          _this = this;
        if (this.max === this.min) {
          $(this.el).remove();
          return;
        }
        sections = ((this.max - this.min) / this.dev).toFixed();
        w = this.$el.width();
        h = 75;
        nc = NormalCurve(w / 2, w / sections);
        factor = h / nc(w / 2);
        invert = function(x) {
          return h - x + 2;
        };
        scale = function(x) {
          return x * factor;
        };
        f = _.compose(invert, scale, nc);
        xs = (function() {
          _results = [];
          for (var _i = 1; 1 <= w ? _i <= w : _i >= w; 1 <= w ? _i++ : _i--){ _results.push(_i); }
          return _results;
        }).apply(this);
        points = _.zip(xs, (function() {
          var _j, _len, _results1;
          _results1 = [];
          for (_j = 0, _len = xs.length; _j < _len; _j++) {
            x = xs[_j];
            _results1.push(f(x));
          }
          return _results1;
        })());
        pathCmd = "M1," + h + "S" + (points.join(",")) + "L" + (w - 1) + "," + h + "Z";
        this.paper.path(pathCmd);
        _results1 = [];
        for (stdevs = _j = 0, _ref = (sections / 2) + 1; 0 <= _ref ? _j <= _ref : _j >= _ref; stdevs = 0 <= _ref ? ++_j : --_j) {
          xs = _.uniq([w / 2 - (stdevs * w / sections), w / 2 + (stdevs * w / sections)]);
          getPathCmd = function(x) {
            return "M" + x + "," + h + "L" + x + "," + (f(x));
          };
          drawDivider = function(x) {
            return _this.paper.path(getPathCmd(x));
          };
          _results1.push((function() {
            var _k, _len, _results2;
            _results2 = [];
            for (_k = 0, _len = xs.length; _k < _len; _k++) {
              x = xs[_k];
              if ((0 <= x && x <= w)) {
                _results2.push(drawDivider(x));
              }
            }
            return _results2;
          })());
        }
        return _results1;
      };

      return NumericFacet;

    })(FacetView));
    exporting(PieFacet = (function(_super) {

      __extends(PieFacet, _super);

      function PieFacet() {
        return PieFacet.__super__.constructor.apply(this, arguments);
      }

      PieFacet.prototype.className = 'im-grouped-facet im-facet';

      PieFacet.prototype.initialize = function(query, facet, items, hasMore, filterTerm) {
        var _ref,
          _this = this;
        this.query = query;
        this.facet = facet;
        this.hasMore = hasMore;
        this.filterTerm = filterTerm;
        this.items = new Backbone.Collection(items);
        this.items.each(function(item) {
          return item.set("visibility", true);
        });
        this.items.maxCount = (_ref = this.items.first()) != null ? _ref.get("count") : void 0;
        return this.items.on("change:selected", function() {
          var allAreSelected, someAreSelected;
          someAreSelected = _this.items.any(function(item) {
            return item.get("selected");
          });
          allAreSelected = !_this.items.any(function(item) {
            return !item.get("selected");
          });
          _this.$('.im-filter .btn').attr("disabled", !someAreSelected);
          return _this.$('.im-filter .btn-toggle-selection').attr("disabled", allAreSelected).toggleClass("im-invert", someAreSelected);
        });
      };

      PieFacet.prototype.events = {
        'click .im-filter .btn-primary': 'addConstraint',
        'click .im-filter .btn-cancel': 'resetOptions',
        'click .im-filter .btn-toggle-selection': 'toggleSelection',
        click: function(e) {
          e.stopPropagation();
          return e.preventDefault();
        }
      };

      PieFacet.prototype.resetOptions = function(e) {
        return this.items.each(function(item) {
          return item.set("selected", false);
        });
      };

      PieFacet.prototype.toggleSelection = function(e) {
        return this.items.each(function(item) {
          if (item.get("visibility")) {
            return item.set("selected", !item.get("selected"));
          }
        });
      };

      PieFacet.prototype.addConstraint = function(e) {
        var item, newCon, vals;
        newCon = {
          path: this.facet.path
        };
        vals = (function() {
          var _i, _len, _ref, _results;
          _ref = this.items.filter(function(item) {
            return item.get("selected");
          });
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            item = _ref[_i];
            _results.push(item.get("item"));
          }
          return _results;
        }).call(this);
        if (vals.length === 1) {
          if (vals[0] === null) {
            newCon.op = 'IS NULL';
          } else {
            newCon.op = '=';
            newCon.value = "" + vals[0];
          }
        } else {
          newCon.op = "ONE OF";
          newCon.values = vals;
        }
        if (!this.facet.ignoreTitle) {
          newCon.title = this.facet.title;
        }
        console.log(newCon);
        return this.query.addConstraint(newCon);
      };

      PieFacet.prototype.render = function() {
        return this.addChart().addControls();
      };

      PieFacet.GREEKS = "αβγδεζηθικλμνξορστυφχψω".split("");

      PieFacet.prototype.addChart = function() {
        var chart, cx, cy, degs, h, i, r, t, texts, total, w, _i, _len,
          _this = this;
        if (this.items.all(function(i) {
          return i.get("count") === 1;
        })) {
          return this;
        }
        h = 100;
        w = this.$el.closest(':visible').width();
        r = h * 0.8 / 2;
        chart = this.make("div");
        this.$el.append(chart);
        this.paper = Raphael(chart, w, h);
        cx = w / 2;
        cy = h / 2;
        total = this.items.reduce((function(a, b) {
          return a + b.get("count");
        }), 0);
        degs = 0;
        i = 0;
        texts = this.items.map(function(item) {
          var arc, cmd, dx, dy, path, prop, rads, t, textRads, textdx, textdy;
          prop = item.get("count") / total;
          item.set("percent", prop * 100);
          rads = 2 * Math.PI * prop;
          arc = prop > 0.5 ? 1 : 0;
          dy = r + (-r * Math.cos(rads));
          dx = r * Math.sin(rads);
          cmd = "M" + cx + "," + cy + " v-" + r + " a" + r + "," + r + " 0 " + arc + ",1 " + dx + "," + dy + " z";
          path = _this.paper.path(cmd);
          item.set("path", path);
          path.rotate(degs, cx, cy);
          textRads = (Raphael.rad(degs)) + (rads / 2);
          textdy = -(r * 0.6 * Math.cos(textRads));
          textdx = r * 0.6 * Math.sin(textRads);
          item.set("symbol", PieFacet.GREEKS[i++]);
          t = _this.paper.text(cx, cy, item.get("symbol"));
          t.attr({
            "font-size": "14px",
            "text-anchor": textdx > 0 ? "start" : "end"
          });
          t.translate(textdx, textdy);
          if ($.browser.webkit) {
            if (!_this.$el.offsetParent().filter(function() {
              return $(this).css("position") === "absolute";
            }).length) {
              t.translate(0, -(r * 1.5));
            }
          }
          t.node.setAttribute("class", "pie-label");
          degs += 360 * prop;
          return t;
        });
        for (_i = 0, _len = texts.length; _i < _len; _i++) {
          t = texts[_i];
          t.toFront();
        }
        return this;
      };

      PieFacet.prototype.addControls = function() {
        var $grp, $valFilter, facet, xs,
          _this = this;
        $grp = $("<form class=\"form form-horizontal\">\n    <div class=\"input-prepend\">\n        <span class=\"add-on\"><i class=\"icon-refresh\"></i></span><input type=\"text\" class=\"input-medium search-query filter-values\" placeholder=\"Filter values\">\n    </div>\n    <div class=\"im-item-table\">\n        <table class=\"table table-condensed\">\n            <thead>\n                <tr>" + this.columnHeaders + "</tr>\n            </thead>\n            <tbody class=\"scrollable\"></tbody>\n        </table>\n    </div>\n</form>").appendTo(this.el);
        $grp.button();
        this.items.each(function(item) {
          var r;
          r = _this.makeRow(item);
          return $grp.find('tbody').append(r);
        });
        $grp.append("<div class=\"im-filter btn-group\">\n    <button type=\"submit\" class=\"btn btn-primary\" disabled>Filter</button>\n    <button class=\"btn btn-cancel\" disabled>Reset</button>\n    <button class=\"btn btn-toggle-selection\"></button>\n</div>");
        xs = this.items;
        $valFilter = $grp.find(".filter-values");
        if (this.filterTerm) {
          $valFilter.val(this.filterTerm);
        }
        facet = this;
        $valFilter.keyup(function(e) {
          var pattern;
          if (facet.hasMore || (facet.filterTerm && $(this).val().length < facet.filterTerm.length)) {
            return _.delay((function() {
              return facet.query.trigger('filter:summary', $valFilter.val());
            }), 750);
          } else {
            pattern = new RegExp($(this).val(), "i");
            return xs.each(function(x) {
              return x.set("visibility", pattern.test(x.get("item")));
            });
          }
        });
        $valFilter.prev().click(function(e) {
          $(this).next().val(facet.filterTerm);
          return xs.each(function(x) {
            return x.set("visibility", true);
          });
        });
        return this;
      };

      PieFacet.prototype.columnHeaders = "<th class=\"im-selector-col\"></th>\n<th class=\"im-item-col\">Item</th>\n<th class=\"im-count-col\">Count</th>\n<th class=\"im-prop-count\"></th>";

      PieFacet.prototype.makeRow = function(item) {
        var row;
        row = new FacetRow(item, this.items);
        return row.render().$el;
      };

      return PieFacet;

    })(Backbone.View));
    exporting(FacetRow = (function(_super) {

      __extends(FacetRow, _super);

      function FacetRow() {
        return FacetRow.__super__.constructor.apply(this, arguments);
      }

      FacetRow.prototype.tagName = "tr";

      FacetRow.prototype.className = "im-facet-row";

      FacetRow.prototype.initialize = function(item, items) {
        var _this = this;
        this.item = item;
        this.items = items;
        this.item.on("change:selected", function() {
          var isSelected;
          isSelected = _this.item.get("selected");
          if (_this.item.get("path")) {
            item.get("path").node.setAttribute("class", isSelected ? "selected" : "");
          }
          _this.$el.toggleClass("active", isSelected);
          if (isSelected !== _this.$('input').attr("checked")) {
            return _this.$('input').attr("checked", isSelected);
          }
        });
        return this.item.on("change:visibility", function() {
          return _this.$el.toggle(_this.item.get("visibility"));
        });
      };

      FacetRow.prototype.events = {
        'click': 'handleClick',
        'change input': 'handleChange'
      };

      FacetRow.prototype.render = function() {
        var percent;
        percent = (parseInt(this.item.get("count")) / this.items.maxCount * 100).toFixed();
        this.$el.append("<td class=\"im-selector-col\">\n    <span>" + ((this.item.get("symbol")) || "") + "</span>\n    <input type=\"checkbox\">\n</td>\n<td class=\"im-item-col\">" + (this.item.get("item")) + "</td>\n<td class=\"im-count-col\">\n    <div class=\"im-facet-bar\" style=\"width:" + percent + "%\">\n        " + (this.item.get("count")) + "\n    </div>\n</td>");
        if (this.item.get("percent")) {
          this.$el.append("<td class=\"im-prop-col\"><i>" + (this.item.get("percent").toFixed()) + "%</i></td>");
        }
        return this;
      };

      FacetRow.prototype.handleClick = function(e) {
        e.stopPropagation();
        if (e.target.type !== 'checkbox') {
          return this.$('input').trigger("click");
        }
      };

      FacetRow.prototype.handleChange = function(e) {
        e.stopPropagation();
        return this.item.set("selected", this.$('input').is(':checked'));
      };

      return FacetRow;

    })(Backbone.View));
    exporting(HistoFacet = (function(_super) {

      __extends(HistoFacet, _super);

      function HistoFacet() {
        return HistoFacet.__super__.constructor.apply(this, arguments);
      }

      HistoFacet.prototype.columnHeaders = "<th></th>\n<th>Item</th>\n<th>Count</th>";

      HistoFacet.prototype.addChart = function() {
        var baseline, chart, f, gap, h, hh, leftMargin, max, p, stepWidth, tick, topMargin, w, yaxis, _fn, _fn1, _i, _j,
          _this = this;
        h = 75;
        hh = h * 0.8;
        w = this.$el.closest(':visible').width() * 0.95;
        f = this.items.first();
        max = f.get("count");
        if (this.items.all(function(i) {
          return i.get("count") === 1;
        })) {
          return this;
        }
        chart = this.make("div");
        this.$el.append(chart);
        p = this.paper = Raphael(chart, w, h);
        gap = w * 0.01;
        topMargin = h * 0.1;
        leftMargin = 30;
        stepWidth = (w - (leftMargin + 1)) / this.items.size();
        baseline = hh + topMargin;
        _fn = function(tick) {
          var line;
          line = p.path("M" + (leftMargin - 4) + "," + (baseline - (hh / 10 * tick)) + " h" + (w - gap));
          return line.node.setAttribute("class", "tickline");
        };
        for (tick = _i = 0; _i <= 10; tick = ++_i) {
          _fn(tick);
        }
        yaxis = this.paper.path("M" + (leftMargin - 4) + "," + baseline + " v-" + hh);
        yaxis.node.setAttribute("class", "yaxis");
        _fn1 = function(tick) {
          var t, val, ypos;
          ypos = baseline - (hh / 10 * tick);
          val = max / 10 * tick;
          if (!(val % 1)) {
            t = _this.paper.text(leftMargin - 6, ypos, val.toFixed()).attr({
              "text-anchor": "end",
              "font-size": "10px"
            });
            if ($.browser.webkit) {
              if (!_this.$el.offsetParent().filter(function() {
                return $(this).css("position") === "absolute";
              }).length) {
                return t.translate(0, -ypos);
              }
            }
          }
        };
        for (tick = _j = 0; _j <= 10; tick = ++_j) {
          _fn1(tick);
        }
        this.items.each(function(item, i) {
          var path, pathCmd, prop;
          prop = item.get("count") / max;
          pathCmd = "M" + (i * stepWidth + leftMargin) + "," + baseline + " v-" + (hh * prop) + " h" + (stepWidth - gap) + " v" + (hh * prop) + " z";
          path = _this.paper.path(pathCmd);
          return item.set("path", path);
        });
        return this;
      };

      return HistoFacet;

    })(PieFacet));
    return exporting(BooleanFacet = (function(_super) {

      __extends(BooleanFacet, _super);

      function BooleanFacet() {
        this.drawControls = __bind(this.drawControls, this);

        this.drawChart = __bind(this.drawChart, this);

        this.handleSummary = __bind(this.handleSummary, this);
        return BooleanFacet.__super__.constructor.apply(this, arguments);
      }

      BooleanFacet.prototype.handleSummary = function(items) {
        var f, n, t, total;
        t = _(items).find(function(i) {
          return i.item === true;
        });
        f = _(items).find(function(i) {
          return i.item === false;
        });
        n = _(items).find(function(i) {
          return i.item === null;
        });
        total = ((t != null ? t.count : void 0) || 0) + ((f != null ? f.count : void 0) || 0) + ((n != null ? n.count : void 0) || 0);
        this.drawChart(total, (f != null ? f.count : void 0) || 0);
        return this.drawControls(total, (f != null ? f.count : void 0) || 0);
      };

      BooleanFacet.prototype.drawChart = function(total, subtotal) {
        var cx, cy, degs, fprop, h, i, prop, r, t, texts, tprop, w, _i, _len;
        h = 75;
        w = this.$el.closest(':visible').width();
        r = h * 0.8 / 2;
        cx = w / 2;
        cy = h / 2;
        fprop = subtotal / total;
        tprop = 1 - fprop;
        if (fprop === 0 || fprop === 1) {
          this.paper.circle(cx, cy, r);
          t = this.paper.text(cx, cy, (fprop === 1 ? "false" : "true") + (" (" + total + ")"));
          t.attr({
            "font-size": "16px"
          });
          return this;
        }
        degs = 0;
        texts = (function() {
          var _i, _len, _ref, _results,
            _this = this;
          _ref = [fprop, tprop];
          _results = [];
          for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
            prop = _ref[i];
            _results.push((function(prop, i) {
              var arc, cmd, dx, dy, num, path, rads, textRads, textdx, textdy;
              rads = 2 * Math.PI * prop;
              arc = (0.5 < prop && prop < 1) ? 1 : 0;
              dy = r + (-r * Math.cos(rads));
              dx = r * Math.sin(rads);
              cmd = "M" + cx + "," + cy + " v-" + r + " a" + r + "," + r + " 0 " + arc + ",1 " + dx + "," + dy + " z";
              path = _this.paper.path(cmd);
              if (i === 0) {
                _this.fpath = path;
              } else {
                _this.tpath = path;
              }
              path.rotate(degs, cx, cy);
              textRads = (Raphael.rad(degs)) + (rads / 2);
              textdy = -(r * 1.1 * Math.cos(textRads));
              textdx = r * 1.1 * Math.sin(textRads);
              num = i === 0 ? subtotal : total - subtotal;
              t = _this.paper.text(cx, cy, "" + (i === 0 ? "false" : "true") + " (" + num + ")");
              t.attr({
                "font-size": "12px",
                "text-anchor": textdx > 0 ? "start" : "end"
              });
              t.translate(textdx, textdy);
              if ($.browser.webkit) {
                if (!_this.$el.offsetParent().filter(function() {
                  return $(this).css("position") === "absolute";
                }).length) {
                  t.translate(0, -(r * 1.5));
                }
              }
              degs += 360 * prop;
              return t;
            })(prop, i));
          }
          return _results;
        }).call(this);
        for (_i = 0, _len = texts.length; _i < _len; _i++) {
          t = texts[_i];
          t.toFront;
        }
        return this;
      };

      BooleanFacet.prototype.drawControls = function(total, trues) {
        var c, handleTheTruth,
          _this = this;
        if (!(this.fpath && this.tpath)) {
          return this;
        }
        c = $(this.container).append("<form class=\"form-inline\">\n    <div class=\"btn-group\" data-toggle=\"buttons-radio\">\n        <a href=\"#\" class=\"btn im-trues\">True</a>\n        <a href=\"#\" class=\"btn im-falses\">False</a>\n    </div>\n    <div class=\"pull-right im-filter\">\n        <button class=\"btn btn-primary disabled\">Filter</button>\n        <button class=\"btn btn-cancel disabled\">Reset</button>\n    </div>\n</form>");
        c.find('.btn-group').button().find('.btn').click(function(e) {
          return c.find('.im-filter .btn').removeClass("disabled");
        });
        c.find('.btn-cancel').click(function(e) {
          _this.tpath.node.setAttribute("class", "trues");
          _this.fpath.node.setAttribute("class", "falses");
          c.find('.im-filter .btn').addClass("disabled");
          return c.find('.btn').removeClass("active");
        });
        c.find('.btn-primary').click(function(e) {
          return _this.query.addConstraint({
            path: _this.facet.path,
            op: '=',
            value: c.find('.im-trues').is('.active') ? "true" : "false"
          });
        });
        handleTheTruth = function(selPath) {
          return function(e) {
            _this.tpath.node.setAttribute("class", "");
            _this.fpath.node.setAttribute("class", "");
            selPath.node.setAttribute("class", "selected");
            return $(e.target).button('toggle');
          };
        };
        c.find('.im-trues').click(handleTheTruth(this.tpath));
        return c.find('.im-falses').click(handleTheTruth(this.fpath));
      };

      return BooleanFacet;

    })(NumericFacet));
  });

  scope('intermine.query.tools', function(exporting) {
    var ManagementTools;
    return exporting(ManagementTools = (function(_super) {

      __extends(ManagementTools, _super);

      function ManagementTools() {
        return ManagementTools.__super__.constructor.apply(this, arguments);
      }

      ManagementTools.prototype.initialize = function(query) {
        this.query = query;
        return this.query.on("change:constraints", this.checkHasFilters, this);
      };

      ManagementTools.prototype.checkHasFilters = function() {
        return this.$('.im-filters').toggleClass("im-has-constraint", this.query.constraints.length > 0);
      };

      ManagementTools.prototype.tagName = "div";

      ManagementTools.prototype.className = "im-management-tools btn-group";

      ManagementTools.prototype.html = "<button class=\"btn btn-large im-columns\">\n    <i class=\"" + intermine.icons.Columns + "\"></i>\n    <span class=\"im-only-widescreen\">Manage </span>\n    <span class=\"hidden-tablet\">Columns</span>\n</button>\n<button class=\"btn btn-large im-filters\">\n    <i class=\"" + intermine.icons.Filter + "\"></i>\n    <span class=\"im-only-widescreen\">Manage </span>\n    <span class=\"hidden-tablet\">Filters</span>\n</button>";

      ManagementTools.prototype.events = {
        'click .im-columns': 'showColumnDialogue',
        'click .im-filters': 'showFilterDialogue'
      };

      ManagementTools.prototype.showColumnDialogue = function(e) {
        var dialogue;
        dialogue = new intermine.query.results.table.ColumnsDialogue(this.query);
        this.$el.append(dialogue.el);
        return dialogue.render().showModal();
      };

      ManagementTools.prototype.showFilterDialogue = function(e) {
        var dialogue;
        dialogue = new intermine.query.filters.FilterManager(this.query);
        this.$el.append(dialogue.el);
        return dialogue.render().showModal();
      };

      ManagementTools.prototype.render = function() {
        this.$el.append(this.html);
        this.checkHasFilters();
        return this;
      };

      return ManagementTools;

    })(Backbone.View));
  });

  scope("intermine.conbuilder.messages", {
    ValuePlaceholder: 'David*',
    ExtraPlaceholder: 'Wernham-Hogg',
    ExtraLabel: 'within',
    IsA: 'is a'
  });

  scope("intermine.query", function(exporting) {
    var ActiveConstraint, NewConstraint, PATH_SEGMENT_DIVIDER;
    PATH_SEGMENT_DIVIDER = "&rarr;";
    exporting(ActiveConstraint = (function(_super) {

      __extends(ActiveConstraint, _super);

      function ActiveConstraint() {
        return ActiveConstraint.__super__.constructor.apply(this, arguments);
      }

      ActiveConstraint.prototype.tagName = "form";

      ActiveConstraint.prototype.className = "form-inline im-constraint row-fluid";

      ActiveConstraint.prototype.initialize = function(query, orig) {
        var _ref;
        this.query = query;
        this.orig = orig;
        this.typeaheads = [];
        this.path = this.query.getPathInfo(this.orig.path);
        this.type = this.path.getEndClass();
        this.con = new Backbone.Model(_.extend({}, this.orig));
        if (this.path.isClass()) {
          return this.ops = intermine.Query.REFERENCE_OPS;
        } else if (_ref = this.path.getType(), __indexOf.call(intermine.Model.BOOLEAN_TYPES, _ref) >= 0) {
          return this.ops = ["=", "!="].concat(intermine.Query.NULL_OPS);
        } else if (this.con.has('values')) {
          return this.ops = intermine.Query.ATTRIBUTE_OPS;
        } else {
          return this.ops = intermine.Query.ATTRIBUTE_VALUE_OPS.concat(intermine.Query.NULL_OPS);
        }
      };

      ActiveConstraint.prototype.events = {
        'change .im-ops': 'drawValueOptions',
        'click .icon-edit': 'toggleEditForm',
        'click .btn-cancel': 'hideEditForm',
        'click .btn-primary': 'editConstraint',
        'click .icon-remove-sign': 'removeConstraint',
        'submit': function(e) {
          e.preventDefault();
          return e.stopPropagation();
        }
      };

      ActiveConstraint.prototype.toggleEditForm = function() {
        this.$('.im-con-overview').siblings().slideToggle(200);
        return this.$('.im-value-options').show();
      };

      ActiveConstraint.prototype.hideEditForm = function(e) {
        var ta, _results;
        if (e != null) {
          e.preventDefault();
        }
        if (e != null) {
          e.stopPropagation();
        }
        this.$('.im-con-overview').siblings().slideUp(200);
        _results = [];
        while ((ta = this.typeaheads.shift())) {
          _results.push(ta.remove());
        }
        return _results;
      };

      ActiveConstraint.prototype.valid = function() {
        var op;
        if (!this.con.has('op')) {
          return false;
        }
        op = this.con.get('op');
        if (__indexOf.call(intermine.Query.ATTRIBUTE_VALUE_OPS.concat(intermine.Query.REFERENCE_OPS), op) >= 0) {
          return this.con.has('value');
        }
        if (__indexOf.call(intermine.Query.MULTIVALUE_OPS, op) >= 0) {
          return this.con.has('values');
        }
        return true;
      };

      ActiveConstraint.prototype.editConstraint = function(e) {
        var silently, ta, _ref, _ref1, _ref2, _results;
        e.stopPropagation();
        e.preventDefault();
        if (!this.valid()) {
          this.$el.addClass('error');
          return false;
        }
        this.removeConstraint(e, silently = true);
        if (_ref = this.con.get('op'), __indexOf.call(intermine.Query.MULTIVALUE_OPS.concat(intermine.Query.NULL_OPS), _ref) >= 0) {
          this.con.unset('value');
        }
        if (_ref1 = this.con.get('op'), __indexOf.call(intermine.Query.ATTRIBUTE_VALUE_OPS.concat(intermine.Query.NULL_OPS), _ref1) >= 0) {
          this.con.unset('values');
        }
        if ((_ref2 = this.con.get('op'), __indexOf.call(intermine.Query.MULTIVALUE_OPS, _ref2) >= 0) && this.con.get('values').length === 0) {
          this.query.trigger("change:constraints");
        } else {
          this.query.addConstraint(this.con.toJSON());
        }
        _results = [];
        while ((ta = this.typeaheads.shift())) {
          _results.push(ta.remove());
        }
        return _results;
      };

      ActiveConstraint.prototype.removeConstraint = function(e, silently) {
        if (silently == null) {
          silently = false;
        }
        return this.query.removeConstraint(this.orig, silently);
      };

      ActiveConstraint.prototype.addIcons = function($label) {
        $label.append("<a href=\"#\"><i class=\"icon-remove-sign\"></i></a>");
        if (this.con.locked) {
          return $label.append("<a href=\"#\"><i class=\"icon-lock\" title=\"this constraint is not editable\"></i></a>");
        } else {
          return $label.append("<a href=\"#\"><i class=\"icon-edit\"></i></a>");
        }
      };

      ActiveConstraint.prototype.buttons = [
        {
          text: "Update",
          "class": "btn btn-primary"
        }, {
          text: "Cancel",
          "class": "btn btn-cancel"
        }
      ];

      ActiveConstraint.prototype.addButtons = function() {
        var btns, c, t, _fn, _i, _len, _ref, _ref1;
        btns = $("<div class=\"btn-group im-con-buttons\">\n</div>");
        _ref = this.buttons;
        _fn = function() {
          return btns.append("<button class=\"" + c + "\">" + t + "</button>");
        };
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          _ref1 = _ref[_i], t = _ref1.text, c = _ref1["class"];
          _fn();
        }
        return this.$el.append(btns);
      };

      ActiveConstraint.prototype.getTitleOp = function() {
        return this.con.get('op') || intermine.conbuilder.messages.IsA;
      };

      ActiveConstraint.prototype.getTitleVal = function() {
        if (this.con.get('values')) {
          return this.con.get('values').length + " values";
        } else {
          return this.con.get('value') || this.con.get('type');
        }
      };

      ActiveConstraint.prototype.toLabel = function(content, type) {
        return $("<span class=\"label label-" + type + "\">" + content + "</span>");
      };

      ActiveConstraint.prototype.fillConSummaryLabel = function() {
        var op, sp, ul, val, _ref,
          _this = this;
        this.label.empty();
        this.addIcons(this.label);
        ul = $('<ul class="breadcrumb">').appendTo(this.label);
        if (this.con.has('title')) {
          ul.append(this.toLabel(this.con.get('title'), 'path'));
        } else {
          sp = this.toLabel(this.path, 'path');
          (function(sp) {
            return _this.path.getDisplayName(function(name) {
              return sp.text(name);
            });
          })(sp);
          ul.append(sp);
        }
        if ((op = this.getTitleOp())) {
          ul.append(this.toLabel(op, 'op'));
        }
        if (_ref = this.con.get('op'), __indexOf.call(intermine.Query.NULL_OPS, _ref) < 0) {
          if ((val = this.getTitleVal())) {
            ul.append(this.toLabel(val, 'value'));
          }
          if (this.con.has('extraValue')) {
            ul.append(intermine.conbuilder.messages.ExtraLabel);
            return ul.append(this.toLabel(this.con.get('extraValue'), 'extra'));
          }
        }
      };

      ActiveConstraint.prototype.render = function() {
        var fs;
        this.label = $("<label class=\"im-con-overview\">\n</label>");
        this.fillConSummaryLabel();
        this.$el.append(this.label);
        fs = $("<fieldset class=\"im-constraint-options\"></fieldset>").appendTo(this.el);
        this.drawOperatorSelector(fs);
        this.drawValueOptions();
        this.addButtons();
        return this;
      };

      ActiveConstraint.prototype.drawOperatorSelector = function(fs) {
        var $select, current,
          _this = this;
        current = this.con.get('op');
        $select = $("<select class=\"span4 im-ops\"><option>" + current + "</option></select>");
        $select.appendTo(fs);
        _(this.ops).chain().without(current).each(function(op) {
          return $select.append("<option>" + op + "</select>");
        });
        return $select.change(function(e) {
          return _this.con.set({
            op: $select.val()
          });
        });
      };

      ActiveConstraint.prototype.btnGroup = "<div class=\"im-value-options btn-group\" data-toggle=\"buttons-radio\"></div>";

      ActiveConstraint.prototype.drawBooleanOpts = function(fs) {
        var con, current, grp, val, _i, _len, _ref, _results,
          _this = this;
        current = this.con.get('value');
        con = this.con;
        grp = $(this.btnGroup).appendTo(fs);
        _ref = ['true', 'false'];
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          val = _ref[_i];
          _results.push((function(val) {
            var button;
            button = $("<button class=\"btn " + (current === val ? 'active' : '') + "\">\n    " + val + "\n</button>");
            button.appendTo(grp);
            return button.click(function(e) {
              var wasActive;
              wasActive = button.is('.active');
              grp.find('button').removeClass('active');
              if (!wasActive) {
                button.addClass('active');
                return _this.con.set({
                  value: val
                });
              } else {
                return _this.con.unset('value');
              }
            });
          })(val));
        }
        return _results;
      };

      ActiveConstraint.prototype.valueSelect = "<select class=\"span7 im-value-options im-con-value\"></select>";

      ActiveConstraint.prototype.listOptionTempl = _.template("<option value=\"<%- name %>\">\n    <%- name %> (<%- size %> <%- type %>s)\n</option>");

      ActiveConstraint.prototype.multiValueTable = '<table class="table table-condensed im-value-options"></table>';

      ActiveConstraint.prototype.multiValueOptTempl = _.template("<tr>\n    <td><input type=checkbox checked data-value=\"<%- value %>\"></td>\n    <td><%- value %></td>\n</tr>");

      ActiveConstraint.prototype.clearer = '<div class="im-value-options" style="clear:both;">';

      ActiveConstraint.prototype.drawMultiValueOps = function(fs) {
        var $multiValues, con, values,
          _this = this;
        con = this.con;
        if (!con.has('values')) {
          con.set({
            values: []
          });
        }
        values = con.get('values');
        $multiValues = $(this.multiValueTable).appendTo(fs);
        _(values).each(function(v) {
          return $multiValues.append(_this.multiValueOptTempl({
            value: v
          }));
        });
        return $multiValues.find('input').change(function(e) {
          var changed, value;
          changed = $(this);
          value = changed.data('value');
          if (changed.is(':checked')) {
            if (!(_.include(values, value))) {
              return values.push(value);
            }
          } else {
            values = _.without(values, value);
            return con.set({
              values: values
            });
          }
        });
      };

      ActiveConstraint.prototype.drawListOptions = function(fs) {
        var $lists,
          _this = this;
        $lists = $(this.valueSelect).appendTo(fs);
        this.query.service.fetchLists(function(ls) {
          var selectables, sl, _i, _len;
          selectables = _(ls).filter(function(l) {
            return l.size && _this.path.isa(l.type);
          });
          for (_i = 0, _len = selectables.length; _i < _len; _i++) {
            sl = selectables[_i];
            $lists.append(_this.listOptionTempl(sl));
          }
          if (_this.con.has('value')) {
            $lists.val(_this.con.get('value'));
          }
          if (selectables.length === 0) {
            $lists.attr({
              disabled: true
            });
            return $lists.append('No lists of this type available');
          }
        });
        return $lists.change(function(e) {
          return _this.con.set({
            value: $lists.val()
          });
        });
      };

      ActiveConstraint.prototype.drawLoopOpts = function(fs) {
        var $loops, lc, loopCandidates, opt, _i, _len, _results,
          _this = this;
        $loops = $(this.valueSelect).appendTo(fs);
        loopCandidates = this.query.getQueryNodes().filter(function(lc) {
          return lc.isa(_this.type) || _this.path.isa(lc.getEndClass());
        });
        _results = [];
        for (_i = 0, _len = loopCandidates.length; _i < _len; _i++) {
          lc = loopCandidates[_i];
          opt = $("<option value=\"" + (lc.toString()) + "\">");
          opt.appendTo($loops);
          _results.push((function(opt, lc) {
            return lc.getDisplayName(function(name) {
              return opt.text(name);
            });
          })(opt, lc));
        }
        return _results;
      };

      ActiveConstraint.prototype.handleSummary = function(input, items, total) {
        if (total <= 500) {
          input.typeahead({
            source: _.pluck(items, 'item')
          });
          this.typeaheads.push(input.data('typeahead').$menu);
          input.keyup(function() {
            return input.data('typeahead').$menu.css({
              top: input.offset().top + input.height(),
              left: input.offset().left
            });
          });
          this.query.on('cancel:add-constraint', function() {
            var _ref;
            return (_ref = input.data('typeahead')) != null ? _ref.$menu.remove() : void 0;
          });
        }
        return input.attr({
          placeholder: items[0].item
        });
      };

      ActiveConstraint.prototype.handleNumericSummary = function(input, summary) {
        var $slider, caster, fs, isInt, step, _ref;
        isInt = (_ref = this.path.getType()) === 'int' || _ref === 'Integer';
        step = isInt ? 1 : 0.1;
        caster = isInt ? parseInt : parseFloat;
        fs = input.closest('fieldset');
        fs.append(this.clearer);
        $slider = $('<div class="im-value-options">');
        $slider.appendTo(fs).slider({
          min: summary.min,
          max: summary.max,
          value: this.con.get('value') || summary.average,
          step: step,
          slide: function(e, ui) {
            return input.val(ui.value).change();
          }
        });
        input.attr({
          placeholder: caster(summary.average)
        });
        fs.append(this.clearer);
        return input.change(function(e) {
          return $slider.slider('value', input.val());
        });
      };

      ActiveConstraint.prototype.drawAttributeOpts = function(fs) {
        var input, withOutThisConstraint,
          _this = this;
        input = $("<input class=\"span7 im-constraint-value im-value-options im-con-value\" type=\"text\"\n    placeholder=\"" + intermine.conbuilder.messages.ValuePlaceholder + "\"\n    value=\"" + (this.con.get('value') || this.con.get('type') || '') + "\"\n>");
        fs.append(input);
        input.keyup(function() {
          return _this.con.set({
            value: input.val()
          });
        });
        input.change(function() {
          return _this.con.set({
            value: input.val()
          });
        });
        withOutThisConstraint = this.query.clone();
        withOutThisConstraint.constraints = withOutThisConstraint.constraints.filter(function(c) {
          return !((c.path === _this.path.toString()) && (c.value === _this.con.get('value')));
        });
        return withOutThisConstraint.filterSummary(this.path.toString(), "", 500, function(items, total) {
          if ((items != null ? items.length : void 0) > 0) {
            if (items[0].item != null) {
              return _this.handleSummary(input, items, total);
            } else if (items[0].max != null) {
              return _this.handleNumericSummary(input, items[0]);
            }
          }
        });
      };

      ActiveConstraint.prototype.drawExtraOpts = function(fs) {
        var input,
          _this = this;
        fs.append("<label class=\"im-value-options\">\n    " + intermine.conbuilder.messages.ExtraLabel + "\n    <input type=\"text\" class=\"im-extra-value\"\n        placeholder=\"" + intermine.conbuilder.messages.ExtraPlaceholder + "\"\n        value=\"" + (this.con.get('extraValue') || '') + "\"\n    >\n</label>");
        return input = fs.find('input.im-extra-value').change(function(e) {
          return _this.con.set({
            extraValue: input.val()
          });
        });
      };

      ActiveConstraint.prototype.drawValueOptions = function() {
        var currentOp, fs, _ref;
        this.$('.im-value-options').remove();
        fs = this.$('.im-constraint-options');
        currentOp = this.con.get('op');
        if ((_ref = this.path.getType(), __indexOf.call(intermine.Model.BOOLEAN_TYPES, _ref) >= 0) && !(__indexOf.call(intermine.Query.NULL_OPS, currentOp) >= 0)) {
          this.drawBooleanOpts(fs);
        } else if (__indexOf.call(intermine.Query.MULTIVALUE_OPS, currentOp) >= 0) {
          this.drawMultiValueOps(fs);
        } else if (__indexOf.call(intermine.Query.LIST_OPS, currentOp) >= 0) {
          this.drawListOptions(fs);
        } else if (this.path.isReference() && (currentOp === '=' || currentOp === '!=')) {
          this.drawLoopOpts(fs);
        } else if (!(__indexOf.call(intermine.Query.NULL_OPS, currentOp) >= 0)) {
          this.drawAttributeOpts(fs);
        }
        if (__indexOf.call(intermine.Query.TERNARY_OPS, currentOp) >= 0) {
          return this.drawExtraOpts(fs);
        }
      };

      return ActiveConstraint;

    })(Backbone.View));
    return exporting(NewConstraint = (function(_super) {

      __extends(NewConstraint, _super);

      function NewConstraint() {
        return NewConstraint.__super__.constructor.apply(this, arguments);
      }

      NewConstraint.prototype.initialize = function(q, c) {
        NewConstraint.__super__.initialize.call(this, q, c);
        this.$el.addClass("new");
        this.buttons[0].text = "Apply";
        this.con.set({
          op: (this.type ? 'LOOKUP' : '=')
        });
        return this.con.on('change', this.fillConSummaryLabel, this);
      };

      NewConstraint.prototype.addIcons = function() {};

      NewConstraint.prototype.valueChanged = function(value) {
        return this.fillConSummaryLabel(_.extend({}, this.con, {
          value: value
        }));
      };

      NewConstraint.prototype.opChanged = function(op) {
        return this.$('.label-op').text(op);
      };

      NewConstraint.prototype.removeConstraint = function() {};

      NewConstraint.prototype.hideEditForm = function(e) {
        NewConstraint.__super__.hideEditForm.call(this, e);
        this.query.trigger("cancel:add-constraint");
        return this.remove();
      };

      return NewConstraint;

    })(ActiveConstraint));
  });

}