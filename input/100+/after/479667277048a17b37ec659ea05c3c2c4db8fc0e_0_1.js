function getStackSums(_data)
		{
			var data_len = _data.length;
			var sums = {};
			if(data_len > 0)
			{
				//caculate summary
				for(var i=0;i<data_len;i++)
				{
					var num = _data[i].data.length;
					for(var j=0;j<num;j++)
					{
						var value = 0;
						if(_data[i].data[j][1] != null)
						{
							value = _data[i].data[j][1];
						}
						if(sums[_data[i].data[j][0]+""])
						{
							sums[_data[i].data[j][0]+""] += value;
						}
						else
						{
							sums[_data[i].data[j][0]+""] = value;
						}
						 
					}
				}
			}
			return sums;
		}