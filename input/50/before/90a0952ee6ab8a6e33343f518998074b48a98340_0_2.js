function(feature)
					{
						feature_icon = feature.attributes.icon;
						if (feature_icon!=="")
						{
							return feature_icon;
						}
						else
						{
							return "";
						}
					}