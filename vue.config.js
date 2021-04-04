module.exports = {
    pluginOptions: {
        electronBuilder: {
            preload: 'src/preload.js',
            // // Or, for multiple preload files:
            // preload: { preload: 'src/preload.js', otherPreload: 'src/preload2.js' }
            builderOptions: {
                "productName":"南院课表",
                "appId": "lmc.electron.syllabus",
                "icon": "src/assets/application.png",
                "copyright":"Copyright © 2021 linmaochun"
            },
        }
    }
}