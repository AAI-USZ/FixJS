function () {
            var ui = teacss.ui;
            var value = this.optionsCombo.value;
            
            // create dynamic CSS node to reflect fontSize changes for CodeMirror
            var styles = $("#ideStyles");
            if (styles.length==0) {
                styles = $("<style>").attr({type:"text/css",id:"ideStyles"}).appendTo("head");
            }
            styles.html(".CodeMirror {font-size:"+value.fontSize+"px !important; line-height:"+(value.fontSize)+"px !important;}");
            for (var t in ui.codeTab.tabs) {
                var e = ui.codeTab.tabs[t].editor;
                if (e) e.refresh();
            }            
        
            // select where code tabs are located
            if (value.editorLayout=="left") {
                var tabsForFiles = this.tabs;
            } else {
                var tabsForFiles = this.tabs2;
            }
            
            // move already opened code tabs to the right panel if needed
            if (this.tabsForFiles != tabsForFiles) {
                for (var t in ui.codeTab.tabs) {
                    var tab = ui.codeTab.tabs[t];
                    tab.element.detach();
                    this.tabsForFiles.element.tabs("remove",'#'+tab.element.attr("id"));
                    tabsForFiles.addTab(tab);
                }
                this.tabsForFiles = tabsForFiles;
            }            
        }