function antiSquish (init) {
			/* http://musicbrainz.org/artist/{mbid} does not set a width for the title or checkbox columns.
			   This prevents those columns getting squished when the table-layout is set to fixed layout. */
			$.log('AntiSquishing...', 1);

			var rules = [];

			void 0 !== init && $('.CAAantiSquish').remove();
			$('th.pos').remove();
			for (var $th = $(document.getElementsByTagName('th')), i = 0, len = $th.length; i < len; i++) {
				rules.push(
					[ 'thead > tr > th:nth-child(', (i + 1), ')'
					, '{ width:', ($th.quickWidth(i) + 10), 'px!important;}'
					].join('')
				);
			}
			$.addRule(rules.join(''), '', { 'class': 'CAAantiSquish' });
		}