function (d) {
                        // 如果数据错误, 则立即结束
                        if (d.stat !== 'ok') {
                            alert('load data error!');
                            end();
                            return;
                        }
                        // 如果到最后一页了, 也结束加载
                        nextpage = d.photos.page + 1;
                        if (nextpage > d.photos.pages) {
                            end();
                            return;
                        }
                        // 拼装每页数据
                        var items = [];
                        S.each(d.photos.photo, function (item) {
                            item.height = Math.round(Math.random() * (300 - 180) + 180); // fake height
                            items.push(new S.Node(tpl.render(item)));
                        });
                        var right = new S.Node('<div class="pin ks-waterfall ks-waterfall-fixed-right">' +
                            '<div style="height: 100px">' +
                            S.guid('always right') +
                            '</div>' +
                            '</div>');
                        items.push(right);

                        var left = new S.Node('<div class="pin ks-waterfall ks-waterfall-fixed-left">' +
                            '<div style="height: 100px">' +
                            S.guid('always left') +
                            '</div>' +
                            '</div>');
                        items.push(left);
                        success(items);
                    }