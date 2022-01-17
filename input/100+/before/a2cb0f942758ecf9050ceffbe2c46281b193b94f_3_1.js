function(tmpl) {
            var self = this;
            var node = $(tmpl);
            var tmplNode = null;
            var inDom = _inDom(node[0]); //判断是否已经添加到dom中
            if (!inDom) {
                node.remove();
                //牛逼的正则啊
                var reg = /(\{{2,3}\#(.+)?\}{2,3})\s*([\s\S]*)?\s*((\{{2,3})\/\2(\}{2,3}))/g;
                while (reg.test(tmpl)) {
                    tmpl = tmpl.replace(reg, ' $1$3$5~$2$6 ');
                    //console.log(reg.lastIndex);
                    //不重置位置，我了个去，ie7，8有问题
                    reg.lastIndex = 0;
                }
                //对if语句的处理
                var arr = [];
                tmpl = tmpl.replace(/(\{{2,3}[\^#~])?(if\(.*?\))(\}{2,3})?/ig, function(w, i, j, k, m, n) {
                    var index = S.indexOf(j, arr),
                        name = 'iftmplbrick_';
                    if (index < 0) {
                        name += arr.length;
                        arr.push(j);
                    } else {
                        name += index;
                    }
                    return i + name + k;
                });
                tmplNode = $('<div></div>').append(tmpl);
            } else {
                _stamp(node);
                tmplNode = node;
            }
            var tmplTargetNodes = tmplNode.all('[bx-tmpl-source]');
            tmplTargetNodes.each(function(node) {
                var selector = node.attr('bx-tmpl-source');
                var temptmplNode = tmplNode.one(selector).clone(true);
                temptmplNode.removeAttr('id');
                _stamp(temptmplNode, 'tmpl_');
                temptmplNode.insertBefore(node);
                node.remove();
            });

            var bks = tmplNode.all('[bx-brick]:not([bx-parent])');
            bks.each(function(el) {
                self._buildBrick(el, tmplNode, self.bricks, arr);
            });

            if (!inDom) {
                self.tmpl = _recovery(tmplNode.html(), arr);
                tmplNode.remove();
            }
            tmplNode = null;
            node = null;
            this.inDom = inDom;
        }