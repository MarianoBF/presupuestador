module.exports = {
    HOST: "localhost",
    USER: "testUser",
    PASSWORD: "123pass",
    PORT: 8080,
    DB: "budgetTestdb",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }
}