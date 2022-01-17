function(key, doc) {
						
						if (key < ands.ands_search_record_limit)
						{ 
							widget_results.append("<li><a href='" 
									+ ands.ands_search_portal_url 
									+ "view/?key=" + encodeURIComponent(doc['key'])
									+ "'>" + doc['listTitle'] + "</a></li>");
						}
						
					}