function(err, data) {
				if(err) {
					fn.handle_error('Error reading article.  Err: ' + err);
				}

				// Extract the header
				var parts = data.split('\n\n');
				var header = JSON.parse(parts[0]);
				parts.splice(0,1);
				var body = marked(parts.join('\n\n'));

				console.log('Read articles with headers: ');
				console.log(header);

				// Check mandatory fields
				if(!header.title) {
					fn.handle_error('Articles must have a title');
					cb(false);
					return;
				}

				if(!header.date) {
					fn.handle_error('Articles must have a date');
					cb(false);
					return;
				}

				// Extract date
				var date = new Date(header.date),
					year = date.getFullYear(),
					month = date.getMonth() + 1; // Month is + 1 as starts at 0

				// If month < 10 prepend a 0
				if(month < 10) {
					month = ['0', month].join('');
				}

				articles.push({
					'title'    : header.title,
					'author'   : header.author || options.author,
					'date'     : date,
					'date_str' : Glog.formatDate(date),
					'year'     : year,
					'month'    : month,
					'body'     : body,
					'url'      : [year, month, (header.url || header.title.replace(/\s/g, '-'))].join('/')
				});

				// If that was the last article then trigger the callback
				if(files.length === articles.length) {
                    // Apply plugins
                    fn.articlePlugins[0] = function(wcb) {
                        wcb(null, articles);
                    };
                    fn.articlePlugins[fn.articlePlugins.length] = function(res) {
                        console.log('CALLING');
                        cb(res.reverse());
                    };

                    async.waterfall(fn.articlePlugins);
				}

			}