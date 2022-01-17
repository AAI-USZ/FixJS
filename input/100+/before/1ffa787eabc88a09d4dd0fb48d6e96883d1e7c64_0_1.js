function amendGraph(data) {
    var graphNode = document.getElementById('graph');
    var circles = graphNode.circles;
    var arrows = graphNode.arrows;
    var currentIndex = getIndexInCircles(circles, data['id'], data['type']);
    var parent = circles[currentIndex];
    // TODO: Set text
    for (var i = 0; i < data['children'].length; i++) {
        var child_data = data['children'][i];
        var childIndex = getIndexInCircles(circles, child_data['id'], child_data['type']);
        if (childIndex == -1) {
            var child = createCircleStructure(child_data['short_title'], child_data['id'], child_data['type']);
            circles.push(child);
            document.getElementById('graph').appendChild(child);
            var arrow = createArrowStructure(parent, child);
            arrows.push(arrow);
            graphNode.insertBefore(arrow, graphNode.firstChild);
        }
    }

    graphNode.circles = circles;
    graphNode.arrows = arrows;
    step(); //TODO: Check if step is running
}