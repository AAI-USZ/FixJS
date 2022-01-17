function(lines) {
            var firstLineIndex = this.currentEditor.renderer.getFirstVisibleRow();
            var lastLineIndex  = this.currentEditor.renderer.getLastVisibleRow();
            
            var fun = function() {
                
                editor.renderer.$gutterLayer.update({lines: lines});
            };
            setTimeout(fun, 1000);
        }