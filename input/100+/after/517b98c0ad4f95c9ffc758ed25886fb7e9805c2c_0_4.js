function()	{

	/**
	 * Private Methods wrapper for DataManager Module;
	 * @version : 1.0.0;
	 * @return : object;
	 */
	var Private = {
		initCreate : function(tableName, desc)  {},
		setTableDetails : function(tableName, desc, primaryKey)	{},
        getTableDetails : function()  {},
        checkTableAlreadyExists : function(tableName)	{},
        createTable : function(tableName)	{},
        initInsert : function(tableName, data)  {},
        dataFieldUnMatch : function(tableDesc,data) {},
        dataTypeUnMatch : function(tableDesc,data)    {},
        insertData : function(tableName, data) {},
        resetCriteriaStruct : function()    {},
        getTableData : function(tableName)  {},
        find : function(data)   {},
        parseAndPrepareCondition : function()   {},
        delete : function()	{},
        update : function()	{},
        primaryKeyMatch : function()	{}
	};
	
	/**
	 * Method to create table and perform all the validations and checking before
	 * saving it to the storage;
	 * @method : create;
	 * @access : private;
	 */
	Private.initCreate = function(tableName,desc,primaryKey)	{
		if(Webbase.StorageMode)	{
			this.getTableDetails();
			if(!this.checkTableAlreadyExists(tableName))	{
				this.setTableDetails(tableName,desc,primaryKey);
				this.createTable(tableName);
			}else	{
				throw new Webbase.Exception('STR02');
			}
		}else	{
			throw new Webbase.Exception('STR01');
		}
	};
	
	/**
	 * Method to save tables details in the storage for future use;
	 * @method : saveTableDetails;
	 * @access : private;
	 */
	Private.setTableDetails = function(tableName, desc, primaryKey)	{
		if(desc.hasOwnProperty(primaryKey) || primaryKey == '')	{
			Webbase.TableDesc.push({
				name : tableName,
				field : desc,
				primaryKey : primaryKey
			});
			Webbase.StorageMode.setItem('Webbase_tbl', WebbaseUtility.JSON.stringify(Webbase.TableDesc));
		}else	{
			throw new Webbase.Exception('STR05');
		}
	};
    
    /**
	 * Method to get table details from the storage space and populate the
	 * Webbase.TableDesc data structure;
	 * @method : saveTableDetails;
	 * @access : private;
	 */
    Private.getTablesDetails = function()  {
		var tableArray = [];
		
		tableArray = WebbaseUtility.JSON.parse(Webbase.StorageMode.getItem('Webbase_tbl'));
		if(tableArray != null)  {
			Webbase.TableDesc = tableArray;
		}else   {
			Webbase.TableDesc = [];
		}        
    };
    
    /**
	 * Method to check the table already defined in the storage;
	 * @method : checkTableAlreadyExists;
	 * @access : private;
     * @return : Object;
	 */
    Private.checkTableAlreadyExists = function(tableName)	{
    	var status = false;
    	
    	for(var i = 0; i < Webbase.TableDesc.length; i++)	{
    		if(Webbase.TableDesc[i].name == tableName)	{
    			status = Webbase.TableDesc[i];
    		}
    	}
    	
    	return status;
    };
	
	/**
	 * Method to create the table in the storage;
	 * @method : createTable;
	 * @access : private;
	 */
	Private.createTable = function(tableName)	{
		Webbase.StorageMode.setItem('Webbase_' + tableName, '[]');
	};
    
    /**
     * Method to check the selected fields are same as in the table description;
     * @method : dataFieldUnMatch;
     * @access : private;
     * @param : object tableDesc;
     * @param : object data;
     * @return : boolean;
     */
    Private.dataFieldUnMatch = function(tableDesc, data)  {
        var status = false;
        
        for(var key in data)    {
            if(!tableDesc.hasOwnProperty(key))  {
                status = true;
                break;
            }
        }
        
        return status;
    };
    
    /**
     * Method to check the data type of the data inserted; 
     * @method : dataTypeUnMatch;
     * @access : private;
     * @param : object tableDesc;
     * @param : object data;
     * @return : boolean;
     */
    Private.dataTypeUnMatch = function(tableDesc, data) {
        var status = false;
        
        for(var key in data)    {
            if(typeof(data[key]) != tableDesc[key].toLowerCase()) {
                status = true;
                break;
            }
        }
        
        return status;
    };
    
    /**
     * Method to retrive all the table data from the local storage;
     * @method : getTableData;
     * @access : private;
     * @param : string tableName;
     * @return : object;
     */
    Private.getTableData = function(tableName)   {
        return WebbaseUtility.JSON.parse(Webbase.StorageMode.getItem('Webbase_' + tableName));
    };
    
    /**
     * Method to save data to the corresponding table in the storage method;
     * @method : insertData;
     * @access : private;
     * @param : string tableName;
     * @param : object data;
     */
    Private.insertData = function(tableName, data)  {
        var tableData = Private.getTableData(tableName);
        tableData.push(data);
        Webbase.StorageMode.setItem('Webbase_' + tableName, WebbaseUtility.JSON.stringify(tableData));
    };

    Private.primaryKeyMatch = function(tableName, primaryKey, data)	{
    	var tableData = this.getTableData(tableName), status = false;

    	for(var i = 0; i < tableData.length; i++)	{
    		if(tableData[i][primaryKey] == data[primaryKey])	{
    			status = true;
    		}
    	}

    	return status;
    }
    
    /**
     * Method to initialize the insert functionality;
     * @method : initInsert;
     * @access : private;
     * @param : string tableName;
     * @param : object data;
     */
    Private.initInsert = function(tableName, data) {
        var tableDetails;
        
        if(tableDetails = this.checkTableAlreadyExists(tableName))   {
            if(!this.dataFieldUnMatch(tableDetails.field, data) && !this.dataTypeUnMatch(tableDetails.field, data))	{
            	if(!this.primaryKeyMatch(tableName, tableDetails.primaryKey, data))  {
                	this.insertData(tableName, data);
            	}else	{
            		throw new Webbase.Exception('STR06');	
            	}
            }else   {
                throw new Webbase.Exception('STR04');
            }
        }else   {
            throw new Webbase.Exception('STR03');
        }
    };
    
    /**
     * Method to reset the Criteria data structure;
     * @method : resetCriteriaStruct;
     * @access : private;
     */
    Private.resetCriteriaStruct = function()    {
        Webbase.CriteriaStruct = {
            select : [],
            from : '',
            where : '',
            set : ''
        };
    };
    
    /**
     * Method to parse the criteria provided by the user and replace the fields in the query;
     * @method : parseAndPrepareCondition;
     * @access : private;
     * @param : string condition;
     * @param : object tableDesc;
     * @return : string;
     */
    Private.parseAndPrepareCondition = function(condition, tableDesc) {
        var token, totalToken, param;
        
        totalToken = condition.match(/{\w+}/g).length;
        
        for(var i = 0; i < totalToken; i++) {
            token = condition.match(/{\w+}/);
            if(token.length > 0)    {
                param = token[0].replace('{','').replace('}','');
                if(tableDesc.hasOwnProperty(param)) {
                    condition = condition.replace(token[0],'tuple["'+ param +'"]');
                }else   {
                    condition = false;
                    break;
                }
            }
        }
        
        return condition; 
    };
    
    /**
     * Method to retrive data from the storage;
     * @method : dataFieldUnMatch;
     * @access : private;
     * @param : object data;
     * @return : object;
     */
    Private.find = function(data)   {
        var condition = Webbase.CriteriaStruct.where, tuple, resultData = [], subTuple = {}, selectArray;
        
        if(condition.length > 0)	{
        	condition = this.parseAndPrepareCondition(condition,this.checkTableAlreadyExists(Webbase.CriteriaStruct.from).field);
    	}else	{
    		condition = '1 == 1'
    	}

        for(var i = 0; i < data.length; i++)    {
            tuple = data[i];
            if(eval(condition)) {
                subTuple = {};
                selectArray = Webbase.CriteriaStruct.select;
                if(selectArray[0] != '*')	{
	                for(var j = 0; j < selectArray.length; j++)   {
	                    subTuple[selectArray[j]] = tuple[selectArray[j]]; 
	                }
	                resultData.push(subTuple);
            	}else	{
                	resultData.push(tuple);
                }
            }
        }
        
        return resultData;
    };

    Private.updateData = function(tableName, data)  {
        Webbase.StorageMode.setItem('Webbase_' + tableName, WebbaseUtility.JSON.stringify(data));
    };
	
	Private.delete = function(data)	{
		var condition, tuple, resultData = [];
		condition = Webbase.CriteriaStruct.where;
		condition = this.parseAndPrepareCondition(condition,this.checkTableAlreadyExists(Webbase.CriteriaStruct.from).field);
		for(var i = 0; i < data.length; i++)	{
			tuple = data[i];
			if(eval(condition) == false)	{
				resultData.push(tuple);
			}
		}

		this.updateData(Webbase.CriteriaStruct.from, resultData);
	};

	Private.update = function(data)	{
		var condition, tuple, resultData = [], setData = Webbase.CriteriaStruct.set;
		condition = Webbase.CriteriaStruct.where;
		condition = this.parseAndPrepareCondition(condition,this.checkTableAlreadyExists(Webbase.CriteriaStruct.from).field);
		for(var i = 0; i < data.length; i++)	{
			tuple = data[i];
			if(eval(condition))	{
				for(var key in setData)	{
					tuple[key] = setData[key];
				}	
			}

			resultData.push(tuple);
		}

		this.updateData(Webbase.CriteriaStruct.from, resultData);
	};

	/** 
	 * DataManager Constructor;
	 */
	var DataManager = function()	{
	};
	
	/**
	 * Method to create table in the storage;
	 * @access : public;
	 * @method : create;
	 * @param : string tableName;
	 * @param : string desc;
	 */
	DataManager.prototype.create = function(tableName, desc, primaryKey)	{
		if(!primaryKey)	{
			primaryKey = '';
		}

		try	{
			Private.initCreate(tableName, desc, primaryKey);
		}catch(err)	{
			WebbaseUtility.Log.show(err.message());
		}
	};
    
    /**
	 * Method to insert data into table;
	 * @access : public;
	 * @method : insert;
	 * @param : string tableName;
	 * @param : string desc;
	 */
    DataManager.prototype.insert = function(tableName, data)    {
        try {
            Private.initInsert(tableName, data);
        }catch(error)    {
            WebbaseUtility.Log.show(error.message());
        }
    };
    
    /**
	 * Method to set select fields to the CriteriaStruct to get data;
	 * @access : public;
	 * @method : select;
	 * @param : string fields;
	 * @return object;
	 */
    DataManager.prototype.select = function(fields) {
        var fields = fields.split(',');
        
        if(fields.length > 0)  {
            Webbase.CriteriaStruct.select = fields;
        }else   {
            Webbase.CriteriaStruct.select = [];
            Webbase.CriteriaStruct.select.push('*');
        }
        
        return this;
    };
    
    /**
	 * Method to set table name to the CriteriaStruct to get data;
	 * @access : public;
	 * @method : from;
	 * @param : string tableName;
	 * @return object;
	 */
    DataManager.prototype.from = function(tableName)    {
        Webbase.CriteriaStruct.from = tableName;
        
        return this;
    };
    
    /**
	 * Method to set search criteria to the CriteriaStruct;
	 * @access : public;
	 * @method : where;
	 * @param : string criteria;
	 * @return object;
	 */
    DataManager.prototype.where = function(criteria) {
        Webbase.CriteriaStruct.where = criteria;
        
        return this;
    };

    DataManager.prototype.set = function(setData)	{
    	Webbase.CriteriaStruct.set = setData;

    	return this;
    };
    
    /**
	 * Method to initiate search over the data set with respect to the CriteriaStruct;
	 * @access : public;
	 * @method : find;
	 * @return object;
	 */
    DataManager.prototype.find = function() {
    	var result = false;
        try {
            if(Webbase.CriteriaStruct.from.length > 0 && Private.checkTableAlreadyExists(Webbase.CriteriaStruct.from)) {
                if(Webbase.CriteriaStruct.select.length <= 0)   {
                    Webbase.CriteriaStruct.select = ['*'];    
                }
                
                var tableData = Private.getTableData(Webbase.CriteriaStruct.from);
                result = Private.find(tableData);
                
                Private.resetCriteriaStruct();

            }else   {
                Private.resetCriteriaStruct();
                throw new Webbase.Exception('CRT01');
            }        
        }catch(error)   {
            WebbaseUtility.Log.show(error.message());
        }finally	{
        	return result;
        }
    };

    DataManager.prototype.delete = function()	{
    	try{
    		if(Webbase.CriteriaStruct.from.length > 0 && Private.checkTableAlreadyExists(Webbase.CriteriaStruct.from))	{
    			Private.delete(Private.getTableData(Webbase.CriteriaStruct.from));
    			Private.resetCriteriaStruct();
    		}else	{
    			Private.resetCriteriaStruct();
    			throw new Webbase.Exception('CRT01');
    		}
    	}catch(error)	{
    		WebbaseUtility.Log.show(error.message());
    	}
    };

    DataManager.prototype.update = function()	{
    	try{
    		if(Webbase.CriteriaStruct.from.length > 0 && Private.checkTableAlreadyExists(Webbase.CriteriaStruct.from))	{
    			Private.update(Private.getTableData(Webbase.CriteriaStruct.from));
    			Private.resetCriteriaStruct();
    		}else	{
    			Private.resetCriteriaStruct();
    			throw new Webbase.Exception('CRT01');
    		}
    	}catch(error)	{
    		WebbaseUtility.Log.show(error.message());
    	}
    };
	
	return DataManager;
}