import { ZodError } from "zod";

export const validate = (schema) => {
    return (req, res, next) => {
        try {
            req.validData = schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {

                return res.status(400).json({
                    success: false,
                    message: "Invalid input. Please check the format."
                });
            }
            return res.status(500).json({
                success: false,
                message: "Internal server error occur"
            })
        }
    };
};