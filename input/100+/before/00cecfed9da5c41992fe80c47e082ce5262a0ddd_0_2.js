function(){

var doc = document, win = window, Element = win.Element

var classByNodeName =
{
	'SCRIPT': HTMLScriptElement,
	'INPUT': HTMLInputElement,
	'FORM': HTMLFormElement
}

function fixNodes (nodes)
{
	for (var i = 0, il = nodes.length; i < il; i++)
		fixNode(nodes[i])
}

function fixNode (node)
{
	if (node.__pmc__nodeFixed)
		return
	node.__pmc__nodeFixed = true
	
	var klass = classByNodeName[node.nodeName] || Element
	
	// it is possible to use only one prototype,
	// if classByNodeName[…] inherits from Element
	var proto = klass.prototype
	for (var p in proto)
		node[p] = proto[p]
	
	var hook = klass.__pmc_fixHook
	if (hook)
		hook(node)
}


doc.__pmc__createElement = doc.createElement
doc.createElement = function (type)
{
	var node = doc.__pmc__createElement(type)
	fixNode(node)
	return node
}

// events must be fixed at this point to preserve handlers call order
win.addEventListener('load', function () { fixNodes(doc.all) })
document.__pmc__fixNodes = fixNodes

}