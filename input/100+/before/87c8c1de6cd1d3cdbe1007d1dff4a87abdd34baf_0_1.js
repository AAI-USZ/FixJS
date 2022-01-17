function(data) {
				if(data && data.length)
				{
					// filter already set tags // by PsiTrax
					var choosenTags = self.options.mooTagify.getTags();
					data = Array.filter(data, function(option){
						return !choosenTags.contains(option);
					});
				}

                if (data && data.length) {
                    self.show()
                    self.addOptions(data)
                }
                else {
                    self.clearOptions()
                    self.hide()
                }

            }