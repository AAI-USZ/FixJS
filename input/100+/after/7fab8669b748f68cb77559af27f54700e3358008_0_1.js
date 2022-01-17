function (context, parentExpr) {
		// for instantiated code, check is necessary at this moment
		if (! (this._type instanceof ObjectType)) {
			context.errors.push(new CompileError(this._token, "cannot instantiate a non-object type: " + this._type.toString()));
			return false;
		}
		var classDef = this._type.getClassDef();
		if (classDef == null)
			return false;
		if ((classDef.flags() & (ClassDefinition.IS_INTERFACE | ClassDefinition.IS_MIXIN)) != 0) {
			context.errors.push(new CompileError(this._token, "cannot instantiate an interface or a mixin"));
			return false;
		}
		if ((classDef.flags() & ClassDefinition.IS_ABSTRACT) != 0) {
			context.errors.push(new CompileError(this._token, "cannot instantiate an abstract class"));
			return false;
		}
		var ctors = classDef.getMemberTypeByName("constructor", false, ClassDefinition.GET_MEMBER_MODE_CLASS_ONLY);
		var argTypes = Util.analyzeArgs(
			context, this._args, this,
			ctors.getExpectedCallbackTypes(this._args.length, false));
		if (argTypes == null)
			return false;
		if ((this._constructor = ctors.deduceByArgumentTypes(context, this._token, argTypes, false)) == null) {
			context.errors.push(new CompileError(this._token, "cannot create an object of type '" + this._type.toString() + "', arguments mismatch"));
			return false;
		}
		return true;
	}