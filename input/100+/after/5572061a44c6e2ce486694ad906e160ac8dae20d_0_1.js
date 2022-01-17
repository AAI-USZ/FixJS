function(object) {
  if (!(object instanceof Object)) return
      
  var other, property, properties = []
  for (var key in object) {
    property = { value : schema.fromJS(object[key]) }
    
    // '*' as property name means 'every other property should match this schema'
    if (key === '*') {
      other = property.value
      continue
    }
    
    // Handling special chars at the beginning of the property name
    property.min = (key[0] === '*' || key[0] === '?') ? 0 : 1
    property.max = (key[0] === '*' || key[0] === '+') ? Infinity : 1
    key = key.replace(/^[*?+]/, '')
    
    // Handling property title that looks like: { 'a : an important property' : Number }
    key = key.replace(/\s*:[^:]+$/, function(match) {
      property.title = match.replace(/^\s*:\s*/, '')
      return ''
    })
    
    // Testing if it is regexp-like or not. If it is, then converting to a regexp object
    property.key = regexpString(key)
    
    properties.push(property)
  }
  
  return new ObjectSchema(properties, other)
}