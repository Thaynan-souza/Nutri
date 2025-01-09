module.exports = {
    ensureAuthenticated: (req, res, next) => {
        if (req.session && req.session.user) {
            // Usuário autenticado
            return next();
        }
        // Redireciona para login se não autenticado
        res.redirect('/login');
    },
};
