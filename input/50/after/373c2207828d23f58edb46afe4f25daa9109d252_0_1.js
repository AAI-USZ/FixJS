function(){
    var samples;
    function sample_loaded(data) {
        samples = data;
        // TODO: show list of samples[x]['name']
        $("#source").val(samples[0]['code'])
    }
    $.get(
        //'sample/sample.json', // for local development
        'repos/FORTH-on-browser/sample/sample.json', // for deployment
        sample_loaded, 'json');
}