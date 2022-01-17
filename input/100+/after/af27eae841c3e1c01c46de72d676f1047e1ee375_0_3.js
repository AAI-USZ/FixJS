function() {
		config.current = this;
		if ( this.expected != null && this.expected != this.assertions.length ) {
			QUnit.pushFailure( "Expected " + this.expected + " assertions, but " + this.assertions.length + " were run" );
		} else if ( this.expected == null && !this.assertions.length ) {
			QUnit.pushFailure( "Expected at least one assertion, but none were run - call expect(0) to accept zero assertions." );
		}

		try {
			QUnit.reset();
		} catch(e) {
			QUnit.pushFailure( "reset() failed on " + this.testName + ": " + e.message, extractStacktrace( e, 1 ) );
		}

		var good = 0, bad = 0,
			tests = id("qunit-tests");

		config.stats.all += this.assertions.length;
		config.moduleStats.all += this.assertions.length;

		if ( tests ) {
			var ol = document.createElement("ol");

			for ( var i = 0; i < this.assertions.length; i++ ) {
				var assertion = this.assertions[i];

				var li = document.createElement("li");
				li.className = assertion.result ? "pass" : "fail";
				li.innerHTML = assertion.message || (assertion.result ? "okay" : "failed");
				ol.appendChild( li );

				if ( assertion.result ) {
					good++;
				} else {
					bad++;
					config.stats.bad++;
					config.moduleStats.bad++;
				}
			}

			// store result when possible
			if ( QUnit.config.reorder && defined.sessionStorage ) {
				if (bad) {
					sessionStorage.setItem("qunit-" + this.module + "-" + this.testName, bad);
				} else {
					sessionStorage.removeItem("qunit-" + this.module + "-" + this.testName);
				}
			}

			if (bad == 0) {
				ol.style.display = "none";
			}

			var b = document.createElement("strong");
			b.innerHTML = this.name + " <b class='counts'>(<b class='failed'>" + bad + "</b>, <b class='passed'>" + good + "</b>, " + this.assertions.length + ")</b>";

			var a = document.createElement("a");
			a.innerHTML = "Rerun";
			a.href = QUnit.url({ filter: getText([b]).replace(/\([^)]+\)$/, "").replace(/(^\s*|\s*$)/g, "") });

			addEvent(b, "click", function() {
				var next = b.nextSibling.nextSibling,
					display = next.style.display;
				next.style.display = display === "none" ? "block" : "none";
			});

			addEvent(b, "dblclick", function(e) {
				var target = e && e.target ? e.target : window.event.srcElement;
				if ( target.nodeName.toLowerCase() == "span" || target.nodeName.toLowerCase() == "b" ) {
					target = target.parentNode;
				}
				if ( window.location && target.nodeName.toLowerCase() === "strong" ) {
					window.location = QUnit.url({ filter: getText([target]).replace(/\([^)]+\)$/, "").replace(/(^\s*|\s*$)/g, "") });
				}
			});

			var li = id(this.id);
			li.className = bad ? "fail" : "pass";
			li.removeChild( li.firstChild );
			li.appendChild( b );
			li.appendChild( a );
			li.appendChild( ol );

		} else {
			for ( var i = 0; i < this.assertions.length; i++ ) {
				if ( !this.assertions[i].result ) {
					bad++;
					config.stats.bad++;
					config.moduleStats.bad++;
				}
			}
		}

		runLoggingCallbacks( 'testDone', QUnit, {
			name: this.testName,
			module: this.module,
			failed: bad,
			passed: this.assertions.length - bad,
			total: this.assertions.length
		} );
	}