// shipitfile.js

const shipitDeploy = require('shipit-deploy');

module.exports = shipit => {
    shipitDeploy(shipit);


    shipit.initConfig({
        default: {
            deployTo: '/srv/http/solasistim/shl/parislondon',
            repositoryUrl: 'https://github.com/amoe/parislondon.git',
        },
        staging: {
            servers: 'amoe@visarend.solasistim.net',
        },
    });
}
