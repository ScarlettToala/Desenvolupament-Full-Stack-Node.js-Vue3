export default function sessionMiddleware(req, res, next) {
    if (!req.session) {
        req.session = {};
    }
    next();
}
