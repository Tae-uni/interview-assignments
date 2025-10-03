export const validate = (schema) => {
    return (req, res, next) => {
        try {
            req.validData = schema.parse(req.body);
            next()
        } catch (error) {
            return res.status(400).json({ message: error.errors });
        }
    };
};