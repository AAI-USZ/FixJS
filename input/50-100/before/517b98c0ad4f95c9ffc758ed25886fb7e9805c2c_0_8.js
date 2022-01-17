function()	{

	/**
	 * Storage Constructor;
	 */
	var Storage = function()	{
		this.identifyStorage();
	};
	
	/**
	 * Inherting DataManager;
	 */
	Storage = WebbaseUtility.ObjectExt.inherit(DataManager, Storage);

	/**
	 * Inherting StorageManager;
	 */
	Storage = WebbaseUtility.ObjectExt.inherit(StorageManager, Storage);
	
	return new Storage();
}