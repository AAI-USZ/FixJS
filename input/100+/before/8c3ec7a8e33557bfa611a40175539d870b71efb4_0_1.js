function(_super) {

      __extends(ExportDialogue, _super);

      function ExportDialogue() {
        this.initCols = __bind(this.initCols, this);

        this.updateFormatOptions = __bind(this.updateFormatOptions, this);
        return ExportDialogue.__super__.constructor.apply(this, arguments);
      }

      ExportDialogue.prototype.tagName = "li";

      ExportDialogue.prototype.className = "im-export-dialogue dropdown";

      ExportDialogue.prototype.initialize = function(query) {
        var v, _i, _len, _ref,
          _this = this;
        this.query = query;
        this.requestInfo = new Backbone.Model({
          format: 'tab',
          allRows: true,
          allCols: true,
          start: 0,
          galaxyMain: intermine.options.GalaxyMain,
          galaxyAlt: intermine.options.GalaxyMain
        });
        this.exportedCols = new Backbone.Collection;
        _ref = this.query.views;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          v = _ref[_i];
          this.exportedCols.add({
            path: this.query.getPathInfo(v)
          });
        }
        this.requestInfo.on('change:allRows', function(m, allRows) {
          _this.$('.im-row-selection').toggle(!allRows);
          return _this.$('.im-all-rows').attr({
            checked: allRows
          });
        });
        this.requestInfo.on('change:allCols', function(m, allCols) {
          _this.$('.im-col-options').toggle(!allCols);
          return _this.$('.im-all-cols').attr({
            checked: allCols
          });
        });
        this.requestInfo.on('change:format', this.updateFormatOptions);
        this.requestInfo.on('change:start', function(m, start) {
          _this.$('.im-first-row').val(start);
          return _this.$('.im-row-range-slider').slider('option', 'values', [start, m.get('end')]);
        });
        this.requestInfo.on('change:end', function(m, end) {
          _this.$('.im-last-row').val(end);
          return _this.$('.im-row-range-slider').slider('option', 'values', [m.get('start'), end]);
        });
        return this.exportedCols.on('add remove reset', this.initCols);
      };

      ExportDialogue.prototype.html = "<a class=\"btn im-open-dialogue\" href=\"#\">\n    <i class=\"" + intermine.icons.Export + "\"></i>\n    " + intermine.messages.actions.ExportButton + "\n</a>\n<div class=\"modal fade\">\n    <div class=\"modal-header\">\n        <a class=\"close btn-cancel\">close</a>\n        <h2>" + intermine.messages.actions.ExportTitle + "</h2>\n    </div>\n    <div class=\"modal-body\">\n        <form class=\"form row-fluid\">\n            <label>\n                <span class=\"span4\">\n                    " + intermine.messages.actions.ExportFormat + "\n                </span>\n                <select class=\"im-export-format input-xlarge span8\">\n                </select>\n            </label>\n            <label title=\"" + intermine.messages.actions.ColumnsHelp + "\">\n                <span class=\"span4\">\n                    " + intermine.messages.actions.AllColumns + "\n                </span>\n                <input type=\"checkbox\" checked class=\"im-all-cols span8\">\n            </label>\n            <div class=\"im-col-options\">\n                <ul class=\"well im-cols im-can-be-exported-cols\">\n                    <h4>" + intermine.messages.actions.PossibleColumns + "</h4>\n                </ul>\n                <ul class=\"well im-cols im-exported-cols\">\n                    <h4>" + intermine.messages.actions.ExportedColumns + "</h4>\n                </ul>\n                <div style=\"clear:both;\"></div>\n                <div class=\"alert alert-info\">\n                    <button class=\"close\" data-dismiss=\"alert\">×</button>\n                    <strong>ps</strong>\n                    <p>" + intermine.messages.actions.ChangeColumns + "</p>\n                </div>\n            </div>\n            <label title=\"" + intermine.messages.actions.RowsHelp + "\">\n                <span class=\"span4\">\n                    " + intermine.messages.actions.AllRows + "\n                 </span>\n                <input type=\"checkbox\" checked class=\"im-all-rows span8\">\n            </label>\n            <div class=\"form-horizontal\">\n            <fieldset class=\"im-row-selection control-group\">\n                <label class=\"control-label\">\n                    " + intermine.messages.actions.FirstRow + "\n                    <input type=\"text\" value=\"0\" class=\"disabled input-mini im-first-row im-range-limit\">\n                </label>\n                <label class=\"control-label\">\n                    " + intermine.messages.actions.LastRow + "\n                    <input type=\"text\" class=\"disabled input-mini im-last-row im-range-limit\">\n                </label>\n                <div style=\"clear:both\"></div>\n                <div class=\"slider im-row-range-slider\"></div>\n            </fieldset>\n            </div>\n            <fieldset class=\"im-export-options control-group\">\n            </fieldset>\n        </form>\n    </div>\n    <div class=\"modal-footer\">\n        <button class=\"btn btn-primary pull-right\" title=\"" + intermine.messages.actions.ExportHelp + "\">\n            " + intermine.messages.actions.Export + "\n        </button>\n        <div class=\"btn-group btn-alt pull-right\">\n            <button class=\"btn btn-galaxy\" title=\"" + intermine.messages.actions.GalaxyHelp + "\">\n                " + intermine.messages.actions.SendToGalaxy + "\n            </button>\n            <button title=\"" + intermine.messages.actions.GalaxyAlt + "\" \n                class=\"btn dropdown-toggle galaxy-toggle\" data-toggle=\"dropdown\">\n                <span class=\"caret\"></span>\n            </button>\n        </div>\n        <button class=\"btn btn-cancel pull-left\">\n            " + intermine.messages.actions.Cancel + "\n        </button>\n        <form class=\"well form-inline im-galaxy-options\">\n            <label>\n                " + intermine.messages.actions.GalaxyURILabel + "\n                <input type=\"text\" class=\"im-galaxy-uri input-xlarge\" \n                    value=\"" + intermine.options.GalaxyMain + "\">\n            </label>\n            <button type=\"submit\" class=\"btn\">\n                " + intermine.messages.actions.SendToOtherGalaxy + "\n            </button>\n            <div class=\"alert alert-info\">\n                <button class=\"close\" data-dismiss=\"alert\">×</button>\n                <strong>ps</strong>\n                " + intermine.messages.actions.GalaxyAuthExplanation + "\n            </div>\n        </form>\n    </div>\n</div>";

      ExportDialogue.prototype.events = {
        'change .im-all-cols': 'toggleColSelection',
        'change .im-all-rows': 'toggleRowSelection',
        'click a.im-open-dialogue': 'openDialogue',
        'click .btn-cancel': 'stop',
        'change .im-export-format': 'updateFormat',
        'click button.btn-primary': 'export',
        'click button.galaxy-toggle': 'toggleGalaxyOptions',
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
            input.val(1 + parseInt(input.val()));
            return input.change();
          case 40:
            input.val(parseInt(input.val()) - 1);
            return input.change();
        }
      };

      ExportDialogue.prototype.changeStart = function(e) {
        return this.requestInfo.set({
          start: parseInt(this.$('.im-first-row').val())
        });
      };

      ExportDialogue.prototype.changeEnd = function(e) {
        return this.requestInfo.set({
          end: parseInt(this.$('.im-last-row').val())
        });
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
          start = parseInt(this.$('.im-first-row').val());
          end = parseInt(this.$('.im-last-row').val());
          ret += "&start=" + start;
          if (end !== this.count) {
            ret += "&size=" + (end - start);
          }
        }
        return ret;
      };

      ExportDialogue.prototype.toggleColSelection = function(e) {
        return this.requestInfo.set({
          allCols: this.$('.im-all-cols').is(':checked')
        });
      };

      ExportDialogue.prototype.toggleRowSelection = function(e) {
        return this.requestInfo.set({
          allRows: this.$('.im-all-rows').is(':checked')
        });
      };

      ExportDialogue.prototype.openDialogue = function(e) {
        return this.$('.modal').modal('show');
      };

      ExportDialogue.prototype.stop = function(e) {
        this.$('.modal').modal('hide');
        return this.reset();
      };

      ExportDialogue.prototype.reset = function() {
        var _this = this;
        this.requestInfo.set({
          format: EXPORT_FORMATS[0].extension,
          allCols: true,
          allRows: true,
          start: 0,
          end: this.count
        });
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
            opts.append("<label>\n    <span class=\"span4\">\n        " + intermine.messages.actions.ColumnHeaders + "\n    </span>\n    <input type=\"checkbox\" class=\"im-column-headers span8\">\n</label>");
            return opts.find('.im-column-headers').attr({
              checked: !!requestInfo.get('columnHeaders')
            }).change(function(e) {
              return requestInfo.set('columnHeaders', $(this).is(':checked'));
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
            li.append("<span class=\"label " + (col.get('included') ? 'label-success' : '') + "\">\n    <a href=\"#\">\n        <i class=\"" + (col.get('included') ? intermine.icons.Yes : intermine.icons.No) + "\"></i>\n        " + name + "\n    </a>\n</span>");
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
            return li.find('span').toggleClass("label-success");
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
            li.append("<span class=\"label label-success\">\n    <a href=\"#\">\n        <i class=\"" + (col.get('included') ? intermine.icons.Yes : intermine.icons.No) + "\"></i>\n        " + name + "\n    </a>\n</span>");
            return li.find('a').click(function() {
              return col.set({
                included: !col.get('included')
              });
            });
          });
          col.on('change:included', function() {
            console.log("Changed");
            li.find('i').toggleClass("" + intermine.icons.Yes + " " + intermine.icons.No);
            return li.find('span').toggleClass("label-success label-default");
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
          li.appendTo(cols);
          return path.getDisplayName(function(name) {
            li.append("<div class=\"label label-success\">\n    <i class=\"" + intermine.icons.Move + " im-move pull-right\"></i>\n    <a href=\"#\"><i class=\"" + intermine.icons.Remove + "\"></i></a>\n    " + name + "\n</div>");
            return li.find('a').click(function() {
              _this.exportedCols.remove(col);
              return emphasise(maybes);
            });
          });
        });
        cols.sortable({
          placeholder: 'ui-state-highlight'
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
              if (!(cn.isAttribute() && !this.exportedCols.any(function(path) {
                return path.toString() === cn.toString();
              }))) {
                continue;
              }
              li = $("<li></li>");
              li.appendTo(maybes);
              _results1.push((function(cn, li) {
                return cn.getDisplayName(function(name) {
                  li.append("<div class=\"label\">\n    <a href=\"#\"><i class=\"" + intermine.icons.Add + "\"></i></a>\n    " + name + "\n</div>");
                  return li.find('a').click(function(e) {
                    _this.exportedCols.add({
                      path: cn
                    });
                    return emphasise(cols);
                  });
                });
              })(cn, li));
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
        var format, formatToOpt, select, _i, _j, _len, _len1, _results;
        select = this.$('.im-export-format');
        formatToOpt = function(format) {
          return "<option value=\"" + format.extension + "\">\n    " + format.name + "\n</option>";
        };
        for (_i = 0, _len = EXPORT_FORMATS.length; _i < _len; _i++) {
          format = EXPORT_FORMATS[_i];
          select.append(formatToOpt(format));
        }
        if (intermine.utils.modelIsBio(this.query.service.model)) {
          _results = [];
          for (_j = 0, _len1 = BIO_FORMATS.length; _j < _len1; _j++) {
            format = BIO_FORMATS[_j];
            _results.push(select.append(formatToOpt(format)));
          }
          return _results;
        }
      };

      ExportDialogue.prototype.render = function() {
        this.$el.append(this.html);
        this.$('.modal-footer .btn').tooltip();
        this.initFormats();
        this.initCols();
        this.toggleColSelection();
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
          sl = _this.$('.slider').slider({
            range: true,
            min: 0,
            max: c,
            values: [0, c],
            step: 1,
            slide: function(e, ui) {
              return _this.requestInfo.set({
                start: ui.values[0],
                end: ui.values[1]
              });
            }
          });
          return _this.toggleRowSelection();
        });
      };

      return ExportDialogue;

    }