function (id, parentRequire, loaded){
			var dm = win.global._no_dojo_dm || lang.getObject("dojox.mobile", true);
			parentRequire([(dm.currentTheme === "android" ? "./ValuePicker" : "./SpinWheel") + id], loaded);
		}