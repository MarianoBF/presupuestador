module.exports = (sequelize, Sequelize) => {
    const Gasto = sequelize.define("gasto", {
        rubro: {
            type: Sequelize.STRING
        },
        descripcion: {
            type: Sequelize.STRING
        },
        pagado: {
            type: Sequelize.BOOLEAN
        }

    });

    return Gasto;
}