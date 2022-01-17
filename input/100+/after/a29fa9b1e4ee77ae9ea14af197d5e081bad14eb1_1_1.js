function(command){
		/// Translates a parameter from ['v','var'] to get the value from where it is or ['t','hello'] to hello.
		var t = function(param){
			if (param[0]=='t'){ // basic replacements of ${vars}
				var mvars=param[1].match(/\${[^}]*}/g)
				var r=param[1]
				for(var v in mvars){
					v=mvars[v]
					r=r.replace(v,vars[v.substr(2,v.length-3)])
				}
				return r
			}
			else if (param[0]=='v' && (param[1] in vars))
				return vars[param[1]]
			else
				throw ({may_appear_later:false, text:'Unknown parameter for command: '+command[0]})
		}

		var cmd=commands[command[0]]
		if (!cmd)
			cmd=funcs[command[0]]
		if (!cmd){
			throw({may_appear_later:false, text:'Command not known: '+command[0]})
		}
		if (cmd.code){
			$(cmd.args).each(function(i){
				vars[this]=t(command[1][i])
			})
			//ctestui.log('rnu:'+ $.toJSON(cmd.code))
			ctest.loadCustomCode(cmd.code)
		}
		else{
			var ret
			//ctestui.log('Command: '+cmd)
			if (command[1].length==0)
				ret=cmd()
			else if (command[1].length==1)
				ret=cmd(t(command[1][0]))
			else if (command[1].length==2)
				ret=cmd(t(command[1][0]),t(command[1][1]))
			else if (command[1].length==3)
				ret=cmd(t(command[1][0]),t(command[1][1]),t(command[1][2]))
			else if (command[1].length==4)
				ret=cmd(t(command[1][0]),t(command[1][1]),t(command[1][2]),t(command[1][3]))
			else if (command[1].length==5)
				ret=cmd(t(command[1][0]),t(command[1][1]),t(command[1][2]),t(command[1][3]),t(command[1][4]))
			//ctestui.log('Ret! '+ret)
			return ret
		}	}
