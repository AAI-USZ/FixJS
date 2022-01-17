function Listener(listenerType, actionOperator, actionMap, flagMap, assessmentStatements, presentation)
{
	this.listenerType = listenerType;
	this.actionOperator = actionOperator;
	this.actionMap = actionMap;
	this.flagMap = flagMap;
	this.assessmentStatements = assessmentStatements;
	this.last = new Date();
	this.triggerBuffer = undefined;
	
	/*
	 * actionNamesArray
	 *     Array gerado com os nomes das acoes no actionMap. Sua utilizacao eh 
	 * necessaria para possibilitar encadeamento sequencial de acoes diferentes
	 * relacionadas a uma mesma condicao.
	 */
	this.actionNamesArray = new Array();
	for(actionName in actionMap)
	{
	    this.actionNamesArray.push(actionName)
	}
}