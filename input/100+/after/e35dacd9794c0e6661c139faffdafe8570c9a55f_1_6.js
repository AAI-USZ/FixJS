function(req){
    		if (req.responseText.length > 0) {
    			var res = eval("("+req.responseText+")");
    			if (el.dirty) {
					Ext.MessageBox.show({
           				title:'Conflict!',
           				msg: 'While you were editing <b><code>'+el.up('form').down('input').value+'</code></b>, someone else updated it. <br/>Please see below:<br/><div id="conflict-text"></div>Do you want to apply the changes?',
           				buttons: Ext.MessageBox.YESNO,
           				fn: function(btn) {
           					if (btn == "yes") {
			    				el.down("iframe").contentWindow.txt.initComplete = false;
			    				Builder.setCode(el, res["code"]);
			    				setTimeout(function() {
			    					el.down("iframe").contentWindow.txt.initComplete = true;
			    				}, 250);
           					}
           				},
           				minWidth: 500,
           				icon: Ext.MessageBox.WARNING
       				});
       				var oldCode = Builder.getCode(el);
       				setTimeout(function() {
       					$("conflict-text").innerHTML = diffString(oldCode, res["code"]);
       				}, 100);
    			} else {
    				el.down("iframe").contentWindow.txt.initComplete = false;
    				Builder.setCode(el, res["code"]);
    				setTimeout(function() {
    					el.down("iframe").contentWindow.txt.initComplete = true;
    				}, 250);
    			}
    		}
    	}