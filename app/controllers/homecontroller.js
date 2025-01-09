const dbConnection = require('../../config/dbConnection');
const { getMarmitas } = require('../models/homemodel');

module.exports.home = (app, req, res) => {
    const dbConn = dbConnection();
    getMarmitas(dbConn, (error, marmitas) => {
        console.log('[Home controller]');
        if (error) {
            console.log('Erro: ' + error);
        }
        else {
            console.log('Funciona!');
            res.render('home.ejs', { marmitas });  // Passa os dados das marmitas para a view
        }
    });
}
