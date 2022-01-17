function()
		{
			var mergeEnv = function(env)
			{
				if(!env)
				{
					return;
				}
			
				for(var key in env)
				{
					Attacklab.wmd_env[key] = env[key];
				}
			};
			
			mergeEnv(Attacklab.wmd_defaults);
			mergeEnv(Attacklab.account_options);
			mergeEnv(top["wmd_options"]);
			Attacklab.full = true;
			
			var defaultButtons = "bold italic link blockquote code image ol ul heading hr";
			Attacklab.wmd_env.buttons = Attacklab.wmd_env.buttons || defaultButtons;
		}