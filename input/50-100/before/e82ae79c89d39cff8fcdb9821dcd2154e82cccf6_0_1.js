function() {
				
				var build = util.getMetaContent('vibe-build'),
					version = util.getMetaContent('vibe-version'),
					result = ""
				
				result += "<p style='font-size:14px'><strong>Version:</strong> " + version + "</p>"
				
				if ( build ) {
					result += "<p style='font-size:14px'><strong>Build:</strong> " + build + "</p>"
				}
				
				return result
				
			}