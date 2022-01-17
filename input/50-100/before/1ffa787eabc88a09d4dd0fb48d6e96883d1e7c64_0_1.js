function buildGraph(node_id, title) {
    var graphNode = document.getElementById('graph');
    graphNode.centerCircle = createCircleStructure(title, node_id, "StructureNode");
    graphNode.circles = new Array(graphNode.centerCircle);
    graphNode.arrows = new Array();
    Dajaxice.structure.getNodeInfo(amendGraph, {'node_id' : node_id, 'node_type' : 'StructureNode'});
    // TODO: setTimeout("showText(graphNode.circles[1])", 500);
}