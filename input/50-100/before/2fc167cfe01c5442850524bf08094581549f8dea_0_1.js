function( json ) {
            table.fnClearTable(this);

            for (var i=0; i<json.aaData.length; i++) {
                var ins = ((json.aaData.length)-1)-i;
                table.oApi._fnAddData(oSettings, json.aaData[ins]);
            }

            oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
            table.fnDraw();
        }