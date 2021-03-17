module.exports = {
    HOST: "us-cdbr-east-03.cleardb.com",
    USER: "b645e36d1fa6b2",
    PASSWORD: "1886b1f9",
    PORT: 8500,
    DB: "heroku_6331741a1772542",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }
}