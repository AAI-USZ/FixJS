function() {
	// remove old selector parent group if it existed
	if (this.selectorParentGroup && this.selectorParentGroup.parentNode) {
		this.selectorParentGroup.parentNode.removeChild(this.selectorParentGroup);
	}

	// create parent selector group and add it to svgroot
	this.selectorParentGroup = svgFactory_.createSVGElement({
		'element': 'g',
		'attr': {'id': 'selectorParentGroup'}
	});
	this.selectorGripsGroup = svgFactory_.createSVGElement({
		'element': 'g',
		'attr': {'display': 'none'}
	});
	this.selectorParentGroup.appendChild(this.selectorGripsGroup);
	svgFactory_.svgRoot().appendChild(this.selectorParentGroup);

	this.selectorMap = {};
	this.selectors = [];
	this.rubberBandBox = null;

  for (var dir in this.rotateGrips) {
	  var grip = svgFactory_.createSVGElement({
  			'element': 'circle',
  			'attr': {
  				'id': 'selectorGrip_rotate_' + dir,
  				'fill': 'transparent',
  				'r': 8,
  				'stroke': 'transparent',
  				'stroke-width': 0,
  				'style': 'cursor:url(' + config_.imgPath + 'rotate.png) 12 12, auto;'
  			}
  	})
  $.data(grip, 'dir', dir);
	$.data(grip, 'type', 'rotate');
	this.rotateGrips[dir] = this.selectorGripsGroup.appendChild(grip);
	}

	// add the corner grips
	for (var dir in this.selectorGrips) {
		var grip = svgFactory_.createSVGElement({
			'element': 'rect',
			'attr': {
				'id': ('selectorGrip_resize_' + dir),
				'width': 7,
  			'height': 7,
  			'fill': "#4F80FF",
  			'stroke': "transparent",
  			'stroke-width': 2,
				'style': ('cursor:' + dir + '-resize'),
				'pointer-events': 'all'
			}
		});
		
		$.data(grip, 'dir', dir);
		$.data(grip, 'type', 'resize');
		this.selectorGrips[dir] = this.selectorGripsGroup.appendChild(grip);
	}

	if($('#canvasBackground').length) return;

	var dims = config_.dimensions;
	var canvasbg = svgFactory_.createSVGElement({
		'element': 'svg',
		'attr': {
			'id': 'canvasBackground',
			'width': dims[0],
			'height': dims[1],
			'x': 0,
			'y': 0,
			'overflow': (svgedit.browser.isWebkit() ? 'none' : 'visible'), // Chrome 7 has a problem with this when zooming out
			'style': 'pointer-events:none'
		}
	});

	var rect = svgFactory_.createSVGElement({
		'element': 'rect',
		'attr': {
			'width': '100%',
			'height': '100%',
			'x': 0,
			'y': 0,
			'stroke-width': 1,
			'stroke': '#000',
			'fill': '#FFF',
			'style': 'pointer-events:none'
		}
	});

	// Both Firefox and WebKit are too slow with this filter region (especially at higher
	// zoom levels) and Opera has at least one bug
//	if (!svgedit.browser.isOpera()) rect.setAttribute('filter', 'url(#canvashadow)');
	canvasbg.appendChild(rect);
	svgFactory_.svgRoot().insertBefore(canvasbg, svgFactory_.svgContent());
}