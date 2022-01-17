function finishExperiment()
		{
			var all_data = [];
			for(var i=0;i<exp_blocks.length;i++)
			{
				all_data[i] = exp_blocks[i].data;
			}
			
			opts["finish"].apply((new Object()), [all_data]); 
		}