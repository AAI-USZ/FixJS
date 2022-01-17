function(){
			var data = Y.ProjectCalendar.data,
				dates = YObject.keys(data),
				markUp = [],
				dateRow = [],
				monthRow = [],
				tasks = this.get('model').get('tasks'),
				prevMonth,
				month,
				datesInMonth;
		
			dates.sort();
		
			markUp.push('<table>');
			monthRow.push('<tr><th>&nbsp;</th>');
			dateRow.push('<tr><th>&nbsp;</th>');
			YArray.each(dates, function(d){
				var day;
				month = d.substring(4, 6);
				day = d.substring(6);
				if (prevMonth !== month){
					if (prevMonth){
						monthRow.push(datesInMonth);
						monthRow.push('">');
						monthRow.push(prevMonth);
						monthRow.push('</th>');
					}
					prevMonth = month;
					monthRow.push('<th colspan="');
					datesInMonth = 0;
				}
				dateRow.push('<th>');
				dateRow.push(day);
				dateRow.push('</th>');
				datesInMonth++;
			});
			
			if (datesInMonth){
				monthRow.push(datesInMonth);
						monthRow.push('">');
						monthRow.push(prevMonth);
						monthRow.push('</th>');
			}
			
			dateRow.push('</tr>');
			monthRow.push('</tr>');
			
			markUp.push(monthRow.join(''));
			markUp.push(dateRow.join(''));
			
			tasks.each(function(task){
				var taskId = task.get('clientId');
				
				markUp.push('<tr><td>');
				markUp.push(task.get('name'));
				markUp.push('</td>');
				
				YArray.each(dates, function(d){
					
					var work = data[d][taskId];
					if (work){
						markUp.push('<td style="background:#00FFFF; border-left:1px solid #CBCBCB">');
						markUp.push(work);
					} else {
						markUp.push('<td style="border-left:1px solid #CBCBCB">');
					}
					markUp.push('</td>');
				});
				markUp.push('</tr>')
			});
			
			markUp.push('</table>');
			
			this.get('container').append(markUp.join(''));
		}