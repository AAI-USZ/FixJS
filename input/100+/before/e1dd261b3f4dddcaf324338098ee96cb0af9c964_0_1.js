function showNode(node) {
    var graphNode = document.getElementById('graph');
    var circles = graphNode.circles;
    //var i = 1;
    // remove ALL other nodes TODO: keep parent for back-navigation
    /*while (circles.length > 3) {
     if (circles[i] == node) {
     i++;
     } else {
     if (circles[i] == node.forces[0].massB) {
     i++;
     } else {
     circles.splice(i, 1);
     }
     }
     }*/
    // reset all nodes
    for (var i = 1; i < circles.length; i++) {
        // make circles clickable
        graphNode.circles[i].firstChild.firstChild.setAttribute("class", "linklike");
        // remove force to center
        graphNode.circles[i].particle.targetY = 0.0;
        graphNode.circles[i].particle.targetX = null;
    }
    // pull node to center
    node.targetX = 0.0;

    // mark centerCircle clicked
    for (i = 0; i < node.firstChild.firstChild.attributes.length; i++){
        if (node.firstChild.firstChild.attributes[i].name == "class"){
            node.firstChild.firstChild.attributes[i].value = "";
        }
    }

    graphNode.centerCircle = node;
    Dajaxice.structure.getNodeInfo(amendGraph, {'node_id':node.dbId, 'node_type':node.type});
    showText(node);
}