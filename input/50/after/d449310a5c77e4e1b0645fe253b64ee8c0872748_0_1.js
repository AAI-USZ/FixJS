function(row) {
    console.log(row);
    conn.write(JSON.stringify(row));
  }