function()

    {

        var retVal = [];

        

        // no panels defined yet, so create default 3 panel

        if(this.alwaysUseDefaultNorthWestCenter || (this.north == null && this.south == null && this.east == null && this.west == null && this.center == null))

        {

            // default inner - center panel connfig

            var innerCtr = {

                    id:     'center-inner',

                    region: 'center',

                    layout: 'fit',

                    html:     'this is the (inner) center panel'

            };



            // if we have a map attached here, we'll use the GeoExt panel

            if(this.map)

            {

                innerCtr = new GeoExt.MapPanel({

                    id        : otp.util.OpenLayersUtils.MAP_PANEL,

                    region    : 'center',

                    layout    : 'fit',

                    stateful  : false,

                    map       : this.map.getMap(),

                    zoom      : this.map.getMap().getZoom(),

                    bodyStyle : 'background-color:#F7F7F2'

                });

            }





            // this config creates an 'inner' boarder layout, with south and east panels into the main panel

            var centerConfig = {

                title:         this.centerTitle,

                region:        'center',

                id:            'center',

                layout:        'border',

                margins:        '1 0 0 0',

                hideMode:       'offsets',

                items:[

                  innerCtr,

                  {

                    hidden:  true,

                    id:      'south',

                    region:  'south',

                    html:    'this is the (inner) south panel',

                    layout:  'fit',

                    style: {

                      overflow: 'auto'      //otherwise IE won't scroll the elevation plot

                    },

                    height:  180,

                    border:  false,

                    split:   true,

                    useSplitTips:  true,

                    collapseMode: 'mini'

                  }

                  ,

                  {

                    hidden:   true,

                    id:       'east',

                    region:   'east',

                    html:     'this is the (inner) east panel',

                    layout:   'fit',

                    border:   false,

                    width:    250,

                    split:    true,

                    useSplitTips: true,

                    collapseMode: 'mini'

                  }

                ]

            }



            this.center = new Ext.Panel(centerConfig);

            this.innerCenter = this.center.getComponent(0);

            this.innerSouth  = this.center.getComponent(1);

            this.innerEast   = this.center.getComponent(2);





            this.west   = new Ext.Panel({

                layout:       'accordion',

                region:       'west',

                id:           'west-panel',

                header:       false,

                width:        360,

                minSize:      150,

                maxSize:      450,

                margins:      '30 0 1 1',

                split:        true,

                useSplitTips: true,

                collapsible:  true,

                collapseMode: 'mini',

                collapsible:   true,

                layoutConfig:{

                    animate:true,

                    collapseFirst: true

                }

            });

            this.accordion = this.west;

        }



        if(this.south)  retVal.push(this.south);

        if(this.east)   retVal.push(this.east);

        if(this.west)   retVal.push(this.west);

        if(this.center) retVal.push(this.center);

        if(this.north)  retVal.push(this.north);



        return retVal;

    }