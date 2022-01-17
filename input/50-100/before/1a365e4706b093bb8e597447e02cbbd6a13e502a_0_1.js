function(data, textStatus, jqXHR) {
									if(data == null || data.length == 0) return null; // Give up
									var article = new Article();
									article.load(data[0]);
									articles.push(article);
									callback(article);
								}