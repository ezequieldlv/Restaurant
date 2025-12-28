const logger = (req, _, next) => {
    const fecha = new Date().toISOString();
    const { ip, method, path } = req;
    const logString = `[${fecha}]${ip}|${method}|${path}`;
    console.log(logString);

    next();
};

export default logger;