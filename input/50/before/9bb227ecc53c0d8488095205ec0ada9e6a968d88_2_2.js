function(){
								$("#expense-type-select").append($('<option>', { value : this.id })
								          .text(this.name));
								parent.descriptions[this.id] = this.description;
							}