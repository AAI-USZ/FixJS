function () {

                var params = $(this).is(self.options.handlesHierarchySelector) ? {treeSelector: self.options.treeSelector, slimScroll: true } : {};

                $(this).vde_menu(params);

            }