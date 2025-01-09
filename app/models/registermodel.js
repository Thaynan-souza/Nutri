module.exports = {
  inserirUsuario: (connection, users, callback) => {
    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?);';
    connection.query(sql, [users.nome, users.email, users.password], callback);
  },
};
