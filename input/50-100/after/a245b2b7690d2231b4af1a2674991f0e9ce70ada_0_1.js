function clearFlameLayer() {

    var canvas, context;

    canvas = document.getElementById('flames');

    context = canvas.getContext('2d');

    context.clearRect(0,0,graph.width * 30,graph.height * 30);

}