function getItem(nodeList,index){

        //this works in IE, other browsers, Rhino, and nodejs xmldom library

        return "item" in nodeList ? nodeList.item(index) : nodeList[index];

    }