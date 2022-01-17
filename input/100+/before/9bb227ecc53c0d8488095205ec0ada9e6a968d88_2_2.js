function(data){
					if (data !=null){
						if(data.expenseTypeDTO.length > 1){
							$.each(data.expenseTypeDTO, function(){
								$("#expense-type-select").append($('<option>', { value : this.id })
								          .text(this.name));
								parent.descriptions[this.id] = this.description;
							});
							var text = parent.descriptions[$("#expense-type-select option:selected").val()];
							if(text != null){
								$("#type-description").html(text);
							}
							else{
								$("#type-description").html($("#no-description-template").text());
							}
						}
						else{
							$("#expense-type-select").append($('<option>', { value : data.expenseTypeDTO.id })
							          .text(data.expenseTypeDTO.name));
							parent.descriptions[data.expenseTypeDTO.id] = data.expenseTypeDTO.description;
							if(data.expenseTypeDTO.description != ""){
								$("#type-description").html(data.expenseTypeDTO.description);
							}
							else{
								$("#type-description").html($("#no-description-template").text());
							}
						}
					}
				}