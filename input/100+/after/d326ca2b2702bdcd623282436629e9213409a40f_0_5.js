function(module, exports, DEFS) {

var net = require('net')
var URL = require('url')
var util = require('util')
var http = require('http')
var FCGI = require('fastcgi-parser')

var LOG = DEFS.log

module.exports = { 'httpd': httpd
                 }


// Connect to a FastCGI service and run an HTTP front-end sending all requests to it.
function httpd(port, host, socket_path, callback) {
  connect_fcgi(socket_path, 0, function(er, socket) {
    if(er)
      return callback(er)

    fcgi_get_values(socket, function(er, values) {
      if(er)
        return callback(er)

      values.FCGI_MPXS_CONNS = values.FCGI_MPXS_CONNS || 0
      LOG.info('FCGI values: %j', values)

      var server = http.createServer(fcgi_handler(port, host, values, socket, socket_path))
      server.listen(port, host)
      return callback(null)
    })
  })
}

function fcgi_get_values(socket, callback) {
  LOG.info('Get FastCGI values')
  socket.on('data', on_data)

  var values = [ ['FCGI_MAX_CONNS' , '']
               , ['FCGI_MAX_REQS'  , '']
               , ['FCGI_MPXS_CONNS', '']
               ]

  var writer = new FCGI.writer
  writer.encoding = 'binary'

  writer.writeHeader({ 'version' : FCGI.constants.version
                     , 'type'    : FCGI.constants.record.FCGI_GET_VALUES
                     , 'recordId': 0
                     , 'contentLength': FCGI.getParamLength(values)
                     , 'paddingLength': 0
                     })
  writer.writeParams(values)
  socket.write(writer.tobuffer())

  writer.writeHeader({ 'version' : FCGI.constants.version
                     , 'type'    : FCGI.constants.record.FCGI_GET_VALUES
                     , 'recordId': 0
                     , 'contentLength': 0
                     , 'paddingLength': 0
                     })
  socket.write(writer.tobuffer())

  LOG.info('Listening for FastCGI values')
  var fcgi_values = {}
  var timeout = setTimeout(got_all_values, 100)

  function on_data(data) {
    var parser = new FCGI.parser
    parser.encoding = 'utf8'
    parser.onRecord = on_record
    parser.onError  = on_error
    parser.execute(data)
  }

  function on_error(er) {
    LOG.error('Error getting FastCGI values: %s', er.message || er)
    parser.onRecord = parser.onError = function() {}
    callback(er)
  }

  function on_record(record) {
    var params = record.body.params || {}
      , keys = Object.keys(params)

    keys.forEach(function(key) {
      fcgi_values[key] = num_or_str(params[key])
    })

    if(keys.length == 0)
      got_all_values()
  }

  function got_all_values() {
    clearTimeout(timeout)
    socket.removeListener('data', on_data)
    callback(null, fcgi_values)
  }
}

function fcgi_handler(port, server_addr, features, socket, socket_path) {
  var request_id = 0
    , requests_in_flight = {}
    , pending_requests = []

  prep_socket()
  return on_request

  function on_request(req, res) {
    LOG.info('Request: %j', req.url)
    request_id += 1
    var fcgi_request = { 'id': request_id
                       , 'req': req
                       , 'res':res
                       , 'stdout': []
                       , 'stderr': []
                       , 'keepalive': FCGI.constants.keepalive.OFF
                       }
    pending_requests.push(fcgi_request)
    process_request()
  }

  function process_request() {
    if(!socket)
      return LOG.info('Postpone request until FastCGI is back up')

    if(Object.keys(requests_in_flight).length && features.FCGI_MPXS_CONNS == 0)
      return LOG.info('Postpone request for non-multiplexed FastCGI')

    var fcgi_request = pending_requests.shift()
    if(!fcgi_request)
      return //LOG.info('No requests to process')
    else
      requests_in_flight[fcgi_request.id] = fcgi_request

    var req = fcgi_request.req
      , res = fcgi_request.res

    var req_url = URL.parse(req.url)
    var cgi = { 'PATH_INFO': req_url.pathname
              , 'SERVER_NAME': server_addr || 'unknown'
              , 'SERVER_PORT': port
              , 'SERVER_PROTOCOL': 'HTTP/1.1'
              , 'SERVER_SOFTWARE': 'Node/' + process.version
              }

    Object.keys(req.headers).forEach(function(header) {
      var key = 'HTTP_' + header.toUpperCase().replace(/-/g, '_')
      cgi[key] = req.headers[header]
    })

    cgi.REQUEST_METHOD = req.method
    cgi.QUERY_STRING = req_url.query || ''
    if('content-length' in req.headers)
      cgi.CONTENT_LENGTH = req.headers['content-length']
    if('content-type' in req.headers)
      cgi.CONTENT_LENGTH = req.headers['content-type']
    if('authorization' in req.headers)
      cgi.AUTH_TYPE = req.headers.authorization.split(/ /)[0]

    //LOG.info('CGI: %j', cgi)

    var params = Object.keys(cgi).map(function(key) { return [key, cgi[key]] })

    // Write the request to FastCGI.
    LOG.info('Write request %d to FastCGI: %j', fcgi_request.id, req.url)
    var writer = new FCGI.writer
    writer.encoding = 'binary'

    // Begin
    writer.writeHeader({ 'version' : FCGI.constants.version
                       , 'type'    : FCGI.constants.record.FCGI_BEGIN
                       , 'recordId': fcgi_request.id
                       , 'contentLength': 8
                       , 'paddingLength': 0
                       })
    writer.writeBegin({ 'role': FCGI.constants.role.FCGI_RESPONDER
                      , 'flags': fcgi_request.keepalive
                      })
    socket.write(writer.tobuffer())

    // Parameters
    writer.writeHeader({ 'version' : FCGI.constants.version
                       , 'type'    : FCGI.constants.record.FCGI_PARAMS
                       , 'recordId': fcgi_request.id
                       , 'contentLength': FCGI.getParamLength(params)
                       , 'paddingLength': 0
                       })
    writer.writeParams(params)
    socket.write(writer.tobuffer())

    // End parameters
    writer.writeHeader({ 'version' : FCGI.constants.version
                       , 'type'    : FCGI.constants.record.FCGI_PARAMS
                       , 'recordId': fcgi_request.id
                       , 'contentLength': 0
                       , 'paddingLength': 0
                       })
    socket.write(writer.tobuffer())

    // STDIN
    writer.writeHeader({ 'version' : FCGI.constants.version
                       , 'type'    : FCGI.constants.record.FCGI_STDIN
                       , 'recordId': fcgi_request.id
                       , 'contentLength': 0
                       , 'paddingLength': 0
                       })
    socket.write(writer.tobuffer())

    // At this point the request can be considered sent to the server, and it would be dangerous to re-send without knowing
    // more details.
    console.log('Sent request %d: %s', fcgi_request.id, fcgi_request.req.url)
    fcgi_request.sent = true
  }

  function prep_socket() {
    socket.on('data', on_data)
    socket.on('end', on_end)
    process_request()
  }

  function on_end() {
    LOG.info('FastCGI socket closed')
    socket = null

    var in_flight_ids = Object.keys(requests_in_flight)
      , aborts = []

    in_flight_ids.forEach(function(in_flight_id) {
      var request_in_flight = requests_in_flight[in_flight_id]
      delete requests_in_flight[in_flight_id]

      if(request_in_flight.sent && request_in_flight.req.method != 'GET')
        aborts.push(request_in_flight)
      else {
        // This can be retried when FastCGI comes back on-line.
        if(request_in_flight.sent && request_in_flight.req.method == 'GET')
          LOG.info('Schedule retry GET request %d', request_in_flight.id)
        request_in_flight.sent = false
        pending_requests.unshift(request_in_flight)
      }
    })

    if(aborts.length) {
      LOG.warn('FastCGI socket closed with %d in-flight requests sent', aborts.length)
      aborts.forEach(function(aborted_request) {
        LOG.warn('  Req %d: %s', aborted_request.id, aborted_request.req.url)
        aborted_request.res.end()
      })
    }

    connect_fcgi(socket_path, 0, function(er, new_socket) {
      if(er)
        throw er // TODO

      LOG.info('Reconnected: %s', socket_path)
      socket = new_socket
      prep_socket()
    })
  }

  function on_data(data) {
    var parser = new FCGI.parser
    parser.bodies = null
    parser.encoding = 'binary'
    parser.onBody   = on_body
    parser.onRecord = on_record
    parser.onError  = on_error
    parser.execute(data)
  }

  function on_error(er) {
    LOG.error('Error from FastCGI parser: %s', er.message || er)
    throw er // TODO
  }

  function on_body(data, start, end) {
    data = data.slice(start, end)
    this.bodies = this.bodies || []
    this.bodies.push(data)
  }

  function on_record(record) {
    var parser = this

    LOG.info('Record %s for %s', record.header.type, record.header.recordId)

    record.bodies = parser.bodies
    parser.bodies = null
    record.body_utf8 = function() {
      return (this.bodies || [])
                 .map(function(data) { return data.toString() })
                 .join('')
    }

    var req_id = record.header.recordId
    if(req_id == 0)
      return LOG.info('Ignoring management record: %j', record)

    var request = requests_in_flight[req_id]
    if(!request)
      return LOG.error('Record for unknown request: %s\n%s', req_id, util.inspect(request))

    if(record.header.type == FCGI.constants.record.FCGI_STDERR)
      return LOG.error('Error: %s', record.body_utf8().trim())

    else if(record.header.type == FCGI.constants.record.FCGI_STDOUT) {
      if(!record.bodies)
        return

      request.stdout = request.stdout.concat(record.bodies)
      return send_stdout(request)
    }

    else if(record.header.type == FCGI.constants.record.FCGI_END) {
      request.res.end()
      LOG.info('%s %s %d', request.req.method, request.req.url, request.status)
      delete requests_in_flight[req_id]

      if(request.keepalive == FCGI.constants.keepalive.ON)
        process_request() // If there are more in the queue, get to them now.
      else
        socket.end()
    }

    else {
      LOG.info('Unknown record: %j', record)
      Object.keys(FCGI.constants.record).forEach(function(type) {
        if(record.header.type == FCGI.constants.record[type])
          LOG.info('Unknown record type: %s', type)
      })
    }
  }

  function send_stdout(request) {
    if(!request.status) {
      // Still looking for the headers and status.
      // TODO: I believe there is a bug here, if the headers aren't completely defined in the first data chunk.
      // The problem is, I don't want to get a chunk that has utf8 headers, then two newlines, then binary body.
      var parts = request.stdout[0].toString().split(/\r?\n\r?\n/)
      if(parts.length < 2)
        return LOG.warn('No complete headers in first stdout chunk') // Still waiting for all headers to arrive.

      // Headers have arrived. Convert the first stdout chunk into a .writeHead() and do not explicitly .write() it.
      request.stdout = request.stdout.slice(1)
      var headers_section = parts[0]
      var lines = headers_section.split(/\r?\n/)
        , headers = {}

      lines.forEach(function(line) {
        var match = line.match(/^(.*?):\s(.*)$/)
          , key = match && match[1].toLowerCase()

        if(key == 'status')
          request.status = parseInt(match[2]) || 200
        else
          headers[key] = match[2]
      })

      delete headers['accept-encoding']
      request.res.writeHead(request.status, headers)
    }

    while(request.stdout.length > 0) {
      var data = request.stdout.shift()
      request.res.write(data)
    }
  }
}

function connect_fcgi(socket, attempts, callback) {
  if(attempts > 5)
    return callback(new Error('Failed to connect to back-end socket'))

  // Try to connect to the back-end socket.
  var fcgid = net.connect({'path':socket})

  fcgid.on('error', on_error)
  fcgid.on('connect', on_connect)

  function on_connect() {
    LOG.info('Connected to FastCGI daemon: %s', socket)
    fcgid.removeListener('error', on_error)
    return callback(null, fcgid)
  }

  function on_error(er) {
    if(er.code == 'ECONNREFUSED') {
      var delay = 100 * Math.pow(2, attempts)
      LOG.info('Waiting %d ms to connect', delay)
      return setTimeout(function() { connect_fcgi(socket, attempts+1, callback) }, delay)
    }

    else if(er.code == 'ENOENT') {
      LOG.error('Error: No such socket: %s', socket)
      return callback(er)
    }

    else {
      LOG.error('Unknown error on FastCGI connection: %s', er.message)
      return callback(er)
    }
  }
}

//
// Utilities
//

function num_or_str(value) {
  var num_value = +value
  return isNaN(num_value) ? value : num_value
}

}