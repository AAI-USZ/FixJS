function()
		{


			var html =
			
			'<div class="modal" id="sequence-modal">'+
				'<div class="modal-header">'+
					'<button class="close">×</button>'+
				'</div>'+
				'<div class="modal-body">'+
					'<h3>Continue this layer to</h3>'+
					
					'<label class="checkbox"><input id="continue-next-frame" type="checkbox" value="next_frame"> next frame</label>'+
					'<label class="checkbox"><input id="continue-sequence" type="checkbox" value="sequence"> this sequence</label>'+
					
					'<div id="linked-frames-selector">linked frames</br>'+
					
					'<ul class="layer-list-checkboxes unstyled"></ul></div>'+
				'</div>'+
				'<div class="modal-footer">'+
					'<a href="#" class="btn close" >Cancel</a>'+
					'<a href="#" class="btn btn-success pull-right save">OK</a>'+
				'</div>'+
			'</div>';
			
			return html
		}