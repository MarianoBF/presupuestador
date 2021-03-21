module.exports = {
    HOST: "localhost",
    USER: "test_user",
    PASSWORD: "password123Q",
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