function start (points) {

    // var lat = points['little.jpg']['lat'];
    // var longitude = points['little.jpg']['long'];


    var app = require('express').createServer();

    app.set('views', __dirname + '/views');

    // app.use(app.static(__dirname + '/../public'));

    app.get('/', function (req, res) {
        res.render('index.jade', {title: 'maps', points: points});
    });

    app.listen(1234, '50.116.52.79');
    console.log('server is running');


    // console.log(points);
}