function(data, status, xhr)
					{
						var res = JSON.parse(data);
						if(res.valid)
						{
							$(fld)
								.removeClass('ecplus-checking')
								.addClass('ecplus-valid');
							$('#' + ctx.id).val(res.key);

							var cc = $(fld).attr('childcontrol');
							if(cc)
							{
								console.debug(cc);
								var jqc = $('#' + cc + '-ac');
								var src = jqc.autocomplete('option', 'source');
								if(src.indexOf('?') > 0) src = src.substr(0, src.indexOf('?'));
								console.debug(src);
								src += '?secondary_field=' + ctx.id + '&secondary_value=' + res.key;
								var src = jqc.autocomplete('option', 'source', src);								
							}
							
						}
						else
						{
							$(fld)
								.removeClass('ecplus-checking')
								.addClass('ecplus-invalid');
							msgs.push(res.msg)
							$('#' + this.id).val('');
						}
					}