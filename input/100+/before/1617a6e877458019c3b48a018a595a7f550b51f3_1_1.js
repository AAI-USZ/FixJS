function($) {



    /**

     * Widget container

     */

    $.widget('vde.vde_container', $.ui.sortable, {

        options: {

            tolerance: 'pointer',

            revert: true,

            connectWithSelector: '.vde_element_wrapper.vde_container',

            placeholder: 'vde_placeholder',

            hoverClass: 'vde_container_hover',

            items: '.vde_element_wrapper.vde_draggable',

            helper: 'clone',

            appendTo: 'body'

        },

        _create: function () {

            this.element.data('sortable', this);

            var self = this;

            this.options = $.extend({}, this.options, {

                start: function(event, ui) {

                    ui.placeholder.css({height: $(ui.helper).outerHeight(true)});

                    $(this).sortable('option', 'connectWith', $(self.options.connectWithSelector).not(ui.item))

                        .sortable('refresh');

                },

                over: function(event, ui) {

                    self.element.addClass(self.options.hoverClass);

                },

                out: function(event, ui) {

                    self.element.removeClass(self.options.hoverClass);

                }

            });

            $.ui.sortable.prototype._create.apply(this, arguments);

        }

    });



    /**

     * Widget panel

     */

    $.widget('vde.vde_panel', {

        options: {

            cellSelector: '.vde_toolbar_cell',

            handlesHierarchySelector: '#vde_handles_hierarchy',

            treeSelector: '#vde_handles_tree'

        },

        _create: function () {

            var self = this;

            this.element.find(this.options.cellSelector).each(function () {

                var params = $(this).is(self.options.handlesHierarchySelector) ? {treeSelector: self.options.treeSelector, slimScroll: true } : {};

                $(this).vde_menu(params);

            });

        }

    });



    /**

     * Widget page

     */

    $.widget('vde.vde_page', {

        options: {

            containerSelector: '.vde_element_wrapper.vde_container',

            panelSelector: '#vde_toolbar',

            highlightElementSelector: '.vde_element_wrapper',

            highlightElementTitleSelector: '.vde_element_title',

            highlightCheckboxSelector: '#vde_highlighting',

            cookieHighlightingName: 'vde_highlighting'

        },

        _create: function () {

            this._initContainers();

            this._initPanel();

        },

        _initContainers: function () {

            $(this.options.containerSelector)

                .vde_container().disableSelection();

        },

        _initPanel: function () {

            $(this.options.panelSelector).vde_panel();

        }

    });



    /**

     * Widget page highlight functionality

     */

    var pageBasePrototype = $.vde.vde_page.prototype;

    $.widget('vde.vde_page', $.extend({}, pageBasePrototype, {

        _create: function () {

            pageBasePrototype._create.apply(this, arguments);

            if (this.options.highlightElementSelector) {

                this._initHighlighting();

                this._bind();

            }

        },

        _bind: function () {

            var self = this;

            this.element

                .on('checked.vde_checkbox', function () {

                    self._highlight();

                })

                .on('unchecked.vde_checkbox', function () {

                    self._unhighlight();

                });

        },

        _initHighlighting: function () {

            if (this.options.highlightCheckboxSelector) {

                $(this.options.highlightCheckboxSelector)

                    .vde_checkbox();

            }

            this.highlightBlocks = {};

            if (Mage.Cookies.get(this.options.cookieHighlightingName) == 'off') {

                this._processMarkers();

            }



        },

        _highlight: function () {

            Mage.Cookies.clear(this.options.cookieHighlightingName);

            var self = this;

            $(this.options.highlightElementSelector).each(function () {

                $(this)

                    .append(self._getChildren($(this).attr('id')))

                    .show()

                    .children(self.options.highlightElementTitleSelector).slideDown('fast');

            });

            this.highlightBlocks = {};

        },

        _unhighlight: function () {

            Mage.Cookies.set(this.options.cookieHighlightingName, 'off');

            var self = this;

            $(this.options.highlightElementSelector).each(function () {

                var elem = $(this);

                elem.children(self.options.highlightElementTitleSelector).slideUp('fast', function () {

                    var children = elem.contents(':not(' + self.options.highlightElementTitleSelector + ')');

                    var parentId = elem.attr('id');

                    children.each(function () {

                        self._storeChild(parentId, this);

                    });

                    elem.after(children).hide();

                });

            });

        },

        _processMarkers: function () {

            var self = this,

                parentsIdsStack = [],

                currentParentId;

            $('*').contents().each(function () {

                if (this.nodeType == Node.COMMENT_NODE) {

                    if (this.data.substr(0, 9) == 'start_vde') {

                        currentParentId = this.data.substr(6, this.data.length);

                        parentsIdsStack.push(currentParentId);

                        this.parentNode.removeChild(this);

                    } else if (this.data.substr(0, 7) == 'end_vde') {

                        if (this.data.substr(4, this.data.length) !== currentParentId) {

                            throw "Could not find closing element for opened '" + currentParentId + "' element";

                        }

                        parentsIdsStack.pop();

                        currentParentId = parentsIdsStack[parentsIdsStack.length - 1];

                        this.parentNode.removeChild(this);

                    }

                } else if (currentParentId) {

                    self._storeChild(currentParentId, this);

                }

            })

        },

        _storeChild: function(parentId, child) {

            if (!this.highlightBlocks[parentId]) {

                this.highlightBlocks[parentId] = [];

            }

            this.highlightBlocks[parentId].push(child);

        },

        _getChildren: function(parentId) {

            return (!this.highlightBlocks[parentId]) ? [] : this.highlightBlocks[parentId];

        }

    }));

}