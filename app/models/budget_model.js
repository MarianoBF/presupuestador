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
        monthlyLimit: {
            type: Sequelize.FLOAT,
            allowNull: false,
        }

    });

    return Budget;
}