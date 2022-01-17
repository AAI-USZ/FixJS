function() {
            var data = $("#" + select)[0].value;
            settings = {
                'extraData': {
                    'parent': {
                        'model': 'Tree',
                        'id': tm.currentTreeId
                    }
                },
                model: model,
                fieldName: data,
                submit: 'Save',
                cancel: 'Cancel'
            };    
            
            $(this.parentNode.parentNode).remove();
            var d = new Date();
            var dateStr = (d.getYear()+1900)+"-"+(d.getMonth()+1)+"-"+d.getDate();
            tm.updateEditableServerCall(dateStr, settings)
            for (var i=0;i<data_array.length; i++) {
                if (data_array[i][0] == data) {
                    $("#" + table).append(
                        $("<tr><td>"+data_array[i][1]+"</td><td>"+dateStr+"</td><td></td></tr>"));  
                    $("#" + count).html(parseInt($("#" + count)[0].innerHTML) + 1); 
                    break;
                }
            }   
        }