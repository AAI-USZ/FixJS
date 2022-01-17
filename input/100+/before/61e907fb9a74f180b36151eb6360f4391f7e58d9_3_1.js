function(obj) {
                    this.showOutput(cmp);
                    cmp.getEl().mask(this.waitMsgText);

                    var format = new OpenLayers.Format.GeoJSON();
                    var geometry = format.write(obj.feature.geometry);

                    Ext.Ajax.request({
                        url: this.serviceUrl,
                        method: 'POST',
                        params: {
                            layers: this.rasterLayers.join(','),
                            geom: geometry,
                            nbPoints: this.nbPoints
                        },
                        success: function(result) {
                            var data = new OpenLayers.Format.JSON().read(result.responseText);
                            this.drawProfile(data.profile);
                        },
                        scope: this
                    });
                }