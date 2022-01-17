function() {
        this.callParent(arguments);
        
        var backButton = {
            xtype:  "button",
            ui:     "back",
            text:   "Home",
            handler: this.onBackButtonTap
        };
        
        var saveButton = {
            xtype: "button",
            ui:    "action",
            text:  "Save",
            handler: this.onSaveButtonTap
        };
        
        var topToolbar = {
            xtype: "toolbar",
            docked:"top",
            title: "Edit Note",
            items: [
                backButton,
                {xtype: "spacer"},
                saveButton
            ]
        }
        
        var deleteButton = {
            xtype: "button",
            iconCls: "trash",
            iconMask: true,
            scope:  this
        }
        
        var bottomToolbar = {
            xtype: "toolbar",
            docked: "bottom",
            items: [
                deleteButton
            ]
        }
        
        var noteTitleEditor = {
            xtype: "textfield",
            name:  "title",
            label: "Title",
            required: true
        }
        
        var noteNarrativeEditor = {
            xtype:  "textareafield",
            name:   "narrative",
            label:  "Narrative"
        }
        
        this.add([
            topToolbar,
                {xtype: "fieldset",
                    items: [noteTitleEditor,noteNarrativeEditor]},
            bottomToolbar
        ]);
    }