function(node, dataList) {
  var me = eXo.wiki.UITreeExplorer;
  var resultLength = dataList.jsonList.length;

  var str = "";
  for ( var i = 0; i < resultLength; i++) {
    str += me.buildNode(dataList.jsonList[i]);
  }
  node.innerHTML = str;
}