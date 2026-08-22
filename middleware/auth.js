const User  = require("../models/User");

// load the currently logged-in user on every request
const loadUser = async (req, res, next) => {

    try {
         res.locals.user = null;

        // no logged-in user
        if (!req.session || !req.session.userId) {
            return next();
        }

        const user = await User.findById(req.session.userId).select("-password");

        if(!user) {
            req.session.destroy(() => {});
            return next();
        }

        req.user = user;
        res.locals.user = user;

        next();

    } catch (error) {
        console.error("Error loading user:", error);
        res.locals.user = null;
        next();
    }
};


// check whether the user is logged-in
const requireAuth = (req, res, next) => {
    
    if (!req.user) {
        return res.redirect("/login");
    }

    next();
};


// check whether the logged-in user the required role
const requireRole = (role) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.redirect("/login");
        }

        if (req.user.role !== role) {
            return res.status(403).render("error", {
                message: "Access denied."
            });
        }

        next();
    };
};

module.exports = {
    loadUser,
    requireRole
};