function(key, newData) {
            var self = this.pagelet ? this.pagelet : this,tmpler = self.get('tmpler');
            if (key.split('.').length > 1) {
                //部分数据更新
                key = key.replace(/^data\./, '');
                self._renderTmpl(tmpler.bricks, key, newData);
            } else {
                var node = new Node(tmpler.to_html(newData));
                var container = self.get('container');
                var containerNode;
                if (node.length > 1) { //如果是多个节点，则创建容器节点
                    containerNode = new Node('<div id="' + S.guid("brick_container") + '"></div>');
                    containerNode.append(node);
                } else {
                    if (!node.attr('id')) {
                        node.attr('id', S.guid('brick_container'));
                    }
                    containerNode = node;
                }
                container.append(containerNode);
                //将节点的引用设置为容器节点，为后期的destroy等方法提供引用
                self.__set('el', '#' + containerNode.attr('id'));
                node = null;
                containerNode = null;
            }
        }