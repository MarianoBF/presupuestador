module.exports = (sequelize, Sequelize) => {
    const Budget = sequelize.define("budget", {
        category: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        limit: {
            type: Sequelize.FLOAT,
            allowNull: false,
        }

    });

    return Budget;
}