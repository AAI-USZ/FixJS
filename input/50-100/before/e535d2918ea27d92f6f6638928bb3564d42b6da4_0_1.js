function(){
        this.init();
        var _self = this;

        ide.addEventListener("socketMessage", this.gitcCommands.onMessage.bind(this.gitcCommands));
        ide.addEventListener("afteropenfile", this.gitEditorVis.onOpenFile);
        tabEditors.addEventListener("beforeswitch", this.gitEditorVis.onTabSwitch.bind(this.gitEditorVis));
        ide.addEventListener("aftersavefile", this.gitEditorVis.onSaveFile.bind(this.gitEditorVis));


    }