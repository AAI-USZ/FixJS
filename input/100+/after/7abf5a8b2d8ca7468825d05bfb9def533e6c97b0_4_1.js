function(resource, resourceData)
	{
		var info =
		{
			'human_url':resource.human_url,
			'type':resource.type,
			'mimeType':resource.data.mimeType,
			'size':resource.size||resource.data.contentLength||resource.data.content.length,
			'characterEncoding':resource.encoding||resource.data.characterEncoding
		};

		return (
		['div',
			['span',
				info.human_url,
				'class','resource-detail-overview-url'
			],
			['span',
				info.mimeType+' treated as '+info.type,
				'class','resource-detail-overview-type'
			],
			['span',
				info.size+' bytes'+(info.characterEncoding&&(' in '+info.characterEncoding)),
				'class','resource-detail-overview-size'
			],
			'class','resource-detail-overview'
		]);
	}