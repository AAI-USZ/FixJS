function(){
    var ellipsize=fdjtString.ellipsize;
    var getParent=fdjtDOM.getParent;
    var addClass=fdjtDOM.addClass;
    var dropClass=fdjtDOM.dropClass;
    var toggleClass=fdjtDOM.toggleClass;

    function Ellipsis(spec,string,lim){
	var content=ellipsize(string,lim);
	if (content.length===string.length) {
	    if (spec) return fdjtDOM(spec,string);
	    else return document.createTextNode(string);}
	var pct=Math.round((100*(content.length))/string.length);
	var elt=fdjtDOM(spec||"span.ellipsis",content); elt.title=string;
	if (spec) addClass(elt,"ellipsis");
	var remaining=string.slice(content.length);
	var elided=fdjtDOM("span.elided",remaining);
	var elision=fdjtDOM(
	    "span.elision",fdjtString("…%d%% more…",100-pct));
	elt.appendChild(elided); elt.appendChild(elision);
	return elt;}
    fdjtUI.Ellipsis=Ellipsis;

    Ellipsis.expand=function(node){
	if (typeof node === 'string') node=fdjtID(node);
	var ellipsis=getParent(node,".ellipsis");
	addClass(ellipsis,"expanded");
    	dropClass(ellipsis,"compact");};
    Ellipsis.contract=function(node){
	if (typeof node === 'string') node=fdjtID(node);
	var ellipsis=getParent(node,".ellipsis");
	addClass(ellipsis,"compact");
    	dropClass(ellipsis,"expanded");};
    Ellipsis.toggle=function(arg){
	if (!(arg)) arg=event;
	if (typeof arg === 'string') arg=fdjtID(arg);
	else if (arg.nodeType) {}
	else arg=fdjtUI.T(arg);
	var ellipsis=getParent(arg,".ellipsis");
	if (hasClass(ellipsis,"expanded")) {
	    addClass(ellipsis,"compact");
	    dropClass(ellipsis,"expanded");}
	else {
	    addClass(ellipsis,"expanded");
	    dropClass(ellipsis,"compact");}};
}