function(data){
            data = data.paging;

            var root = this.rootNode;
            root.innerHTML = util.parseTpl(this.pageTpl, this.prepareTplConfig(data));
            this.registerEvents();
            util.removeClass(root, this.hideClass);
        }