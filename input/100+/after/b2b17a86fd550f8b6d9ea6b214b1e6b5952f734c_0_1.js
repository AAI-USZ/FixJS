function(conditionName)
{
	
	switch(this.listenerType)
	{
		case Listener.listenerType.SIMPLE:
			if (this.__verifyAssessmentStatements())
				this.__executeActions();
			break;
			
		case Listener.listenerType.AND:
			if((new Date().valueOf() - this.last.valueOf()) > this.presentation.TIME_LIMIT)
			{
				//Reseta todas as flags
				for(var index in this.flagMap)
					this.flagMap[index].flag = false;
				//Seta a flag do evento recebido
				this.flagMap[conditionName].flag = true;
				this.last = new Date();
			}
			else
			{				
				//Seta a flag do evento recebido
				this.flagMap[conditionName].flag = true;
				var tempFlag = true;
				
				//Verifica se todas as flags estao setadas
				for (var index in this.flagMap)
				{
					if( ! (this.flagMap[index].flag))
					{
						tempFlag=false;
						break;
					}
				}
				//caso estejam, executa a acao
				if(tempFlag) 
				{
					//Limpa todas as flags
					for(var index in this.flagMap)
						this.flagMap[index].flag = false;
					this.last = 0;
					if (this.__verifyAssessmentStatements())
					   this.__executeActions();
				}
			}
			break;
		
		case NclPlayer.listenerType.OR:
			if((new Date().valueOf() - this.last.valueOf()) > this.presentation.TIME_LIMIT)
			{
				this.last = new Date();
				this.__executeActions();
			}	
			break;
	}
	

}