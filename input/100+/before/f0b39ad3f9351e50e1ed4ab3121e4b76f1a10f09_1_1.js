function(tx, results) {
				var data = new Array(); // sid,cid,time,cat1,cat2,comment
				data[0] = sessionData[0];

				if (results.rows.length == 0)
					data[1] = 0;
				else
					data[1] = results.rows.item(0).commentID + 1;

				data[2] = '"'+getTimestamp()+'"';
				
				var btn1 = $('#control .ui-btn-down-b').attr('id').substring(3);
				var btn2 = $('#control'+btn1+' .ui-btn-down-b').attr('id').split('-')[1];
				data[3] = '"'+btn1+'"';
				data[4] = '"'+btn2+'"';
				data[5] = '"'+$('#text').val()+'"';
				insertData('comment', data);
				
				var tags = $.makeArray($('#control'+btn1+'-'+btn2+' .ui-btn-down-b'));
				for (var i = 0; i < tags.length; i++) {
					insertData('tag', [sessionData[0], data[1], '"'+tags[i].text+'"']);
				}
				// add stuff to the DB
				resetEntries();
			}