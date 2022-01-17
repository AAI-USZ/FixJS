function(data){
        console.log("redmine connect : ");

        $('#syncIssues').click(function() {
            socket.emit('redmineExtract::sync', function (err, data) {
                console.log("err : ", err);
                console.log("data : ", data);
            });
        });

        $('#buildStats').click(function() {
            socket.emit('redmineExtract::buildStats', function (err, data) {
                console.log("err : ", err);
                console.log("data : ", data);
                console.log("stats builded !");
            });
        });

        /*
         *socket.emit('redmineExtract::getProjects', function(err, datas) {
         *    console.log("err : ", err);
         *    console.log("data : ", data);
         *    var loopCount = datas.length;
         *    for (var i = 0; i < loopCount; i++) {
         *        var data = datas[i];
         *        console.log("data : ", data);
         *    }
         *    delete loopCount;
         *});
         */
        $('#getIssues').click(function() {
            var $extract = $('#extract tbody');
            $extract.html('');
            $('#dialog-message').html('getting datas');
            socket.emit('redmineExtract::getIssues', function(err, datas) {
                $('#dialog-message').html('');
                //console.log("err : ", err);
                console.log("datas[0] : ", datas[0]);
                display.init(datas);
            });
        });


        socket.on('log', function(data){
            console.log("node log : ", data);
            test = data;
        });
    }