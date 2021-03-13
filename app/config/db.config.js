module.exports = {
    HOST: "localhost",
    USER: "prueba",
    PASSWORD: "123pass",
    PORT: 8500,
    DB: "presu1",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }
}