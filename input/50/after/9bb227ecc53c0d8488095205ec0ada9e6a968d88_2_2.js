function(){
								$("#expense-type-select").append($('<option>', { value : this.id })
								          .text(this.displayedName));
								parent.descriptions[this.id] = this.description;
							}