const User  = require("../models/User");

// load the currently logged-in user on every request
const loadUser = async (req, res, next) => {

    try {
        res.locals.user = null;
        // req.user = null;

        // no logged-in user
        if (!req.session || !req.session.userId) {
            return next();
        }

        const user = await User.findById(req.session.userId)
            .select("-password");

        if(!user) {
            req.session.destroy(() => {});
            return next();
        }

        req.user = user;
        res.locals.user = user;

        // // normalize role
        // user.role = String(user.role || "")
        //     .trim()
        //     .toLowerCase();

        // req.user = user;
        // res.locals.user = user;

        console.log(
            "LOAD USER :", user.email,
            "ROLE :", JSON.stringify(user.role)
        );
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
const requireRole = (requiredRole) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.redirect("/login");
        }

        const actualRole = String(req.user.role || "")
            .trim()
            .toLowerCase();

        const expectedRole = String(requiredRole)
            .trim()
            .toLowerCase();

        console.log(
            "ROLE CHECK :", req.user.email,
            "ACTUAL :", actualRole,
            "EXPECTED :", expectedRole
        );

        if (actualRole !== expectedRole) {
            return res.status(403).render("error", {
                title: "Access Denied",
                message: "Yor do not have permission to access this page."
            });
        }

        next();
    };
};

module.exports = {
    loadUser,
    requireAuth,
    requireRole
};