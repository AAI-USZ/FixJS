function(){
                if(confirm("Delete history?") === true){
                    $.ajax({
                        url: "http://" + window.location.host + "/delete",
                        type: 'GET',
                        dataType: 'text',
                        success: function(data, status, xhr){
                            $('#saved-searches-list').
                                html('<li>' + data + '</li>');
                        },
                        failure: function(xhr, status, error){
                            alert("Error: " + status + error);
                        }
                    })
                }
            }