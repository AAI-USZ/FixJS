function() {
            this.domTree_map = {};
            var map = this.domTree_map;
            map[null]  = null;
            this.domTree.levelOrder(function(at) {
                console.log(at.id);
                map[at.id] = at;
            });
        }