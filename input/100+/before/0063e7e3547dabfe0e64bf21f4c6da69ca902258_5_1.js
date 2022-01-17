function(index, value) {
                if (value.description){
                    value.description = sakai.api.Util.applyThreeDots(value.description, 680, {max_rows: 3});
                }
                
                if (value.fullresult) {
                    var placement = "ecDocViewer" + tuid + value["_path"] + index;
                    wData.items[index].placement = placement;
                    docData[placement] = {
                        data: value.fullresult,
                        url: window.location.protocol + '//' + window.location.host + "/p/" + value.fullresult['jrc:name']
                    };
                }
            }