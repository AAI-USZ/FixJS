function() {
        this._borderPaintTarget = null;
        this._redBorderEffect = new RedBorderEffect();

        this._open = false;

        this._offset = 0;
        this._results = [];

        // Sort of magic, but...eh.
        this._maxItems = 150;

        this.actor = new St.BoxLayout({ name: 'LookingGlassDialog',
                                        style_class: 'lg-dialog',
                                        vertical: true,
                                        visible: false,
                                        reactive: true });
        this.actor.connect('key-press-event', Lang.bind(this, this._globalKeyPressEvent));

        this._interfaceSettings = new Gio.Settings({ schema: 'org.gnome.desktop.interface' });
        this._interfaceSettings.connect('changed::monospace-font-name',
                                        Lang.bind(this, this._updateFont));
        this._updateFont();

        // We want it to appear to slide out from underneath the panel
        Main.layoutManager.panelBox.add_actor(this.actor);
        this.actor.lower_bottom();
        Main.layoutManager.panelBox.connect('allocation-changed',
                                            Lang.bind(this, this._queueResize));
        Main.layoutManager.keyboardBox.connect('allocation-changed',
                                               Lang.bind(this, this._queueResize));

        this._objInspector = new ObjInspector();
        Main.uiGroup.add_actor(this._objInspector.actor);
        this._objInspector.actor.hide();

        let toolbar = new St.BoxLayout({ name: 'Toolbar' });
        this.actor.add_actor(toolbar);
        let inspectIcon = new St.Icon({ icon_name: 'gtk-color-picker',
                                        icon_type: St.IconType.FULLCOLOR,
                                        icon_size: 24 });
        toolbar.add_actor(inspectIcon);
        inspectIcon.reactive = true;
        inspectIcon.connect('button-press-event', Lang.bind(this, function () {
            let inspector = new Inspector();
            inspector.connect('target', Lang.bind(this, function(i, target, stageX, stageY) {
                this._pushResult('<inspect x:' + stageX + ' y:' + stageY + '>',
                                 target);
            }));
            inspector.connect('closed', Lang.bind(this, function() {
                this.actor.show();
                global.stage.set_key_focus(this._entry);
            }));
            this.actor.hide();
            return true;
        }));

        let notebook = new Notebook();
        this._notebook = notebook;
        this.actor.add(notebook.actor, { expand: true });

        let emptyBox = new St.Bin();
        toolbar.add(emptyBox, { expand: true });
        toolbar.add_actor(notebook.tabControls);

        this._evalBox = new St.BoxLayout({ name: 'EvalBox', vertical: true });
        notebook.appendPage('Evaluator', this._evalBox);

        this._resultsArea = new St.BoxLayout({ name: 'ResultsArea', vertical: true });
        this._evalBox.add(this._resultsArea, { expand: true });

        this._entryArea = new St.BoxLayout({ name: 'EntryArea' });
        this._evalBox.add_actor(this._entryArea);

        let label = new St.Label({ text: CHEVRON });
        this._entryArea.add(label);

        this._entry = new St.Entry({ can_focus: true });
        ShellEntry.addContextMenu(this._entry);
        this._entryArea.add(this._entry, { expand: true });

        this._windowList = new WindowList();
        notebook.appendPage('Windows', this._windowList.actor);

        this._memory = new Memory();
        notebook.appendPage('Memory', this._memory.actor);

        this._extensions = new Extensions();
        notebook.appendPage('Extensions', this._extensions.actor);

        this._entry.clutter_text.connect('activate', Lang.bind(this, function (o, e) {
            // Hide any completions we are currently showing
            this._hideCompletions();

            let text = o.get_text();
            // Ensure we don't get newlines in the command; the history file is
            // newline-separated.
            text.replace('\n', ' ');
            // Strip leading and trailing whitespace
            text = text.replace(/^\s+/g, '').replace(/\s+$/g, '');
            if (text == '')
                return true;
            this._evaluate(text);
            return true;
        }));

        this._history = new History.HistoryManager({ gsettingsKey: HISTORY_KEY, 
                                                     entry: this._entry.clutter_text });

        this._autoComplete = new AutoComplete(this._entry);
        this._autoComplete.connect('suggest', Lang.bind(this, function(a,e) {
            this._showCompletions(e.completions);
        }));
        // If a completion is completed unambiguously, the currently-displayed completion
        // suggestions become irrelevant.
        this._autoComplete.connect('completion', Lang.bind(this, function(a,e) {
            if (e.type == 'whole-word')
                this._hideCompletions();
        }));

        this._resize();
    }