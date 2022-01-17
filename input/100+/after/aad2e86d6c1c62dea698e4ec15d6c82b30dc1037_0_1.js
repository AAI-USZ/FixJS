function (data) {
		i = data.indexOf('<td width="90px">Date</td>');
		for (i = data.indexOf('<table', i); i != -1; i = data.indexOf('<table', i+1))
			data = data.slice(0,i)+data.slice(data.indexOf('</table>',i)+8);
		i = data.indexOf('<td width="90px">Date</td>');
		for (i = data.indexOf('<tr id', i); i != -1; i = data.indexOf('<tr id', i))
		{
			i = data.indexOf('<td>', i) + 4;
			j = data.indexOf('<', i);
			bkdat.depDates.push(data.slice(i, j));
			i = data.indexOf('<td>', i) + 4;
			j = data.indexOf('<', i);
			bkdat.depTimes.push(data.slice(i, j));
			i = data.indexOf('<td class="segTravel">', i) + 22;
			j = data.indexOf('<', i);
			bkdat.depTypes.push(data.slice(i, j));
			i = data.indexOf('<td>', i) + 4;
			j = data.indexOf('</td>', i);
			bkdat.depDescs.push(data.slice(i, j));
		}
		i = data.indexOf('<td><b>Tour</b></td>')+24;
		j = data.indexOf('<', i);
		bkdat.tour = data.slice(i, j);
		$.get('/render.php?page=booking_bkBasic', function (data) {
			i = data.indexOf('Booking Administration');
			if (i != -1){bkdat.flaw = '<b style="color:red">unexpected redirection from server</b>';Fn(bkdat);Go(++idid);return}
			i = data.indexOf('id="bkTypeDirect"');
			var J = data.indexOf('checked', i);
			if (J == -1 || J > data.indexOf('>', i))
				i = data.indexOf('id="ar2"', i);
			else i = data.indexOf('id="cr2"', i);
			i = data.indexOf('value', i)+7;
			j = data.indexOf('"', i+1);
			bkdat.ref = data.slice(i, j);
			// -------- Lead Pax -------- //
			i = data.indexOf('<td><a href="#" onclick="passengerPopup');
			var worked = (i != -1);
			if (worked) {
				i = data.indexOf(',', i)+1;i = data.indexOf(',', i)+1;i = data.indexOf(',', i)+2;
				j = data.indexOf('"', i)-2;
				var url = "/render.php?page=booking_p-bkPaxEntry&mode=e&bookingID=" + bkdat.id + "&tourID=" + bkdat.tour +
				"&bookingPaxID=" + data.slice(i, j) + "&depDateID=" + bkdat.depDates[0];
				i = data.indexOf('<div id="bkPaxBlock"');
				var endtab = data.indexOf('</table>', i);
				bkdat.paxes = [];
				i = data.indexOf('<tr>', i+1);
				while (i < endtab && i > 0)
				{
					i = data.indexOf('<td>', i)+4;
					j = data.indexOf('<', i);
					bkdat.paxes.push(data.slice(i, j));
					i = data.indexOf('<tr>', i+1);
				}
			}
			$.get(url, function(data, textStatus) {
				if (worked) {
					i = data.indexOf('name="bkpaxSurname"');
					i = data.indexOf('value', i) + 7;
					bkdat.leadP = data.slice(i, data.indexOf('"', i)) + '/';
					i = data.indexOf('name="bkpaxForename"');
					i = data.indexOf('value', i) + 7;
					bkdat.leadP += data[i] + '/';
					i = data.indexOf('name="bkpaxTitle"');
					i = data.indexOf('selected="selected"', i)+20;
					bkdat.leadP += data.slice(i, data.indexOf('<', i));
				}
				F();
			});
		});
		$.get('/render.php?page=booking_bkSales', function (data) {
			var i = data.indexOf('<table width="100%" class'), j, end = data.indexOf('</table>', i);
			bkdat.sales = [];
			for(i = data.indexOf('<tr>', i); i != -1 && i < end; i = data.indexOf('<tr>', i)) {
				var tmp = [];
				i = data.indexOf('>', data.indexOf('<td',i))+1;
				j = data.indexOf('<', i);
				tmp.push(data.slice(i, j));
				i = data.indexOf('>', data.indexOf('<td',i))+1;
				j = data.indexOf('<', i);
				tmp.push(data.slice(i, j));
				tmp.push(' ');
				i = data.indexOf('>', data.indexOf('<td',i))+1;
				j = data.indexOf('<', i);
				tmp.push(data.slice(i, j));
				tmp.push(' ');
				i = data.indexOf('>', data.indexOf('<td',i))+1;
				j = data.indexOf('<', i);
				tmp.push('£'+data.slice(i, j));
				i = data.indexOf('>', data.indexOf('<td',i))+1;
				j = data.indexOf('<', i);
				tmp.push('£'+data.slice(i, j));
				if (parseInt(tmp[6]) !== 0) bkdat.sales.push(tmp);
			}
			j = data.indexOf('</balanceDueDate>');
			i = j-10;
			bkdat.issueDate = data.slice(i, j);
			i = data.indexOf('Total Booking Value:');
			i = data.indexOf('<td', i);
			i = data.indexOf('>', i)+1;
			j = data.indexOf('<', i);
			bkdat.total = '£'+data.slice(i, j);
			i = data.indexOf('Balance Due:', i);
			i = data.indexOf('<td>', i)+4;
			j = data.indexOf('<', i);
			bkdat.owed = '£'+$.trim(data.slice(i,j));
			F();
		});
		$.get('/render.php?page=booking_bkPayments', function(data) {
			var i = data.indexOf('<div class="displayBlock"'), end = data.indexOf('</table>',i);
			bkdat.receipts = [];
			i = data.indexOf('<tr>',i)+4;
			if(data.indexOf('<i>No Payments</i>') > -1)
			{
				bkdat.receipts = [];
				return F();
			}
			for (; i > 3 && i < end; i = data.indexOf('<tr>',i)+4)
			{
				var local = [];
				i += 17;
				var j = data.indexOf('<',i);
				local.push(data.slice(i,j));
				local.push('Received:');
				i = data.indexOf('<td align="right">', i)+18;
				j = data.indexOf('<',i);
				local.push('£'+data.slice(i,j));
				bkdat.receipts.push(local);
			}
			F();
		});
		for (i = data.indexOf('Your Ref:')+11; i != -1+11; i = data.indexOf('Your Ref:', i)+11)
		{
			j = data.indexOf('(', i)-1;
			bkdat.myrefs.push(data.slice(i, j));
		}
		i = data.indexOf('<td><b>Lead:</b></td>')+25;
		j = data.indexOf('<', i);
		bkdat.lead = data.slice(i, j);
		F();
	}