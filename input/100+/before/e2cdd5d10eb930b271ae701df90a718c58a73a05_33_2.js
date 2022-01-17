function(e, ui) {
            var $target = $(e.target);
            var savePath = $target.parents('.lhnavigation_menuitem:first').data('sakai-savepath');
            var structure = sakaiDocsInStructure[savePath];
            var $list = $target.parents('ul div.lhnavigation_menu_list');
            if ($target.parents('ul.lhnavigation_subnav').length) {
                $list = $target.parents('ul.lhnavigation_subnav');
            }
            var area = privstructure;
            if ($list.data('sakai-space') === 'public') {
                area = pubstructure;
            }
            $list.children('li').each(function(i, elt) {
                var path = ''+$(elt).data('sakai-path');
                var struct0path = path;
                if ($(elt).data('sakai-ref').indexOf('-') === -1) {
                    if (struct0path.indexOf('/') > -1) {
                        var split = struct0path.split('/');
                        structure.structure0[split[0]][split[1]]._order = i;
                    } else {
                        structure.structure0[struct0path]._order = i;
                    }
                } else {
                    if (struct0path.indexOf('/') > -1) {
                        struct0path = struct0path.split('/')[1];
                    }
                    structure.structure0[struct0path]._order = i;
                }
                var item = getPage(path, area.items);
                item._order = i;
            });
            storeStructure(structure.structure0, savePath);
            e.stopImmediatePropagation();
        }