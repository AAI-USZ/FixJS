function() {
	this.h = new konoha.kObjectHeader();				//	kObjectHeader
	this.packid = null;		//	kpack_t
	this.pakdom = null;		//kpack_t
	this.parentNULL = null;	//const struct _kKonohaSpace *
	this.fmat = null;			//const Ftokenizer *
	this.syntaxMapNN = null;	//struct kmap_t *
	this.gluehdr = null;		//void *
	this.scrNUL = new konoha.kObject();		//kObject *
	this.static_cid = null;	//kcid_t
	this.function_cid = null;	//kcid_t
	this.methods = new konoha.kArray();		//kArray *
	this.cl = null;			//	karray_t
}