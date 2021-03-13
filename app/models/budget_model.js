module.exports = (sequelize, Sequelize) => {
    const Budget = sequelize.define("budget", {
        category: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: Sequelize.STRING,
        },
        monthlyLimit: {
            type: Sequelize.FLOAT
        }

    });

    return Budget;
}