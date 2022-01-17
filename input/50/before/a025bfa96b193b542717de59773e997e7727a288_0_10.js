function jQuery_single (o){
		 var collection = jQuery([1]); // Fill with 1 item, to make sure length === 1
		 return function single_internal (element) {
			 // Give collection the element:
			collection[0] = element;
			 // Return the collection:
			return collection;
		 };
	}