module.exports = (sequelize, Sequelize) => {
    const Entry = sequelize.define("entry", {
        date: {
            type: Sequelize.DATE
        },
        category: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING
        },
        amount: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
        kind: {
            type: Sequelize.STRING,
            allowNull: false,

        }
    });

    return Entry;
}