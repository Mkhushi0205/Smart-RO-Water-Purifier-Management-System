// check whether the user is logged in
const requireAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect("/login");
    }
    next();
};

// check whether the logged-in user has the required role
const requireRole = (requiredRole) => {
    return (req, res, next) => {

        // user is not logged in
        if (!req.user) {
            return res.redirect("/login");
        }

        // normalize actual role from database
        const actualRole = String(req.user.role || "")
            .trim()
            .toLowerCase();

        // normalize required role
        const expectedRole = String(requiredRole || "")
            .trim()
            .toLowerCase();

        console.log(
            "ROLE CHECK:", req.user.email,
            "ACTUAL:", actualRole,
            "EXPECTED:", expectedRole
        );

        // invalid/missing role
        if (!expectedRole ) {
            console.error("ROLE CHECK ERROR: Required role was not provided.");
            return res.status(500).render("error", {
                title: "Server Error",
                message: "Required user role was not configured."
            });
        }

        // user does not have permission
        if (actualRole !== expectedRole) {
            console.log(
                "ACCESS DENIED:", req.user.email,
                "ROLE:", actualRole
            );
            return res.status(403).render("error", {
                title: "Access Denied",
                message: "You do not have permission to access this page."
            });
        }

        // role is correct
        next();
    };
};

module.exports = {
    requireAuth,
    requireRole
};