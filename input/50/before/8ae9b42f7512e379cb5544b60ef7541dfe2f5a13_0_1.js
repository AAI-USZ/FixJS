function  initialCleanUp() {
    /* Remove Previously Existing Grid Elements */
    $('#hugrid').remove();
    $('#hugridRows').remove();
    $('#hugridUX').remove();
    window.hugrid.state.gridstate = 'off' ;
    }