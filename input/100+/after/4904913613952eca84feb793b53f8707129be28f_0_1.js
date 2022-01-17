function(url, times) {
    var ad_url = url;
    var iframe;
    //var is_testing_done = jQuery.Deferred();
    var times_test_run = 0;
    var times_to_test = times || 10;
    var times_taken = [];
    var start_time;
    var that;

    return ({
        'init': function() {
            times_taken = [];
            that = this;
//            is_testing_done = jQuery.Deferred();
            return that;
        },
        'run': function() {
            if (!iframe) { that.make(); };
            if (times_taken.length < times_to_test) {
                iframe.bind('load', that.mark_time);
                start_time = new Date().valueOf();
                iframe.attr( 'src', ad_url );
            } else {
                that.display_results();
            }
            return that;
        },
        'display_results' : function() {
            console.log(times_taken);
            var total = 0;
            for (var i in times_taken) { total += times_taken[i]; };
            average_time  = total / times_taken.length;
            average_seconds = average_time / 1000;
            console.log(average_seconds);
            iframe.before(jQuery('<h3>On average, ' + ad_url + ' took ' + average_seconds +' seconds.</h3>'));
        },
        'mark_time' : function() {
            var now = new Date().valueOf();
            times_taken.push( now - start_time );
            iframe.unbind('load');
            return that.run();
        },
        'iframe': function() {
            return iframe;
        },
        'make' : function() {
            if ( !that ) {
                this.init();
            }
            iframe = jQuery('<iframe></iframe>');
            jQuery('body').append(iframe);
            return that;
        },
        'ad_url' : function(url) {
            if (url) {
                ad_url = url;
                return that;
            } else {
                return ad_url;
            }
        }
    }).init();
}