function(root, target, tag){// id || unique style
            //if(this.rootNode) return this.rootNode;
            //tip = tip || this.__className__;
            root = root || '';
            target = target || document;
            tag = tag || 'div';
            //this.rootNode = document.getElementById(root);
            var node = document.getElementById(root);
            if(node) return node;
            var nodesArray = util.getElementsByClassName(root, target, tag);
            //document.getElementsByClassName(root);
            //if(nodesArray.length > 1 && document.getElementById(this.root)) return document.getElementById(this.root);
            //this.rootNode = nodesArray[0];
            if(nodesArray.length === 1) return nodesArray[0];

            //throw new Error('root id, unique style class undefined or more document nodes have unique style class!');
        }