function(d){
					if (e.ctrlKey && d.selected == true)
                                        {
                                                selList.push(d.baseID)
                                                return highlightFillColor;
                                        }
					if (d.selected){
						selList.push(d.baseID)
						return highlightFillColor;
					}else
						return 'steelblue';
				}