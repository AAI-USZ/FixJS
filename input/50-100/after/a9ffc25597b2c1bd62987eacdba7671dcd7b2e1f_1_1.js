function (classDef) {
		if (classDef.className() == "Object") {
			return false;
		} else if ((classDef.flags() & ClassDefinition.IS_NATIVE) != 0) {
			return true;
		}
		return _Util.classIsNative(classDef.extendType().getClassDef());
	}