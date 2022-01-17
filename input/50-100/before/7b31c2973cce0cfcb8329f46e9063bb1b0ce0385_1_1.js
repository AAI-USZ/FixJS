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