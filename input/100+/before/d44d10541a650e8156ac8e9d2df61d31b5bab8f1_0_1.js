function(a,b,c){
				var id, cls, w, cap, div_cls, img, trim = tinymce.trim;

				id = b.match(/id=['"]([^'"]*)['"] ?/);
				b = b.replace(id[0], '');

				cls = b.match(/align=['"]([^'"]*)['"] ?/);
				b = b.replace(cls[0], '');

				w = b.match(/width=['"]([0-9]*)['"] ?/);
				b = b.replace(w[0], '');

				c = trim(c);
				img = c.match(/((?:<a [^>]+>)?<img [^>]+>(?:<\/a>)?)([\s\S]*)/i);

				if ( img && img[2] ) {
					cap = trim( img[2] );
					img = trim( img[1] );
				} else {
					// old captions shortcode style
					cap = trim(b).replace(/caption=['"]/, '').replace(/['"]$/, '');
					img = c;
				}

				id = ( id && id[1] ) ? id[1] : '';
				cls = ( cls && cls[1] ) ? cls[1] : 'alignnone';
				w = ( w && w[1] ) ? w[1] : '';

				if ( !w || !cap )
					return c;

				div_cls = 'mceTemp';
				if ( cls == 'aligncenter' )
					div_cls += ' mceIEcenter';

				return '<div class="'+div_cls+'"><dl id="'+id+'" class="wp-caption '+cls+'" style="width: '+( 10 + parseInt(w) )+
				'px"><dt class="wp-caption-dt">'+img+'</dt><dd class="wp-caption-dd">'+cap+'</dd></dl></div>';
			}