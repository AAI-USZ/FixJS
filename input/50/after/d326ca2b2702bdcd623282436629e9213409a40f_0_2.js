function prep_socket() {
    socket.on('data', on_data)
    socket.on('end', on_end)
    process_request()
  }