module.exports.getMarmitas = (dbConnection, callback) => {
    // Esse é o model que irá buscar todos os registros de marmitas
    console.log('Model Home]');
    const sql = 'SELECT * FROM marmitas;';
    dbConnection.query(sql, callback);  // Retorna todos os dados da tabela marmitas
}
