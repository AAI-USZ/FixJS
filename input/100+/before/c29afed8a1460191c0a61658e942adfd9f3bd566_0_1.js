function(options)//host, port, username, pass) 
{

	options = options || {};

	var self = this,
        startPath = '/wd/hub',
        queue = [],
        queueIsRunning = false;
	
	self.chain = true;
	self.sessionId = null;
	self.queuedPaused = false;

    /* log level
     * silent : no logs
     * command : command only
     * verbose : command + data
     */
    self.logLevel = options.logLevel || 'verbose';
	
	// where to save the screenshots. default to current folder
	self.screenshotPath = "";
	
	var defaultOptions = {
		host: options.host || 'localhost',
		port: options.port || 4444,
		method: 'POST'
	};
	
    //	defaultOptions = self.extend(defaultOptions, options);
	
	self.desiredCapabilities = {
		browserName: "firefox",
		version: "",
		javascriptEnabled: true,
		platform: "ANY"
	};
	
	if (options.desiredCapabilities)
	{
		self.desiredCapabilities = self.extend(self.desiredCapabilities, options.desiredCapabilities);
	}
	
	self.protocol = {"direct":{}};
	self.commands = {"direct":{}};
	self.tests = {"direct":{}};
	self.assert = {"direct":{}};
	self.direct = {};
	self.custom = {};
	
	function addDirectCommands(scope, commands)
	{
		for(var command in commands)
		{
			var method =  commands[command];
			scope[command] = (function(method)
			{
				return function()
				{
					var args = Array.prototype.slice.call(arguments);
					method.apply(self, args);
				};
			})(method);
		}
	}
	
	var root = {children:[]};
	var currentQueueScope = root.children;
	
	function addQueueCommands(scope, directScope, commands)
	{
		for(var commandName in commands)
		{
			scope[commandName] = (function(internalCommandName)
			{	
				return function()
				{					
					var newQueueItem = new QueueItem(internalCommandName, directScope[internalCommandName], self, arguments);
					self.currentQueueItem.add(newQueueItem);
					
					// when adding commands, we return the instance of the client to be able to chain
					if (self.chain)
					{
						return self;
					}
				};
			})(commandName);
		}
	}
	
	// this funciton is an entry point for adding new commands 
	this.addCommand = function(commandName, command)
	{
		if (self[commandName])
		{
			throw "The command '" + commandName + "' is already defined!";
		}
		
		self[commandName] = (function(internalCommandName)
		{	
			return function()
			{					
				var newQueueItem = new QueueItem(internalCommandName, command, self, arguments);
				self.currentQueueItem.add(newQueueItem);
				
				// when adding commands, we return the instance of the client to be able to chain
				if (self.chain)
				{
					return self;
				}
			};
		})(commandName);
		
		return self;
	}
	
	// function for printing the queue, only used in development
	function printQueueNow()
	{
		console.log("")
		printNewQueue(rootItem, 0);
	}
	
	// creates a string when logging in development
	function createString(sign, multiple)
	{
		var result = "";
		for(var i = 0; i < multiple; i++)
		{
			result += sign;
		}
		return (multiple > 0 ? multiple + " " : multiple) + result;
	}
	
	// function for printing the queue, only used in development
	function printNewQueue(q, l)
	{
		var preString = createString("--", l);
		
		if (q)
		{
			for(var i = 0; i < q.children.length; i++)
			{
				if (self.currentQueueItem == q.children[i])
				{
					console.log(colors.dkgray + preString + colors.reset, colors.violet + q.children[i].commandName + colors.reset + " -> " + q.children[i].isDone);	
				}
				else
				{
					console.log(colors.dkgray + preString + colors.reset, colors.green + q.children[i].commandName + colors.reset + " -> " + q.children[i].isDone);	
				}
				printNewQueue(q.children[i], l + 1);
			}
		}
	}

	var QueueItem = function(commandName, method, scope, args)
	{
		this.children = [];
		this.commandName = commandName;
		this.method = method;
		this.arguments = args;
		this.scope = scope;
		this.currentChildIndex = 0;
		this.isDone = false;
		
		var self = this;
		
		// change callback
		this.arguments = [];
		var hasCallback = false;
		for(var i = 0, ii = args.length; i < ii; i++)
		{
			var currentArg = args[i];
			if (typeof currentArg == "function" && i == (args.length - 1))
			{
				hasCallback = true;
				this.arguments.push((function(method, methodName)
					{
						return function(result)
						{
							
							// call the callback
							method.call(scope, result);
								
						//	console.log("NEXT IN CALLBACK", method.toString())
							// call the next item
							self.next();

						};
					})(currentArg, commandName)
				);	
			}
			else
			{
				this.arguments.push(currentArg);
			}
		}

		if (!hasCallback)
		{
			this.arguments.push((function(){
				return function()
				{					
//					console.log("NEXT IN EMPTY CALLBACK")
					// continue queue after callback
					self.next();	
				};
			})());
		}	
		
	};
	
	
	
	
	

	
	// queue item run command
	QueueItem.prototype.run = function()
	{
		
		// switch to the current queue item to make future addings to the correct queue item
		self.currentQueueItem = this;
		
		// save the current length in case new items are added
		var currentLength = this.children.length;

		// run the command
		this.method.apply(this.scope, this.arguments);
		
		// if the command added new items to the queue, we make sure we run those commans
		if (currentLength < this.children.length)
		{
			//console.log("RUM")
			this.next();
		}
		
	};
	
	// add queue item to the current item
	QueueItem.prototype.add = function(item)
	{
	
		// make a reference to its parent so we can travel back
		item.parent = this;
		
		// add the new item to this childrens list
		this.children.push(item);

		// if we arent running, its time now
		if (!queueIsRunning)
		{
			// make sure we switch the running flag so that we dont run .next again when a new item is added.
			queueIsRunning = true;
			
			// begin the que
			//console.log("ADD")
			this.next();
		}
		else
		{
			//console.log()
		/*	if(this.getNextChildToRun())
			{
				queueIsRunning = true;

				this.next();
			}*/
		}
		
		
		
	};
	
	// go to next queu item
	QueueItem.prototype.next = function()
	{
		
		//printQueueNow();
		
		// if we have more children, run the next
		// otherwise tell the item we are done
		if (this.currentChildIndex < this.children.length)
		{
			this.children[this.currentChildIndex].run();
			this.currentChildIndex++;
		}
		else
		{
			this.done();
		}
	};
	
	// the done method has to check if we are done for real, ie all children are done.
	// if not, we check what children are left to run
	QueueItem.prototype.done = function(scope)
	{
		if (!this.isDone)
		{
			// get the next undone child
			var checkDoneChildren = this.getNextChildToRun();
			
			// if its null, we know all children are done and we dont need to go further
			if (checkDoneChildren == null)
			{
				// mark this as done
				this.isDone = true;
			
				// if we have a parent, run its next command, otherwise we are in the root and are totally finished
				if (this.parent)
				{
				//	console.log("PARENT DONE")
					this.parent.next();
				}
				else
				{
					// and if we are finished we can turn off the running flag
					queueIsRunning = false;
				}
			}
			else
			{
				// but if there was one more child that wasnt ready, run it
			//	console.log("checkDoneChildren.next")
				//checkDoneChildren.next();
			}
		}
		else
		{
		
			// if we are done, we when wheter everything in the queue is done. if so, set the running flag to false
			var nextToRun = self.currentQueueItem.getNextChildToRun();
			if (nextToRun === null)
			{
				queueIsRunning = false;
			}
		}
		
	};
	
	// recursive function to get the next undone item
	QueueItem.prototype.getNextChildToRun = function()
	{
		var notDone = null;
		var done = true;
		var child = null;
		for(var i = 0, ii = this.children.length; i < ii; i++)
		{
			
			if (this.children[i] && !this.children[i].isDone)
			{
				return this.children[i];
			}
			else
			{
				child = this.children[i].getNextChildToRun();
			}
		
		}
		
		return child;

	};
	
	// create the first item of the queue, ie the root
	var rootItem = new QueueItem("root", "none", this, []);
	
	// mark it as the current context
	self.currentQueueItem = rootItem;
	
	
	// expose protocol with correct context
	addDirectCommands(self.direct, protocolCommands);
	
	// create queue commands for the protocol
	addQueueCommands(self, protocolCommands, protocolCommands);
	
	
	/* ------------------------ create commands ------------------------ */
	// expose protocol with correct context
	// addDirectCommands(self.commands.direct, commandList);
	
	// create the commands
	addQueueCommands(self, commandList, commandList);
	
	
	/* ------------------------ create tests ------------------------ */
	// expose protocol with correct context
	// addDirectCommands(self.tests.direct, testList);
		
	// create the commands
	addQueueCommands(self.tests, testList, testList);
	
	addQueueCommands(self.assert, assertList, assertList);

	
	
	/*if (username && accessKey) {
	var authString = username+":"+accessKey;
		var buf = new Buffer(authString);
		this.options['headers'] = {
			'Authorization': 'Basic '+ buf.toString('base64')
		}
		this.desiredCapabilities.platform = "VISTA";
	}*/
	
	if (self.logLevel !== 'silent' && !infoHasBeenShown)
	{
		console.log("");
		console.log(colors.yellow + "=====================================================================================" + colors.reset);
		console.log("");
		console.log("Selenium 2.0/webdriver protocol bindings implementation with helper commands in nodejs by Camilo Tapia.");
		console.log("For a complete list of commands, visit " + colors.lime + "http://code.google.com/p/selenium/wiki/JsonWireProtocol" + colors.reset + ". ");
		console.log("Not all commands are implemented yet. visit " + colors.lime + "https://github.com/Camme/webdriverjs" + colors.reset + " for more info on webdriverjs. ");
		//Start with " + colors.lime + "-h option" + colors.reset + " to get a list of all commands.");
		console.log("");
		console.log(colors.yellow + "=====================================================================================" + colors.reset);
		console.log("");
		
		infoHasBeenShown = true;
	}
	
	// create a set of request options
	self.createOptions = function(requestOptions)
	{
		
		var newOptions = self.extend(defaultOptions, requestOptions);
		
		
		var path = startPath;

		if (self.sessionId)
		{
			newOptions.path = newOptions.path.replace(':sessionId', self.sessionId);
		}
		
		if (newOptions.path && newOptions.path !== "")
		{
			path += newOptions.path;
		}
		
		newOptions.path = path;

		return newOptions;
	};
	
	
	self.setScreenshotPath = function(pathToSaveTo)
	{
		self.screenshotPath = pathToSaveTo;
		return self;
	}
	
	
//	console.log(process.argv)
	
}