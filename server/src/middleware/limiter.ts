import rateLimit from "express-rate-limit";

const limiter = rateLimit({
    windowMs: 1000, //second
    max: 5,
    message: {
        err: "Too many requests, please try again later.",
    },
    standardHeaders: true,
    legacyHeaders: false,
});

export default limiter;
