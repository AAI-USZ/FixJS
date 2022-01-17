function()	{
		var code = (arguments.length >= 1) ? arguments[0] : 'COM01';
		
		this.error = {
			COM01 : "UNKNOW ERROR.",
			STR01 : "STORAGE MODE NOT FOUND.",
			STR02 : "TABLE ALREADY EXIST'S.",
            STR03 : "TABLE NOT FOUND.",
            STR04 : "INCORRECT FIELD NAME OR DATA TYPE.",
            
            CRT01 : "TABLE NOT SELECTED!!"
		};
		
		/**
		 * This method return the error message;
		 * @access : public; 
		 * @return : string;
		 */
		this.message = function()	{
			return this.error[code];
		};
	}