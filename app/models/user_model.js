module.exports = (sequelize, Sequelize) => {
    const Entry = sequelize.define("user", {
        alta: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        password: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
    });

    return User;
}