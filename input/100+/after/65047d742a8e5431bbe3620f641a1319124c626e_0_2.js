function(items, show)			// DRAW LAYER CONTROLBOX

{

	var i;

	if (show != true) {														// If not on

		$("#shivaMapControlDiv").remove();									// Remove it

		return;																// Quit

		}

	_this=this;																// Local copy of this

	var l=$("#"+this.container).css("left").replace(/px/g,"");				// Get left

	var t=$("#"+this.container).css("top").replace(/px/g,"");				// Get top

	var h=$("#"+this.container).css("height").replace(/px/g,"");			// Get height

	if (t == "auto")	t=8;												// Must be a num

	if (l == "auto")	l=8;												// Must be a num

	if ($("#shivaMapControlDiv").length == 0) {								// If no palette

		str="<div id='shivaMapControlDiv' style='position:absolute;left:"+l+"px;top:"+((t-0)+(h-0)+8)+"px'>";

		$("body").append("</div>"+str);										// Add palette to body

		$("#shivaMapControlDiv").addClass("rounded-corners").css("background-color","#eee").css('border',"1px solid #ccc");

		$("#shivaMapControlDiv").draggable();								// Make it draggable

		$("#shivaMapControlDiv").css("z-index",2001);						// Force on top

		}

	var str="<p style='text-shadow:1px 1px white' align='center'><b>&nbsp;&nbsp;Layer Controls&nbsp;&nbsp;</b></p>";

	for (i=0;i<items.length;++i) 											// For each item

		if (items[i].layerTitle) {											// If a title defined

			str+="&nbsp;<input type='checkbox' id='shcb"+i+"'";				// Add check

			if (items[i].visible == "true")									// If initially visible

				str+=" checked=checked ";									// Set checked

			str+=">"+items[i].layerTitle+"&nbsp;&nbsp;<br/>";				// Add label

			}

	$("#shivaMapControlDiv").html(str+"<br/>");								// Add content	

	for (i=0;i<items.length;++i) 											// For each item

		$("#shcb"+i).click( function() { $.proxy(_this.SetLayer(this.id.substr(4),this.checked.toString()),_this); } );  // Add handler

}