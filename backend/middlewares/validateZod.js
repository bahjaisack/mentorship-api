import { object, success } from "zod";

export const validate = (Schema) => (req, res, next) => {
    const result = Schema.safeParse(req.body);
    console.log("result: ", result);

    if(!result.success){
        const formatted = result.error.format();
        console.log("formatted ", formatted);
        return res.status(400).json({
            success: false,
            message: "Validation fauled",
            errors: Object.keys(formatted).map(field=>({
                field,
                message: formatted[field]?._errors?.[0] || "invalid input"
            }))

        })
    }
    next();
}