function(e) {
        e.preventDefault();
        if(e.keyCode == 13) return false;
        var val = this.value + '*';
        if (val.length >= 3 || val == '*') {
            delay(function(){
                if (val.length >= 3 || val == '*') {
                    //alert(val);
                    //$('#loader').show();
                    $("#lightbox, #lightbox-loader").fadeIn(300);

                    $('#content').load(
                        $('#search_keywords').parents('form').attr('action') + "?page=1&query=" + encodeURI(val),
                        //$('#search_keywords').parents('form').attr('action'),
                        { query: val },
                        function() {
                            //$('#loader').hide();
                            $("#lightbox, #lightbox-loader").fadeOut(300);
                            //window.location.href = $('#search_keywords').parents('form').attr('action') + "?page=1&query=" + val;
                        }
                    );
                }
            }, 800 );
        }
    }