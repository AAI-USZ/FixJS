function (hook_name, args, cb)
{
	// Iterate through the child nodes (spans) and point SyntaxHighlighter at them
	
	 var children = args.node.children;
	 
	 if(typeof children === "undefined") { return; }
	 
	 for(var i = 0; i < children.length; i++)
	 {
		if(args.node.children[i].className.indexOf("list") != -1 || args.node.children[i].className.indexOf("tag") != -1 || args.node.children[i].className.indexOf("url") != -1) continue;
		if( padcookie.getPref("SH_BRUSH") != 'undefined' ) {
			SyntaxHighlighter.highlight( {"brush": padcookie.getPref("SH_BRUSH") } , args.node.children[i] );
		}
	 }
}