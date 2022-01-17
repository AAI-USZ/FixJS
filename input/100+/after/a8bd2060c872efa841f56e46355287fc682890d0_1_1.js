function (node)
    {
        //console.log(node);
        if (node.nodeName == "#text") {
            // clean up silly Windows -- stuff?
            return; 
        }
        if (node.nodeName == "#comment") {
            node.parentNode.removeChild(node);
            // clean up silly Windows -- stuff?
            return; 
        }
        
        if (Roo.form.HtmlEditor.black.indexOf(node.tagName.toLowerCase()) > -1) {
            // remove node.
            node.parentNode.removeChild(node);
            return;
            
        }
        
        var remove_keep_children= Roo.form.HtmlEditor.remove.indexOf(node.tagName.toLowerCase()) > -1;
        
        // remove <a name=....> as rendering on yahoo mailer is bored with this.
        
        if (node.tagName.toLowerCase() == 'a' && !node.hasAttribute('href')) {
            remove_keep_children = true;
        }
        
        if (remove_keep_children) {
            this.cleanUpChildren(node);
            // inserts everything just before this node...
            while (node.childNodes.length) {
                var cn = node.childNodes[0];
                node.removeChild(cn);
                node.parentNode.insertBefore(cn, node);
            }
            node.parentNode.removeChild(node);
            return;
        }
        
        if (!node.attributes || !node.attributes.length) {
            this.cleanUpChildren(node);
            return;
        }
        
        function cleanAttr(n,v)
        {
            
            if (v.match(/^\./) || v.match(/^\//)) {
                return;
            }
            if (v.match(/^(http|https):\/\//) || v.match(/^mailto:/)) {
                return;
            }
            Roo.log("(REMOVE)"+ node.tagName +'.' + n + '=' + v);
            node.removeAttribute(n);
            
        }
        
        function cleanStyle(n,v)
        {
            if (v.match(/expression/)) { //XSS?? should we even bother..
                node.removeAttribute(n);
                return;
            }
            
            
            var parts = v.split(/;/);
            Roo.each(parts, function(p) {
                p = p.replace(/\s+/g,'');
                if (!p.length) {
                    return true;
                }
                var l = p.split(':').shift().replace(/\s+/g,'');
                
                // only allow 'c whitelisted system attributes'
                if (Roo.form.HtmlEditor.cwhite.indexOf(l) < 0) {
                    Roo.log('(REMOVE)' + node.tagName +'.' + n + ':'+l + '=' + v);
                    node.removeAttribute(n);
                    return false;
                }
                return true;
            });
            
            
        }
        
        
        for (var i = node.attributes.length-1; i > -1 ; i--) {
            var a = node.attributes[i];
            //console.log(a);
            if (Roo.form.HtmlEditor.ablack.indexOf(a.name.toLowerCase()) > -1) {
                node.removeAttribute(a.name);
                continue;
            }
            if (Roo.form.HtmlEditor.aclean.indexOf(a.name.toLowerCase()) > -1) {
                cleanAttr(a.name,a.value); // fixme..
                continue;
            }
            if (a.name == 'style') {
                cleanStyle(a.name,a.value);
                continue;
            }
            /// clean up MS crap..
            // tecnically this should be a list of valid class'es..
            
            
            if (a.name == 'class') {
                if (a.value.match(/^Mso/)) {
                    node.className = '';
                }
                
                if (a.value.match(/body/)) {
                    node.className = '';
                }
                continue;
            }
            
            // style cleanup!?
            // class cleanup?
            
        }
        
        
        this.cleanUpChildren(node);
        
        
    }