function(data, textStatus, jqXHR) {
									if(data == null) return null; // Give up
									var article = new Article();
									article.load(data);
									articles.push(article);
									callback(article);
								}