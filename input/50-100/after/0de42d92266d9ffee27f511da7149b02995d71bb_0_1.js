function(options) {
    options = options || {}

    options.dialect = options.dialect || 'mysql'
    options.logging = (options.hasOwnProperty('logging') ? options.logging : false)

    return new Sequelize(
      config[options.dialect].database,
      config[options.dialect].username,
      config[options.dialect].password,
      {
        logging:  options.logging,
        dialect:  options.dialect,
        port:     config[options.dialect].port
      }
    )
  }