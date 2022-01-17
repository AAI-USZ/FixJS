function(dx, dy) {

	

	/*@TODO: Review buggy*/

	var c = this;

	c.setPosition(c.position[0] + dx * c.right[0], 

		          c.position[1] + dy * c.up[1], 

		          c.position[2]);

	c.setFocus(c.focus[0] + dx * c.right[0], 

		       c.focus[1] + dy * c.up[1], 

		       c.focus[2]);

}