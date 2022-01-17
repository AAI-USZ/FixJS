function(json) {
  if (!json || json.type !== 'object') return
  
  var key, properties = []
  for (key in json.properties) {
    properties.push({ min : json.properties[key].required ? 1 : 0
                    , max : 1
                    , key : key
                    , value : schema.fromJSON(json.properties[key])
                    , description : json.properties[key].description
                    })
  }
  for (key in json.patternProperties) {
    properties.push({ min : 0
                    , max : Infinity
                    , key : RegExp('^' + key + '$')
                    , value : schema.fromJSON(json.properties[key])
                    , description : json.patternProperties[key].description
                    })
  }
  
  var other
  if (json.additionalProperties !== undefined) {
    other = json.additionalProperties === false ? nothing : schema.fromJSON(json.additionalProperties)
  }
  
  return new ObjectSchema(properties, other)
}