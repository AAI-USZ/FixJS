function Cursors(obj){
		this.pointer = obj.pointer || "url(\"./images/cursors/cursor.png\"), auto";
		this.resizeR = obj.resizeR || "url(\"./images/cursors/resize-right.png\") 10 15, col-resize";
		this.resizeL = obj.resizeL || "url(\"./images/cursors/resize-left.png\") 22 15, col-resize";
		this.move = obj.move || "url(\"./images/cursors/move.png\") 15 15, move";
		this.skip = obj.skip || "url(\"./images/cursors/skip.png\") 1 5, auto";
		this.repeatA = obj.repeatA || "url(\"./images/cursors/repeat-a.png\"), auto";
		this.repeatB = obj.repeatB || "url(\"./images/cursors/repeat-b.png\"), auto";
		this.add = obj.add || "url(\"./images/cursors/add.png\"), auto";
		this.select = obj.select || "url(\"./images/cursors/cursor-highlight.png\"), auto";
		this.remove = obj.remove || "url(\"./images/cursors/delete.png\") 15 15, pointer";
		this.locked = obj.locked || "not-allowed";
		Object.freeze(this);
	}