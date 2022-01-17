function( manifest, fn ) {
		manifest = {
			name: "theplugin",
			version: "0.1.0",
			title: "The Plugin",
			author: {
				name: "John Doe",
				email: "johndoe@example.com",
				url: "http://example.com"
			},
			licenses: [
				{
					type: "foo",
					url: "http://example.com/foo-license"
				},
				{
					type: "bar",
					url: "http://example.com/bar-license"
				}
			],
			dependencies: {
				jquery: "1.2.3",
				dep1: "1.1.1"
			},
			description: "A jQuery Plugin",
			keywords: [ "jQuery", "plugin" ],
			homepage: "http://example.com/theplugin",
			docs: "http://example.com/theplugin-docs",
			demo: "http://example.com/theplugin-demo",
			download: "http://example.com/theplugin-download",
			maintainers: [
				{
					name: "Jane Doe",
					email: "janedoe@example.com",
					url: "http://example.com/jane"
				},
				{
					name: "Joe Smith",
					email: "joesmith@example.com",
					url: "http://example.com/joe"
				}
			]
		};
		fn( manifest, manifest.version, [] );
	}