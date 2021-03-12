module.exports = (sequelize, Sequelize) => {
    const Presupuesto = sequelize.define("presupuesto", {
        descripcion: {
            type: Sequelize.STRING
        },
        rubro: {
            type: Sequelize.STRING
        },
        monto_mensual: {
            type: Sequelize.FLOAT
        }

    });

    return Presupuesto;
}