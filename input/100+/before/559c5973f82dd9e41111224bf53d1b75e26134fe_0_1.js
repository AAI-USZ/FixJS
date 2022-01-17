function()
{
	var ports = this.node.port;
	var links = this.node.link;
	var handlers = this.handlers;
	
	/*
	  Faz o bind das portas
	 * */
	
	for (var i in ports)
	{
		var currentPort = ports[i];
		var interfaceDefined = currentPort['interface'] || undefined;

		if(currentPort.component._type == 'media' && interfaceDefined)
		{
			/*
			 	 TODO: encadear eventos de atribuicao quando a nodeInterface da media esta definida
				 attribution.onBeginAttribution
				 attribution.onEndAttribution
			 */
			console.warn("Eventos de atribuicao para propriedades referenciadas por portas nao foi implementado");
	
			
		} else {
			
			//Caso contrario (componente eh contexto) ou a nodeInterface nao esta definida
			var currentComponentElement  = "#"+this.presentation.getDivId(currentPort.component.id);
			var interfaceId = currentPort.id;
			
			for(var j in this.eventType)
			{
				var eventType = this.eventType[j];
				if(eventType != 'attribution')
				{
					var eventName = [eventType,j].join('.');
					
					/*
					  Ouve o evento instanciado pelo elemento
					  e lanca o mesmo evento soh que instanciado pelo contexto
					*/
					$(currentComponentElement).on(eventName, 
					{
						contextElement : this.htmlPlayer,
						interfaceId : interfaceId,
						eventName: eventName
						
					},
					function(e)
					{
                        var evento = $.Event(e.data.eventName);
                        evento.which = e.which;
						$(e.data.contextElement).trigger(evento,[e.data.interfaceId])
					
					});
							
						}
					}
			
		}
		
	}
	
	/*
	 Faz o bind dos links
	 * */
	for ( i in links)
	{
	
		//causalConnector
		var link = links[i];
	    var linkConnector = link.xconnector;
	    var actionMap = new Object();
	    var flagMap = new Object();
	    var lType = 0;
	    var aOperator= 'par';

		//Verifica os tipos de condicoes
		var conditions = linkConnector.simpleCondition;
		var assessmentsStatements = [];
		var connectorParam = new Object();
		var assessmentsMap = new Object();
		var assessmentsArray = new Array();

		

		/*
		   Cada parametro do link eh associado a um valor padrao vazio
		 * */			
		if(linkConnector.connectorParam)
		{
			for ( var i in linkConnector.connectorParam)
			{
				currentConnectorParam = linkConnector.connectorParam[i];
				//Inicializa o parametro do link vazio
				connectorParam['$'+currentConnectorParam.name] = '';
				//TODO: Verificar se o valor eh mesmo vazio
			}	
		}
		
		
		/*
		 
			assessmentsMap['role'] =
			{
				bindComponent: (Component)
				bindInterface: 	(Component nodeInterface)
				operator:  (eq, etc.. )
				value: ,
				variable: verdadeiro se o valor eh uma variavel
			}

		 */
		
		if (linkConnector.compoundCondition)
		{
			//Tipo do listener
			conditions = linkConnector.compoundCondition[0].simpleCondition;
			
			/*
			   Pode ocorrer de um compoundCondition conter apenas um simpleCondition
			(quando ele contem tambem um assessmentStatement). 
			*/
			if(conditions.length > 1)
				lType = Listener.listenerType[linkConnector.compoundCondition[0].operator.toUpperCase()];
			
			//Verifica se assessmentStatements (só ocorre no compoundCondition)
			//Para cada assessmentStatement
			for (var i in linkConnector.compoundCondition[0].assessmentStatement)
			{
				var currentAssessmentStatement =  linkConnector.compoundCondition[0].assessmentStatement[i];
				//Para cada attributeAssessment
				for (var j in currentAssessmentStatement.attributeAssessment)
				{
					var currentAttributeAssessment = currentAssessmentStatement.attributeAssessment[j];
					
					//Por enquanto aceitamos apenas eventos do tipo attribution
					if(currentAttributeAssessment.eventType == 'attribution')
						if (!currentAttributeAssessment.attributeType || currentAttributeAssessment.attributeType == 'nodeProperty')
						{
							assessmentsMap[currentAttributeAssessment.role] = {
								bindComponent: '',
								bindInterface: '',
								operator: currentAssessmentStatement.comparator,
								value: currentAssessmentStatement.valueAssessment.value,
								variable: ContextPlayer.isVariable(currentAssessmentStatement.valueAssessment.value)
								
							}
							
					} else {
						console.warn('Eventos de tipos diferentes de attribution nao foram implementados para elementos do tipo AttributeAssessment');
					}			
				}
			}
		}
		
		
		//Cria o assessmentsArray que eh passado para o listener
		for(var j in assessmentsMap)
			assessmentsArray.push(assessmentsMap[j]);
		
		
		
		//Inicializa o flagMap de acordo com a estrutura do conector
		for (var i in conditions)
		{

            var currentCondition = conditions[i];
			var conditionUseVariable = false;
			var conditionDefaultValue = '';
			var conditionUseKey = false;

			if (currentCondition.role == 'onSelection')
			{
				if(currentCondition.key)
				{
					if (ContextPlayer.isVariable(currentCondition.key))
					 	conditionUseVariable = true;
						
					conditionDefaultValue = currentCondition.key;
					conditionUseKey = true;
				}
			}

			flagMap[currentCondition.role] = {
				bindComponent: "",
				bindInterface: null,
				eventType: this.eventType[currentCondition.role],
				flag: false,
				keyUseVariable : conditionUseVariable,
				keyDefaultValue: conditionDefaultValue,
				useKey : conditionUseKey
				
			}

		}
		
		

        //obtem um array das acoes
	    var actions = linkConnector.simpleAction;
	    if(linkConnector.compoundAction)
	    {
	    	aOperator = linkConnector.compoundAction[0].operator.toLowerCase();
	    	actions = linkConnector.compoundAction[0].simpleAction; 
	    }

		//inicializa o actionMap de acordo com a estrutura do conector
	    for (var i in actions)
	    {

			currentAction = actions[i];
			
	    	// Se a acao eh de atribuicao entao possui um valor de envio
	    	if  (currentAction.role == 'set')
	    	{

		    	var actionUseVariable = false;
		    	var actionDefaultValue = '';
		    
		    	//verifica se o atributo value esta definido
		    	if(currentAction.value)
		    	{
		    	 //caso esteja definido e seja do tipo variavel

		    	 if (ContextPlayer.isVariable(currentAction.value))
				  	actionUseVariable = true;


					// O valor do actionDefaultValue eh dado pelo parametro
					// value da acao, mesmo que este seja o nome de um parametro linkParam
 				    actionDefaultValue = currentAction.value; 					
				}
				
				//o action map para eventos de atribuicao sao um pouco diferentes
				actionMap[currentAction.role]= {
		    		binds: new Array(),
		    		qualifier: actions[i].qualifier,
		    		actionUseVariable: actionUseVariable,
		    		actionDefaultValue: actionDefaultValue
	    		}

	    	} else {
	    		
	    		actionMap[currentAction.role]= {
	    		binds: new Array(),
	    		qualifier: actions[i].qualifier
	    		}
	    		
	    	}
	    	

	    	
				    	 
	    	
	    	 
	    }


		//Como o tipo de listener e o tipo de action (operator) ja estao definidos,posso criar o listener
		var listener = new Listener(lType,aOperator,actionMap,flagMap,assessmentsArray,this.presentation);
		/*
		 * Note que o flagMap e o actionMap ainda nao estao completos
		 * entranto, como o objeto listener referencia os objetos que 
		 * ele recebe no construtor estaremos modificando o interior
		 * do listener ao modificar as nossas variaveis locais
		 * actionMap e flagMap
		 */

        
        /*
            Todo o codigo abaixo eh de exclusividade do link
            O codigo acima eh o mesmo para conectores iguais
         * */
        
        /* Preenche o mapa de parametros 
		   com os valores globais (isto eh, os valores
		   	definidos pelos elementos linkParam)
		 * */
		if(link.linkParam)
		{
			for (var i in link.linkParam)
			{
				currentLinkParam = link.linkParam[i];
				connectorParam['$' + currentLinkParam.name] = currentLinkParam.value;
			}
		}
		
        
        //percorre todos os binds do link		
		for (var i in link.bind)
		{
			
			var currentBind = link.bind[i];
			
			var currentBindComponent = currentBind.component.id;
			var currentBindComponentSelector = "#"+this.presentation.getDivId(currentBindComponent);
			var currentInterface = currentBind['interface'];

			//Se o bind eh do tipo de acao
			if(actionMap[currentBind.role])
			{
			  var actionValue = null;
			  var currentAction = actionMap[currentBind.role];
			  
			  //verifica se a acao eh do tipo de atribuicao
			  if(currentBind.role == 'set')
			  {
			  	//Se esta acao utiliza parametro de link 
			  	if(currentAction.actionUseVariable)
			  	{
			  		//obtem as variveis locais do bind atual
			  		localParamMap = ContextPlayer.createLocalParamMap(currentBind.bindParam);
			  			
			  	    //obtem atraves das variaveis o valor do action value
			  	    actionValue = localParamMap[currentAction.actionDefaultValue] ? localParamMap[currentAction.actionDefaultValue] : connectorParam[currentAction.actionDefaultValue];
			  	} else
			  	    //caso nao use variavel entao possui um valor padrao
			  		actionValue = currentAction.actionDefaultValue;	
			  	
			  }
			  
				
			  currentAction.binds.push(
			  	{
			  		bindComponent: currentBindComponentSelector,
			  		bindInterface: currentInterface,
			  		value: actionValue
			  	}
			  	);
			  	
			  
			  
			//Se o bind for do tipo de condicao (attributeAssessment)
			} else if (flagMap[currentBind.role]){
			   var currentFlag = flagMap[currentBind.role];
			   //associa o component no flagMap do listener para este link				   			   
			   currentFlag.bindComponent = currentBindComponentSelector;
			   currentFlag.bindInterface = currentInterface;
			   
			   var hinterface = currentInterface ? 'i'+currentInterface: 'none'; 			   		
			   
			   

			   var componentDivId = currentBindComponentSelector;
			   var eventType = this.eventType[currentBind.role];
			   var eventName = currentBind.role;
			   var bindName = [eventType,eventName].join('.');
			   var handlerName =  [currentBindComponent,bindName].join('.');
			   
			   var triggerArrayName = bindName+'.triggerArray';
			   
			   //TODO: Melhorar sistema que trata 'key' do onSelection
			   //Se o key deste condition provem de uma variavel 
			   if(currentFlag.useKey)
			   {
			   	 var localParamMap = ContextPlayer.createLocalParamMap(currentBind.bindParam);
			   	 currentFlag.keyDefaultValue =  localParamMap[currentFlag.keyDefaultValue] || connectorParam[currentFlag.keyDefaultValue];	
				 var tempKey = currentFlag.keyDefaultValue
				 if ($.isNumeric(tempKey)) 
				 {
					 tempKey = 'KEY_' + tempKey;
				 }
			   	 if (tempKey in this.presentation.keys)
				 {
					currentFlag.keyDefaultValue = this.presentation.keys[tempKey];
				 }
				 
				 var port = 'undefined';
				 var triggerMedia = componentDivId;
				 
				 //Caso o componente seja um contexto e possua uma interface (uma porta para uma media)
				 //Deve-se usar a media para realizar o trigger da ação de teclas
				 //TODO: usei um loop para encontrar a porta, deve existir uma solução melhor
				 if (currentBind.component._type == "context" && currentInterface) {
				 	for (var i in currentBind.component.port) {
				 		currentPort = currentBind.component.port[i]
				 		portId = currentBind.component.port[i].id;
				 		if (portId == currentInterface) {
				 			port = currentPort;
				 			break;
				 		}
				 	}
				 	triggerMedia = "#"+this.presentation.getDivId(port.component.id);
				 }
				 
				 this.presentation.keyEvents[triggerMedia] = false;
			   }


			   //Caso um handler ainda nao foi criado para este link
			   if(!handlers[ handlerName ])
			   {
			     
			      // Cria o handler e salva essa informacao no handlers map
			      handlers[ handlerName ] = true;
			      
			      // Cria o buffer de triggers caso o mesmo nao exista
			      if(!$(componentDivId).data(triggerArrayName))
			      	$(componentDivId).data(triggerArrayName,[]);
			      
	 
	 			  // Cria uma array vazia para os listeners
	 			  if(!$(componentDivId).data(bindName))
	 			   	  $(componentDivId).data(bindName,[]);

				  // Instancia o handler para eventos do tipo 'eventType.eventName'
				  $(componentDivId).on(bindName,
				  	{
				  		componentDivId: componentDivId,
				  		bindName: bindName,
				  		eventName: eventName,
				  		triggerArrayName : triggerArrayName
				  	},
					function(e, nclInterface)
					{
						var cdata = $(e.data.componentDivId).data(e.data.bindName);
						for(var listener in cdata)
						{
							var clistener = cdata[listener];
							var flag = clistener.flagMap[e.data.eventName]
							if(nclInterface == flag.bindInterface)
								// For selection conditions we need to check the key
								// This code maybe redundant
								if(e.type == 'selection' && flag.useKey) {
									if (flag.useKey) {
										if (e.which && flag.keyDefaultValue == e.which) {
											clistener.notifyEvent(e.data.eventName);
										}
									}
								} else {
									clistener.notifyEvent(e.data.eventName);
								}
							
						}
						ContextPlayer.executeTriggerArray($(e.data.componentDivId).data(e.data.triggerArrayName))
					  	
					}	
				  	
				  );

        
			   } 
			   
			   //Obtem o triggerArray do evento e coloca no listener
			   listener.triggerBuffer = $(componentDivId).data(triggerArrayName);
			   //Adiciona um listener ao objeto
	    	   $(componentDivId).data(bindName).push(listener);
			      
			   
			} else {
			  //attributeAssessment
			   currentAssessment = assessmentsMap[currentBind.role];
			   currentAssessment.bindComponent = currentBindComponentSelector;
			   currentAssessment.bindInterface = currentInterface;
			   
			   //Trata os parametros do link
			   //Se o value deste attributeAssessment provem de uma variavel 
			   if(currentAssessment.variable)
			   {
			   	 localParamMap = ContextPlayer.createLocalParamMap(currentBind.bindParam);
		/*1*/    currentAssessment.value = localParamMap[currentAssessment.value] ? localParamMap[currentAssessment.value] : connectorParam[currentAssessment.value];		
			   }
			   /* 
			    * As variáveis definidas via linkParam tem o identificaro (dentro do dicionário connectorParam) sem o '$'.
			    * No if-inline (1), é procurado no connectorParam por currentAssessment.value, que o $ no nome da variável.
			    * Na minha correção, eu fiz o linkParam adquirir o $ quando ele é criado lá em cima.
			    * Nâo sei se está minha correção vai acarretar outros bugs, se for, podem reverté-la.
			    * 
			    * Sugestão: sempre utilizar $ nos nomes das variáveis.
			    * 
			    * */
			   
			}
		}
		
			
	}	

}