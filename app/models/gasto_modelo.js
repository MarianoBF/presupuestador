module.exports = (sequelize, Sequelize) => {
    const Gasto = sequelize.define("gasto", {
        descripcion: {
            type: Sequelize.STRING
        },
        rubro: {
            type: Sequelize.STRING
        },
        monto: {
            type: Sequelize.FLOAT
        }

    });

    return Gasto;
}