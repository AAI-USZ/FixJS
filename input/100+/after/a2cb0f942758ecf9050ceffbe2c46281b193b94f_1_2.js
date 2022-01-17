function(key, newData) {
            var self = this.pagelet ? this.pagelet : this,tmpler = self.get('tmpler');
            if (key.split('.').length > 1) {
                //部分数据更新
                key = key.replace(/^data\./, '');
                self._renderTmpl(tmpler.bricks, key, newData);
            } else {
                var container = self.get('container');
                container.append(tmpler.to_html(newData));
            }
        }