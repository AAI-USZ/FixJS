function(data){
					$('#expense-comment').removeAttr("disabled");
					var p = $('<div>');
					var select = $('<select>', {id: 'expense-type-select-update'});
					select.append($('<option>', { value : 0 })
				          .text(parent.vtypename + " (" + $("#actual-template").text() +")"));
					select.append($("<optgroup>").attr("label", $("#available-type-template").text()));
					if (data != null){
						if(data.expenseTypeDTO.length > 1){
							$.each(data.expenseTypeDTO, function(){
								select.append($('<option>', { value : this.id })
								          .text(this.displayedName));
							});
						}
						else{
							select.append($('<option>', { value : data.expenseTypeDTO.id })
							          .text(data.expenseTypeDTO.displayedName));
						}
					}
					select.append($("</optgroup>"));
					p.append(select);
					var html = '<td><input class="kernely_input" type="text" name="amount-update" id="expense-amount-update" value="'+parent.vamount+'"/></td><td>'+ p.html() +'</td><td class="text-center"><img class="update" src="/images/icons/update_icon.png"/></td><td></td>';
					$("#expense-comment").val(parent.vcomment);
			        $(parent.el).html(html);
				}