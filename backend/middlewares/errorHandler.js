const ERROR_HANDLER = {
    CastError: (res) => res.status(400).send({ error: "el request no tiene el formato correcto" }),

    SequelizeValidationError: (res, error) => res.status(400).send({
        error: error.message
    }),

    JsonWebTokenError: (res) => res.status(401).json({ error: "no existe el token o es inválido" }),

    TokenExpirerError: (res) => res.status(401).json({ error: "el token ha expirado" }),

    SequelizeError: (res, error) => res.status(500).send({
        error: error.message
    }),

    SequelizeDatabaseError: (res, error) => res.status(500).send({
        error: error.message
    }),

    SyntaxError: (res, err) => res.status(500).send(err.message),

    "Validation error": (res, err) => res.status(500).send(err.name),

    cannotGet: (res, err) => res.status(500).json({ error: "No se encontro lo solicitado" }),

    loginError: (res, err) => res.status(500).json({ error: "Los datos ingresados son incorrectos" }),

    userExists: (res, err) => res.status(500).json({ error: "El usuario ya se encuentra registrado" }),

    defaultError: (res, err) => res.status(500).end("Server Internal Error")
};

export default (error, request, response, next) => {
    console.log("Error Handler");
    if (process.env.LOG === "true") {
        console.error(error.name);
        console.log(error.message);
    }
    const handler = ERROR_HANDLER[error.name] || ERROR_HANDLER[error.message] || ERROR_HANDLER.defaultError;
    handler(response, error);
};