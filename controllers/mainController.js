exports.getHome = (req, res) => {
    res.render("main");
};

exports.getAbout = (req, res) => {
    res.render("about");
};

exports.getContact = (req, res) => {
    res.render("contact");
};