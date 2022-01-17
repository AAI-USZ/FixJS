function(n)
		{
			$('#edit-avail .heading').text('Our '+capitalize(n));
			for (var i = ORG_DATA.inv.length - 1; i >= 0; i--){
				if (n == ORG_DATA.inv[i]['name']) {
					category = ORG_DATA.inv[i]; break;
				}
			};
			$('#edit-avail .services').empty();
			for (var i = category.fields.length - 1; i >= 0; i--){
				var f = category.fields[i];
				var s = "<div id='"+f.name+"'class='service' style='display:none'>";
					s+= "<div class='text'>"+capitalize(f.name)+"</div>";
					s+= "<div class='avail'>"+f.avail+' / '+f.total+"</div>";
					s+= "<hr>";
					s+= "<div class='icon'><img src='/img/icons/"+n+".png' name='"+n+"' title='"+n+"'/></div>";
					s+= "<div class='icon-del'><i class='icon-minus-sign'></i></div>";
					s+= "<div class='icon-add'><i class='icon-plus-sign'></i></div>";
					s+= "<div class='del' name='"+f.name+"'></div>";
					s+= "<div class='add' name='"+f.name+"'></div></div>";
				$('#edit-avail .services').append(s);
			};
			$('#edit-avail .services .service').each(function(n, o){ $(this).delay(n*100).fadeIn(200); })
			$("#edit-avail .del, .add").hover(onEditAvailOver, onEditAvailOut);
			$("#edit-avail .del, .add").click(onAvailInventoryChange);
			$('#edit-avail').show();
		}