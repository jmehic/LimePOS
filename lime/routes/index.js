
/*
 * GET home page.
 */

exports.index = function(req, res, next){
    res.render('index.ejs', { title: 'Lime - Home', error: req.query.error });
};
