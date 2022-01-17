function(appType){
	var path = "/" + appType;

	var data = {
		"mappings":{
			"questions": {
				"properties": {
					"body": {
						"type": "multi_field",
						"fields": {
							"body": {
								"type": "string"
							},
							"untouched": {
								"type": "string",
								"index": "not_analyzed"
							}
						}
					},
					"category": {
						"type": "string"
					},
					"status": {
						"type": "string"
					},
					"user": {
						"type": "string",
						"index": "not_analyzed"
					},
					"title": {
						"type": "multi_field",
						"fields": {
							"title": {
								"type": "string"
							},
							"untouched": {
								"type": "string",
								"index": "not_analyzed"
							}
						}
					},
					"timestamp": {
						"type": "date",
						"format":"dateOptionalTime"
					},
					"followup": {
						"type": "string",
						"index": "not_analyzed"
					}
				}
			},

			"comments": {
				"properties": {
					"body": {
						"type": "multi_field",
						"fields": {
							"body": {
								"type": "string"
							},
							"untouched": {
								"type": "string",
								"index": "not_analyzed"
							}
						}
					},
					"upvote": {
						"type": "string"
					},
					"downvote": {
						"type": "string"
					},
					"timestamp": {
						"type": "date",
						"format":"YYYY-MM-dd"
					},
					"user": {
						"type": "string"
					},	
					"target_uuid": {
						"type" : "string",
						"index": "not_analyzed"
					},
					"title": {
						"type": "multi_field",
						"fields": {
							"title": {
								"type": "string"
							},
							"untouched": {
								"type": "string",
								"index": "not_analyzed"
							}
						}
					},
					"objectType": {
						"type" : "string"
					},			
					"isAnswered": {
						"type": "string"
					}
				}
			}
		}
	}
	db.post(path, data, function(err, req, data){
		console.log(data);
	})
}