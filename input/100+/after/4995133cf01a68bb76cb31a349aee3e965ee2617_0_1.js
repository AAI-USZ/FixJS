function (data, Num) { //填充图像颜色,硬盘数据对象，对应的dom元素，硬盘数据对象的索引号
		var Class,
		percent,percentExtened,
		typeName,boolExtened = 0,
		html_primary = [],
		html_extened = [];
		var diskSumNum = data.range['end'];
		var diskExtenedSum = data.extened_range_sum;
		percentExtened = this.getPercent(diskSumNum, diskExtenedSum) -1;
		
			for (var k = 0; k < data.parts.length; k++) {
				switch (data.parts[k].type) {
				case 'extened': //逻辑分区
				if(boolExtened ==0){
					boolExtened = 1;
					html_extened.push('<div class="box02_1 green w500" style="width:' + percentExtened + '%">');
				}
					for (var i = 0; i < data.parts[k].parts.length; i++) {
						switch (data.parts[k].parts[i].type) {
						case "logical": //逻辑分区
							Class = "yellow j_diskPart";
							break;
						case "empty":
							Class = "block j_diskSpace";
							break;
						default:
							break;
						}
						console.log(data.parts[k].parts[i].range['end']);
						percent = this.getPercent(diskExtenedSum, data.parts[k].parts[i].range['end'] - data.parts[k].parts[i].range['start'] + 1);
						percent = percent - 1; //少1像素的区域留给边框
						typeName = data.parts[k].parts[i].type_name;
						html_extened.push('<div class="box02_1 w150 h30 box02_2 ' + Class + '"style="width:' + percent + '%"dataindex="resultData['+Num+'].parts[' + k + '].parts[' + i + ']" boolClick="1">');
						html_extened.push(typeName + data.parts[k].parts[i].num + '</div>');
					}
					break;
				case 'primary': // 主分区
					percent = this.getPercent(diskSumNum, data.parts[k].range['end'] - data.parts[k].range['start'] + 1);
					percent = percent - 1;
					html_primary.push('<div class="box02_1 red j_diskPart" style="width:' + percent + '%"dataindex =resultData['+Num+'].parts[' + k + '] boolClick="1">' + data.parts[k].type_name + data.parts[k].num + '</div>');
					break;
				default:
					break;
				}
			}
				html_extened.push("</div>");
				return html_primary.join('') + html_extened.join('');
			}