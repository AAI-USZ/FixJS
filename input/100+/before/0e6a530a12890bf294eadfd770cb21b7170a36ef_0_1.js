function()
    {
        Firebug.Module.initialize.apply(this, arguments);

        if (this.editor)
            return;

        if (typeof(SourceEditor) != "undefined")
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