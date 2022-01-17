function($this){
			if (($this.val() == '' || $this.attr('xmultiple')) || $this.find('option').length == 0){
				if ($this.is('select') && $this.find('option').length == 0){
					$this.hide();
				}
				if ($this.is('input, select')) $this.next('.btn_field').hide();
			} else {
				$this.next('.btn_field').show();
			}	
		}