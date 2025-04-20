export function cw(middlewareFunction) {
    return async (req, res, next) => {
        try {
            await middlewareFunction(req, res, next);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Une erreur inattendu est surevenue, merci de réessayer plus tard."})
        }
    }
}