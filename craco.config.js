const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': '#FB9902',
                            '@text-color': '#091534',
                            '@black': '#091534',
                            '@white': '#F7E9D4',
                            // '@background-color-light': '#F7E9D4',
                            '@heading-color': '#091534',
                            '@text-color-secondary': '#091534',
                            '@icon-color': '#FB9902',
                            // '@layout-body-background': '#F7E9D4'
                        },
                        javascriptEnabled: true,
                        //FB9902 amarillo botones
                        //091534 azul letras
                        //F7E9D4 crema fondo
                    },
                },
            },
        },
    ],
};