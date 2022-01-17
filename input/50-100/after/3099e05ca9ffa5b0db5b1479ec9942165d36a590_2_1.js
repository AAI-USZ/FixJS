function(data){
            data = data.paging;
            var root = this.rootNode;
            root.innerHTML = util.parseTpl(this.pageTpl, this.prepareTplConfig(data));
            util.removeClass(root, this.hideClass);

            this.registerEvents();
        }