function obj_sort_func(obj, network_flag)
	{
		var i = 0;
		var j = 0;
		var cent = 0;
		var count = 1;
		sort_obj = new Array();
		for (i = 50, j = 0; i >= 1 && j < 100; i--)
		{
			for (uid in obj)
			{
				if (network_flag)
				{
					cent = obj[uid]["avg"];
					count = obj[uid]["count"];
				}
				else
				{
					cent = obj[uid];
					if (i %10){continue;}
				}
				if (cent*10 != i || j >= 100){continue;}

				sort_obj[j] = new Array();
				sort_obj[j]['uid'] = uid;
				sort_obj[j]['cent'] = cent;
				sort_obj[j]['count'] = count;
				j++;
			}
		}
	}