function()

    {

        // Fetch binding.

        this.binding = this.viewer.getBinding();

        

        // Set fields.

        var fields = [];

        for (var i = 0; i < this.binding.getScanAmount(); i++)

        {

            var scan = this.binding.getScans()[i];

            

            fields[i] = [

                scan.get('scanId'),

                i,
                scan.get('page'),
                scan.get('width'),
                scan.get('height')

            ];

        }

        

        // Create store.

        var store = Ext.create('Ext.data.ArrayStore', {

            name: 'thumbnailStore',

            fields: ['id', 'index', 'page', 'width', 'height'],

            pageSize: 10,

            data: fields

        });

        

        var _this = this;

        var defConfig = {

            store: store,

            tpl: [

                '<tpl for=".">',
                    '<div class="thumbnail">',

                        '<div class="thumbnail-inner" style="width: {width}px; height: {height}px; visibility: hidden">',

                            '<img src="" alt="" title="Page {page}" width="{width}" height="{height}"/>',

                            '<div class="thumbnail-rect" style="display: none;" title="Page {page}"></div>',

                        '</div>',
                    '</div>',

                '</tpl>',

            ],
            style: 'height: 100%', // For scrollbars to appear correctly.

            store: store,

            itemSelector: 'div.thumbnail',
            autoScroll: true,

            listeners: {

                itemclick: function(view, model)

                {
                    var index = model.get('index');

                    
                    _this.viewer.gotoPage(index);

                }

            }
        };

        

        Ext.apply(this, defConfig);

        

        this.callParent();
    }