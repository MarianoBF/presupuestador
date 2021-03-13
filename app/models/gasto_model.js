module.exports = (sequelize, Sequelize) => {
    const Gasto = sequelize.define("gasto", {
        date: {
            type: Sequelize.DATE
        },
        category: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        ammount: {
            type: Sequelize.FLOAT
        },
        kind: {
            type: Sequelize.STRING
        }
    });

    return Gasto;
}