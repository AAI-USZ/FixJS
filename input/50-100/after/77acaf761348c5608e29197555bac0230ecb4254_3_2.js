function(d){
					if (e.ctrlKey && d.selected == true)
                                        {
                                                selList.push(d.baseID)
                                                return 'red';
                                        }
					if (d.selected){
						selList.push(d.baseID)
						return 'red';
					}else
						return 'steelblue';
				}