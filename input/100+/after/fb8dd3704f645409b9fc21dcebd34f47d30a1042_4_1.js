function() {
		var container = (Ti.UI._container = Ti.UI.createView({
				left: 0,
				top: 0
			})),
			node = container.domNode,
			coefficients = container._layoutCoefficients; 

		coefficients.width.x1 = 1;
		coefficients.height.x1 = 1;
		container._measuredTop = 0;
		container._measuredLeft = 0;
		node.id = "TiUIContainer";
		setStyle(node, "overflow", "hidden");
		body.appendChild(node);

		(splashScreen = doc.getElementById("splash")) && container.addEventListener("postlayout", function(){
			setTimeout(function(){
				setStyle(splashScreen,{
					position: "absolute",
					width: unitize(container._measuredWidth),
					height: unitize(container._measuredHeight),
					left: 0,
					top: 0,
					right: '',
					bottom: ''
				});
			}, 10);
		});
		hideAddressBar();
	}