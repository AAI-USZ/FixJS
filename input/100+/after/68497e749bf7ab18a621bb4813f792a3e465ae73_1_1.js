function (absHref, tr) {

			var $tds = $(tr).find('td'),
				$a = $tds.eq(1).find('a'),
				label = $a.text(),
				time = format.parseDate($tds.eq(2).text(), 'DD-MMM-YYYY HH:mm'),
				size = format.parseSize($tds.eq(3).text());

			absHref = absHref + $a.attr('href').replace(/'/g, '%27').replace(/\+/g, '%2B').replace(/\=/g, '%3D');

			return label === 'Parent Directory' ? null : Entry.get(absHref, time, size);
		}