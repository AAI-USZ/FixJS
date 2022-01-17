function isNotNative(classDef) {
			if ((classDef.flags() & ClassDefinition.IS_NATIVE) != 0) {
				return false;
			}
			return classDef.forEachClassFromBase(isNotNative);
		}