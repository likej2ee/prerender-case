module.exports = {
    beforeSend: function(req, res, next) {
        if (!req.prerender.documentHTML) {
            return next();
        }

        var reg = /<img[^>]*?data-original="([^"]*?)"[^>]*?>/img;
        req.prerender.documentHTML = req.prerender.documentHTML.toString().replace(reg, '<img src="$1" alt=""/>');
        req.prerender.documentHTML = req.prerender.documentHTML.toString().replace(/lazyload/img, '');
        next();
    }
};
