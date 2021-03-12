module.exports = {
    HOST: "localhost",
    USER: "prueba",
    PASSWORD: "123pass",
    PORT: 8500,
    DB: "presup",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }
}