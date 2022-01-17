function()

    {

        // Fetch binding.

        this.binding = this.viewer.getBinding();

        

        // Set fields.

        var fields = [];

        for (var i = 0; i < this.binding.getScanAmount(); i++)

        {

            var scan = this.binding.getScans()[i];

            

            var thumbnail = 'data/thumbnails/' + scan.get('scanId') + '.jpg';

            

            fields[i] = [

                scan.get('scanId'),

                thumbnail,

                i

            ];

        }

        

        // Create store.

        var store = Ext.create('Ext.data.ArrayStore', {

            id: 'testStore',

            fields: ['id', 'thumbnail', 'index'],

            pageSize: 10,

            data: fields

        });

        

        var _this = this;

        var defConfig = {

            store: store,

            tpl: [

                '<tpl for=".">',
                    '<div class="thumbnail">',

                        '<div class="thumbnail-inner">',

                            '<img src="{thumbnail}" alt="" />',

                            '<div class="thumbnail-rect" style="display: none;"></div>',

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