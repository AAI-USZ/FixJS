function(el, container, bricks, arr) {
            var self = this,
                id = _stamp(el),
                name = el.attr('bx-name'),
                path = el.attr('bx-path'),
                config = el.attr('bx-config'),
                tmplNodes = el.all('[bx-tmpl=' + name + ']');
            if (el.hasAttr('bx-tmpl')) {
                tmplNodes = tmplNodes.add(el[0]);
            }
            config = config ? eval("config=" + config) : {};
            bricks[id] = {
                name:name,
                path: path,
                config: config,
                tmpls: [],
                bricks: {}
            };
            var tmpls = bricks[id].tmpls;
            tmplNodes.each(function(tmplNode) {
                var tmplId = _stamp(tmplNode, 'tmpl_'),
                    datakey = tmplNode.attr('bx-datakey'),
                    tmpl = _recovery(tmplNode.html(), arr);
                tmpls.push({
                    id: tmplId,
                    datakey: datakey ? datakey.split(',') : [],
                    tmpler: new Tmpler(tmpl, false)
                });
            });
            tmplNodes = null;
            //递归调用获取子brick
            container.all('[bx-parent=' + name + ']').each(function(subBrick) {
                self._buildBrick(subBrick, container, bricks[id].bricks);
            });
        }