
/*
 * GET users listing.
 */

exports.list = function(req, res){
    res.render('account.ejs', { username: req.session.username, title: 'Your Account' });
};
