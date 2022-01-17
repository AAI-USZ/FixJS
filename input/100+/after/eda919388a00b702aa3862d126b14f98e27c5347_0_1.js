function(start){
		var self = this;
        var len = this.rowlength;
		var end = start + this.rowlength;

		var s = this.seq.substr(start, len);
		
		var seq = "";
		var label = "";
		for(var i = 0; i < this.rowlength; i = i + 5)
		{
			seq = seq + s.substr(i, 5) + " ";
			var left= '';
			for(var j = 0; j < toPadded(i); j = j+1)
				left = left + ' ';
			label = label + '<div class="seq-label unselectable" unselectable="on" style="left:0;">' 
				+ left + '<span class="seq-label-text">' + (start + i) + '</span></div>';
		}
		var cseq = this._complement(seq);
		
		var fwd_feats = "";
		var rev_feats = "";
		for(f in this.features)
		{
			var feat_html = make_feat_html(start, start + this.rowlength, this.features[f], f);

			if(this.features[f].strand > 0) fwd_feats = fwd_feats + feat_html;
			else rev_feats = rev_feats + feat_html;
			
		}
		
		
		var $row = $(document.createElement('div'))
			.attr('unselectable', 'on')
			.addClass('row unselectable')
			.html(	'<div class="ladder unselectable" unselectable="on"></div>' +
					'<div id="' + start + '-fwd-feat" class="feat-ref feat unselectable" unselectable="on">' + fwd_feats + '</div>' +
					'<div class="sequenceStrands" id="' + start + '-seq-strands" style="position:relative;">'  +
					'	<div id="' + start + '-fwd" class="seq-fwd seq unselectable" unselectable="on">' + seq + '</div>' +
					'	<div id="' + start + '-label" class="label-div unselectable" unselectable="on">' + label + '</div>' +
					'	<div id="' + start + '-rev" class="seq-rev seq unselectable" unselectable="on">' + cseq + '</div>' +
					'</div>' +
					'<div id="' + start + '-rev-feat" class="feat-rev feat unselectable" unselectable="on">' + rev_feats + '</div>' +
					'<div class="ladder unselectable" unselectable="on"></div>'
			);
		
		$row.find('.sequenceStrands')
			.mousedown	(function(event) {self._on_mouse_down(event);})
			.mouseup 	(function(event) {self._on_mouse_up	 (event);})
			.mousemove	(function(event) {self._on_mouse_move(event);});
		
		this.$seq.append($row);
		
		this.seq_disp.push($row.find('.seq-fwd'));
		this.seq_text.push(seq);
	
		return len;
	}