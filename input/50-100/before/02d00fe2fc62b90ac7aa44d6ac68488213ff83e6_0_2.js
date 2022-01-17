function loadTreemap (fxcopData, filename) {
		var treemapData = treemapDataBuilder(fxcopData, filename);
		selection.treemap = d3.select('.treemap').data([treemapData]);
		treemap.depth(dataBuilder.getDepth(selection.treemap));
	}