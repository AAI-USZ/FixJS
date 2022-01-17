function(params) {
            // Set group for parent class
            this.groups = ['block'];
            this.samenodeclass = CSS.BLOCK;
            this.parentnodeclass = CSS.REGIONCONTENT;

            // Initialise blocks dragging
            var blockregionlist = Y.Node.all('#'+CSS.PAGECONTENT+' div.'+CSS.BLOCKREGION);

            if (blockregionlist.size() === 0) {
                return false;
            }

            // See if we are missing either of block regions,
            // if yes we need to add an empty one to use as target
            if (blockregionlist.size() != this.get('regions').length) {
                var blockregion = Y.Node.create('<div></div>')
                    .addClass(CSS.BLOCKREGION);
                var regioncontent = Y.Node.create('<div></div>')
                    .addClass(CSS.REGIONCONTENT);
                blockregion.appendChild(regioncontent);

                var regionid = this.get_region_id(blockregionlist.item(0));
                if (regionid === 'post') {
                    // pre block is missing, instert it before post
                    blockregion.setAttrs({id : 'region-pre'});
                    blockregionlist.item(0).insert(blockregion, 'before');
                    blockregionlist.unshift(blockregion);
                } else {
                    // post block is missing, instert it after pre
                    blockregion.setAttrs({id : 'region-post'});
                    blockregionlist.item(0).insert(blockregion, 'after');
                    blockregionlist.push(blockregion);
                }
            }

            blockregionlist.each(function(blockregionnode) {

                // Setting blockregion as droptarget (the case when it is empty)
                // The region-post (the right one)
                // is very narrow, so add extra padding on the left to drop block on it.
                var tar = new Y.DD.Drop({
                    node: blockregionnode.one('div.'+CSS.REGIONCONTENT),
                    groups: this.groups,
                    padding: '40 240 40 240'
                });

                var blocklist = blockregionnode.all('.'+CSS.BLOCK);
                blocklist.each(function(blocknode) {
                    var move = blocknode.one('a.'+CSS.EDITINGMOVE);
                    if (move) {
                        move.remove();
                        blocknode.one('.'+CSS.HEADER).setStyle('cursor', 'move');
                        // Make each div element in the list of blocks draggable
                        var dd = new Y.DD.Drag({
                            node: blocknode,
                            groups: this.groups,
                            // Make each div a Drop target too
                            target: true,
                            handles: ['.'+CSS.HEADER]
                        }).plug(Y.Plugin.DDProxy, {
                            // Don't move the node at the end of the drag
                            moveOnEnd: false
                        }).plug(Y.Plugin.DDConstrained, {
                            // Keep it inside the .course-content
                            constrain: '#'+CSS.PAGECONTENT
                        }).plug(Y.Plugin.DDWinScroll);
                    }
                }, this);
            }, this);
        }