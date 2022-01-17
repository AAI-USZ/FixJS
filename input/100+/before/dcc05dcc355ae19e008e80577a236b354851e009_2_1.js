function(){	
					if(this.date == mon.getFullYear() 
									+ "-" 
									+ (function(){var aux = mon.getMonth()+1;
										if(aux < 10)
											return "0"+aux
										else
											return aux}()) 
									+ "-" + dow.substr(-2))
					{
						if(this.periodo == "tar"){
							tarde = true;
						}else if (this.periodo == "ma"){
							manana = true;
						}
						cls = "holiday";
						msg = this.title;
					}
				}