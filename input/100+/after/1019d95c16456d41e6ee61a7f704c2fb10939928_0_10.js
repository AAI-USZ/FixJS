function(item) {
				if (item.toRef)
					// for action in the git log
					return item.RepositoryPath === "" && item.toRef.Type === "Branch" && item.toRef.Current && item.toRef.RemoteLocation; //$NON-NLS-0$		
			}