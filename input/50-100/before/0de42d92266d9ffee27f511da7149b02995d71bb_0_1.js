function(options) {
    options = options || {}

    options.dialect = options.dialect || 'mysql'

    return new Sequelize(
      config[options.dialect].database,
      config[options.dialect].username,
      config[options.dialect].password,
      {
        logging:  false,
        dialect:  options.dialect,
        port:     config[options.dialect].port
      }
    )
  }