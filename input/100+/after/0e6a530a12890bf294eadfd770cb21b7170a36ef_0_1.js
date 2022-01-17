function()
    {
        Firebug.Module.initialize.apply(this, arguments);

        if (this.editor)
            return;

        // The current implementation of the SourceEditor (based on Orion) doesn't
        // support zooming. So, the TextEditor (based on textarea) can be used
        // by setting extensions.firebug.enableOrion pref to false.
        // See issue 5678
        if (typeof(SourceEditor) != "undefined" && Options.get("enableOrion"))
            this.editor = new SourceEditor();
        else
            this.editor = new TextEditor();

        var config =
        {
            mode: MODE_JAVASCRIPT,
            showLineNumbers: false,
            theme: "chrome://firebug/skin/orion-firebug.css"
        };

        // Custom shortcuts for Orion editor
        config.keys = [{
            action: "firebug-cmdEditor-execute",
            code: KeyEvent.DOM_VK_RETURN,
            accel: true,
            callback: this.onExecute.bind(this),
        },{
            action: "firebug-cmdEditor-escape",
            code: KeyEvent.DOM_VK_ESCAPE,
            callback: this.onEscape.bind(this),
        }];

        // Initialize Orion editor.
        this.parent = document.getElementById("fbCommandEditor");
        this.editor.init(this.parent, config, this.onEditorLoad.bind(this));

        if (FBTrace.DBG_COMMANDEDITOR)
            FBTrace.sysout("commandEditor: SourceEditor initialized");
    }