function trace(arr,seq) {
				var log = {
					match : 0,
					mismatch : 0,
					open : 0,
					extend : 0
				};
				
				for(var i=0;i<arr.length;i++) {
					if (arr[i] == "x") {
						if (seq[i] != "x") {
							if (i != 0 && arr[i-1] == "x" && seq[i-1] == "x") {
								log.extend++;
							}
							else {
								log.open++;
							}
						}
							
					}
					else if (seq[i] == "x") {
						if (i != 0 && (seq[i-1] == "x" && arr[i-1] != "x")) {
							log.extend++;
						}
						else {
							log.open++;
						}
					}
					else if (seq[i] == arr[i] || seq[i] == arr[i]) {
						log.match++;
					}
					else {
						log.mismatch++;
					}
				}
				return log;
			}