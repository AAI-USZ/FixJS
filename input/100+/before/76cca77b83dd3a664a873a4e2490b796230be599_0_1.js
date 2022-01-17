function () {
        // Nervoustissue.UILinking
        // -------------------------

        // Abstracciones para modificar los elementos del DOM y leer sus datos y escuchar sus eventos

        var m = Nervoustissue.UILinking = {};

        m.Base = function (configuration) {
            _.extend(this, configuration);
            this.el = $(this.el)[0];
            this.$el = $(this.el);
            this.$el.off().empty();
            this.linkedData = new this.dataLink(_.extend({ viewDataBinder: this.viewDataBinder, model: this.model }, configuration));
            if (this.linkedData.validModel) {
                this.viewDataBinder.on("change", this.applyFormEditMode, this);
                this.$el.html(this.render());
                this._initialize();
            }
        }

        _.extend(m.Base.prototype, {
            $: function (selector) {
                return this.$el.find(selector);
            },
            render: function () {
                return this.template(this.getTemplateModel());
            },
            getTemplateModel: function () {
                return null;
            },
            applyFormEditMode: function () {
                this.applyMode("view");
            },
            mode: "view",
            applyMode: function (mode) { }
        });

        m.Base.extend = Backbone.Model.extend;

        m.Collection = m.Base.extend({
            template: _.template('<ul class="list-editable"></ul><button class="add-button">+</button>'),
            subtemplate: _.template('<li><button class="remove-button">&#x2717;</button><span class="editable-field" data-bind="item"></span></li>'),
            dataLink: Nervoustissue.DataLinking.Collection,
            _initialize: function () {
                var me = this;
                this.$ul = this.$el.find(".list-editable");
                this.addEl = function (item) {
                    var $li = $(this.subtemplate());
                    this.$ul.append($li);
                    var $subEl = $li.find('[data-bind=item]');
                    if (!$subEl.length)
                        $subEl = $li;
                    this.viewDataBinder.dataBind(
                        $subEl,
                        item,
                        this.item
                    );
                    $li.on("click", ".remove-button", null, function () { me.linkedData.remove(item); });
                    //TODO: use remove event in place of destroy 
                    this.viewDataBinder.registerModelEvent(item, "destroy", function () { $li.remove(); }, this.viewDataBinder);
                };
                this.$el.on("click", ".add-button", null, function () { me.linkedData.add(); });
                this.linkedData.onAdd(this.addEl, this);
                this.linkedData.each(this.addEl, this);
                me.linkedData.onChange(this.refresh, this);
                me.refresh();
            },
            refresh: function () { },
            applyMode: function (mode) {
                var formMode = this.viewDataBinder.editionMode();
                var buttons = this.$el.find(".add-button,.remove-button,.view-editable-clear");
                if (formMode == "readonly") {
                    buttons.hide();
                } else {
                    buttons.show();
                }
            }
        });

        // Nervoustissue.UILinking.BaseModel
        // ------------------------------------

        m.BaseModel = m.Base.extend({
            _initialize: function () {
                var me = this;

                var clickOutside = function (e) {
                    if (!me.$el.find(e.target).length) {
                        me.applyMode("view");
                    }
                };
                me.stopListenOutside = function () {
                    $("body").off("click", clickOutside);
                };
                me.startListenOutside = function () {
                    me.stopListenOutside();
                    $("body").on("click", clickOutside);
                };


                me.$view = this.$(".view-editable");
                var $viewContent = this.$(".view-editable-content");
                me.$viewContent = $viewContent.length ? $viewContent : me.$view;
                me.$viewEmpty = this.$(".view-editable-empty");
                me.$editor = this.$(".editor-editable");
                me.writing = false;
                me.linkedData.onChange(this.refresh, this);
                me.bindUI();
                me.applyMode("view");
                me.refresh();
            },
            applyMode: function (mode) {
                if (!mode) {
                    mode = this.mode;
                }
                var formMode = this.viewDataBinder.editionMode();
                if (formMode == "full-edit") {
                    mode = "edit";
                } else if (formMode == "readonly") {
                    mode = "view";
                }
                this.mode = mode;
                if (mode == "view") {
                    this.showView();
                } else if (mode == "edit") {
                    this.showEdit();
                }
            },
            dataEmpty: function () {
                var value = this.linkedData.read();
                return typeof value == "undefined" || value === null || (_.isString(value) && $.trim(value) === "");
            },
            dataLink: Nervoustissue.DataLinking.Model,
            originalValue: null,
            focusOnEditor: function () {
                if (this.$editor.css("display") != "none") {
                    this.$editor.focus().select();
                }
            },
            refreshView: function (text) {
                this.$viewContent.html(text);
            },
            refreshEdit: function (value) {
                this.$editor.val(value);
            },
            showView: function () {
                this.stopListenOutside(); 
                this.$editor.hide();
                if (!this.dataEmpty()) {
                    this.$viewEmpty.hide();
                    this.$view.show();
                } else {
                    this.$view.hide();
                    this.$viewEmpty.show();
                }
            },
            showEdit: function () {
                this.originalValue = this.linkedData.read();
                this.$view.hide();
                this.$viewEmpty.hide();
                this.$editor.show();
                this.startListenOutside();
            },
            clearData: function () {
                this.linkedData.write(null);
            },
            undoEdition: function () {
                this.linkedData.write(this.originalValue);
            },
            update: function () {
                this.writing = true;
                this.linkedData.write(this.readUI());
                this.writing = false;
            },
            refresh: function () {
                var value = this.linkedData.read();
                this.refreshView(this.dataEmpty(value) ? '' : this.valueToContent(value));
                if (!this.writing) {
                    this.refreshEdit(value);
                    this.applyMode();
                }
            },
            valueToContent: function (value) {
                return value;
            }
        });

        m.ReadOnlyText = m.BaseModel.extend({
            template: _.template('<span class="view-editable-empty">Sin datos</span><span class="view-editable" style="display: none;"></span>'),
            showView: function () {
                if (!this.dataEmpty()) {
                    this.$viewEmpty.hide();
                    this.$view.show();
                } else {
                    this.$view.hide();
                    this.$viewEmpty.show();
                }
            },
            showEdit: function () { },
            refreshEdit: function (value) { },
            readUI: function () { },
            bindUI: function () { },
            valueToContent: function (value) {
                return value.toString();
            }
        });

        m.Text = m.BaseModel.extend({
            template: _.template('<span class="view-editable-empty">Sin datos</span><span class="view-editable" style="display: none;"></span><input class="editor-editable" type="text" value="" style="display: none;"/>'),
            readUI: function () {
                return this.$editor.val();
            },
            onEditableClick: function () {
                this.applyMode("edit");
                this.focusOnEditor();
            },
            onKeyUp: function (e) {
                if (e.keyCode == 27) {
                    this.undoEdition();
                    this.applyMode("view");
                } else if (!e.altKey && !e.shiftKey && e.keyCode == 13) {
                    this.applyMode("view");
                }
            },
            onInput: function (e) {
                this.update();
            },
            onKeyPress: function (e) {
            },
            bindUI: function () {
                var me = this;
                me.$el.on("click", ".view-editable,.view-editable-empty", null, function () {
                    me.onEditableClick();
                });
                me.$el.on("keyup", ".editor-editable", null, function (e) {
                    me.onKeyUp(e);
                });
                me.$el.on("input", ".editor-editable", null, function (e) {
                    me.onInput(e);
                });
                me.$el.on("keypress", ".editor-editable", null, function (e) {
                    me.onKeyPress(e);
                });
            },
            valueToContent: function (value) {
                return value.toString();
            }
        });

        m.MultilineText = m.Text.extend({
            template: _.template('<span class="view-editable-empty">Sin datos</span><div class="view-editable markdown-content" style="display: none;"></div><div class="editor-editable" style="display: none;"><textarea  cols=50 rows=10 class="mdd_editor"></textarea></div>'),
            bindUI: function () {
                var me = this;
                me.$el.on("click", ".view-editable,.view-editable-empty", null, function () {
                    me.onEditableClick();
                });
                me.$el.on("keyup", ".editor-editable textarea", null, function (e) {
                    me.onKeyUp(e);
                });
                me.$el.on("input", ".editor-editable", null, function (e) {
                    me.onInput(e);
                });
            },
            onInput: function (e) {
                this.update();
            },
            onKeyUp: function (e) {
                if (e.keyCode == 27) {
                    this.undoEdition();
                    this.applyMode("view");
                } else {
                    //I am waiting for ctrl + enter to accept changes
                    if (e.ctrlKey && e.keyCode == 13) {
                        this.applyMode("view");
                    }
                }
            },
            focusOnEditor: function () {
                if (this.$editor.css("display") != "none") {
                    this.$editor.find("textarea").focus().select();
                }
            },
            refreshEdit: function (value) {
                this.$editor.find("textarea").val(value);
            },
            readUI: function () {
                return this.$editor.find("textarea").val();
            },
            valueToContent: function (value) {
                return $("<pre></pre>").text(value);
            }
        });

        m.Markdown = m.Text.extend({
            template: _.template('<span class="view-editable-empty">Sin datos</span><div class="view-editable markdown-content" style="display: none;"></div><div class="editor-editable" style="display: none;"><textarea  cols=50 rows=10 class="mdd_editor"></textarea></div>'),
            bindUI: function () {
                //TODO: separar de alguna forma $editor y .editor-editable ya que están representando tanto la vista de edición como el elemento que tiene el valor.
                var me = this;
                me.$editor.find("textarea").MarkdownDeep({
                    help_location: "/Scripts/mdd_help.htm",
                    disableTabHandling: true,
                    resizebar: false,
                    ExtraMode: true
                });
                me.$editor.find(".mdd_preview").hide(); //Esto es un parche para no mostrar el preview de MarkdownDeep
                me.$el.on("click", ".view-editable,.view-editable-empty", null, function () {
                    me.onEditableClick();
                });
                me.$el.on("keyup", ".editor-editable textarea", null, function (e) {
                    me.onKeyUp(e);
                });
                me.$el.on("input", ".editor-editable", null, function (e) {
                    me.onInput(e);
                });
            },
            onInput: function (e) {
                this.update();
            },
            onKeyUp: function (e) {
                if (e.keyCode == 27) {
                    this.undoEdition();
                    this.applyMode("view");
                } else {
                    if (e.ctrlKey && e.keyCode == 13) {
                        this.applyMode("view");
                    }
                }
            },
            focusOnEditor: function () {
                //TODO: separar de alguna forma $editor y .editor-editable ya que están representando tanto la vista de edición como el elemento que tiene el valor.
                if (this.$editor.css("display") != "none") {
                    this.$editor.focus().select();
                }
            },
            refreshEdit: function (value) {
                //TODO: separar de alguna forma $editor y .editor-editable ya que están representando tanto la vista de edición como el elemento que tiene el valor.
                this.$editor.find("textarea").val(value);
            },
            readUI: function () {
                //TODO: separar de alguna forma $editor y .editor-editable ya que están representando tanto la vista de edición como el elemento que tiene el valor.
                return this.$editor.find("textarea").val();
            },
            valueToContent: function (value) {
                //return value;
                var md = new MarkdownDeep.Markdown();
                md.ExtraMode = true;
                return md.Transform(value);
            }
        });

        m.Int = m.Text.extend({
            template: _.template('<span class="view-editable-empty">Sin datos</span><span class="view-editable" style="display: none;"></span><input class="editor-editable" type="text" value="" style="display: none;"/>'),
            onKeyPress: function (e) {
                var code = e.which || e.keyCode;
                if (code > 31  // is not a control key
                    && (code < 37 || code > 40) // is not an arrow key
                    && (code < 48 || code > 57) // is not numeric
                    && (code != 46) // is not the delete key
                )
                    e.preventDefault();

                //TODO: Acá estoy llamando al onKeyPress de Text, tiene que haber una forma mejor 
                this.base
                this.__proto__.__proto__.onKeyPress.call(this, e);
            }
        });

        m.LinkEditableText = m.Text.extend({
            template: _.template('<span class="view-editable-empty"><a href="#">(Sin datos)</a> <span class="icon-edit">&nbsp;</span></span><span class="view-editable"></span><input class="editor-editable" type="text" value="" style="display: none;"/>'),
            bindUI: function () {
                var me = this;
                me.$el.on("click", ".view-editable .icon-edit,.view-editable-empty icon-edit", null, function () {
                    me.onEditableClick();
                });
                me.$el.on("keyup", ".editor-editable", null, function (e) {
                    me.onKeyUp(e);
                });
                me.$el.on("keypress", ".editor-editable", null, function (e) {
                    me.onKeyPress(e);
                });
                me.$el.on("input", ".editor-editable", null, function (e) {
                    me.onInput(e);
                });
            },
            onInput: function (e) {
                this.update();
            },
            getTemplateModel: function () {
                return this.linkedData.read();
            },
            //TODO: move html to template. 
            valueToContent: function (value) {
                return _.template('<span class="view-editable"><a href="<%= url %>"><%= text %></a> <span class="icon-edit">&nbsp;</span></span>', value);
            },
            refreshEdit: function (value) {
                this.$editor.val(value.text);
            },
            undoEdition: function () { }
        });

        m.Date = m.BaseModel.extend({
            template: _.template('<span class="view-editable-empty">Sin datos</span><span class="view-editable" style="display: none;"></span><input class="editor-editable" type="text" value="" style="display: none;"/>'),
            /*new*/
            dateFormat: "yy-mm-dd",
            //TODO this should be an option in $.datepicker.parseDate
            ignoreInDateParse: /T\d\d:\d\d:\d\d/,
            uiDateFormat: "d/m/yy",
            //*/
            valueToContent: function (value) {
                value = value.replace(this.ignoreInDateParse, '');
                var dateValue = $.datepicker.parseDate(this.dateFormat, value);
                return $.datepicker.formatDate(this.uiDateFormat, dateValue);
            },
            refreshEdit: function (value) {
                if (typeof (value) == 'string') {
                    value = value.replace(this.ignoreInDateParse, '');
                    value = $.datepicker.parseDate(this.dateFormat, value);
                }

                this.$editor.datepicker("setDate", value);
            },
            readUI: function () {
                var date = this.$editor.datepicker("getDate");

                return $.datepicker.formatDate(this.dateFormat, date);
            },
            bindUI: function () {
                var me = this;
                me.$editor.datepicker({
                    dateFormat: this.uiDateFormat,
                    onClose: function () {
                        me.update();
                        me.focusOnEditor();
                        //which is better? or both?
                        //me.$editor.focus().select();
                        //me.applyMode("view");
                    }
                });
                me.$el.on("click", ".view-editable,.view-editable-empty", null, function () {
                    me.applyMode("edit");
                    me.focusOnEditor();
                });
                me.$el.on("keyup", ".editor-editable", null, function (e) {
                    //TODO: cuando un campo que está bindeado en dos controles diferentes está inicialmente vacío y en uno de los controles escribo el otro continua mostrando "Sin datos" hasta que presiono enter.
                    //Es mas, cuando apreto enter tampoco funciona, tengo que empezar a editar y luego queda correcto
                    if (e.keyCode == 27) {
                        me.undoEdition();
                        me.applyMode("view");
                    } else {
                        me.update();
                        if (e.keyCode == 13) {
                            me.applyMode("view");
                        }
                    }
                });

            }
        });

        m.Compound = m.BaseModel.extend({
            dataLink: Nervoustissue.DataLinking.Compound,
            refresh: function () { },
            bindUI: function () {
                var me = this;
                for (var i in this.items) {
                    var itemcfg = this.items[i];
                    this.viewDataBinder.dataBind(
                        this.$el.find('[data-bind=' + (itemcfg.name || itemcfg.field) + ']'),
                        this.model,
                        itemcfg);
                }
            }
        });

        m.Toggle = m.BaseModel.extend({
            template: _.template('<a class="view-editable"></a>'),
            onTemplate: _.template('On'),
            offTemplate: _.template('Off'),
            valueToContent: function (value) {
                return value ? this.onTemplate() : this.offTemplate();
            },
            readUI: null,
            refreshView: function (text) {
                this.$view.html(text);
            },
            applyMode: function (mode) {
                if (!mode) {
                    mode = this.mode;
                }
                var formMode = this.viewDataBinder.editionMode();
                this.showView();
                if (formMode == "readonly") {
                    this.$view.removeAttr("href");
                } else {
                    this.$view.attr("href", "javascript:void(null)");
                }
            },
            dataEmpty: function () { return false; },
            onEditableClick: function () { this.toggle(); },
            toggle: function () {
                var formMode = this.viewDataBinder.editionMode();
                if (formMode != "readonly") {
                    var value = this.linkedData.read();
                    this.linkedData.write(!value);
                }
            },
            onKeyUp: function (e) {
                if (e.keyCode == 32) {
                    this.toggle();
                }
            },
            bindUI: function () {
                var me = this;
                me.$el.on("click", ".view-editable", null, function () {
                    me.onEditableClick();
                });
                me.$el.on("keyup", ".view-editable", null, function (e) {
                    me.onKeyUp(e);
                });
            },
            refreshEdit: function () { }
        });

        m.Options = m.BaseModel.extend({
            getTemplateModel: function () {
                return { Model: this.options };
            },
            template: _.template('<span class="view-editable-empty">Sin datos</span><span class="view-editable" style="display: none;"></span><select class="editor-editable" style="display: none;"><% for (var i in Model) { %><option value="<%= Model[i].value %>"><%= Model[i].text %></option><% } %></select>'),
            refreshEdit: function (value) {
                this.$editor.val(value === null ? '' : value.toString());
            },
            valueToContent: function (value) {
                for (var i in this.options) {
                    if (value.toString() == this.options[i].value.toString()) {
                        return this.options[i].text;
                    }
                }
                return "<i>Invalid Data!</i>";
            },
            readUI: function () {
                return this.$editor.val();
            },
            onEditableClick: function () {
                this.applyMode("edit");
                this.focusOnEditor();
            },
            onKeyUp: function (e) {
                if (e.keyCode == 27) {
                    this.undoEdition();
                    this.applyMode("view");
                } else {
                    this.update();
                    if (e.keyCode == 13) {
                        this.applyMode("view");
                    }
                }
            },
            bindUI: function () {
                var me = this;
                me.$el.on("click", ".view-editable,.view-editable-empty", null, function () {
                    me.onEditableClick();
                });
                me.$el.on("keyup", ".editor-editable", null, function (e) {
                    me.onKeyUp(e);
                });
                me.$el.on("change", ".editor-editable", null, function (e) {
                    me.update();
                });
            }
        });

    }