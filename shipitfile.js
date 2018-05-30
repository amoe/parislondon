// shipitfile.js

const shipitDeploy = require('shipit-deploy');

module.exports = shipit => {
    shipitDeploy(shipit);

    shipit.blTask('build', () => {
        console.log('wtf');
        const dir = shipit.releasePath;
        console.log("dir is %o", dir);

        return shipit.local("echo " + dir);
    });


    // the way that shipit works, you need to handle 'fetched' event, created by
    // 'deploy' and build the output, and probably also setting 'dirToCopy'
    shipit.on('update', () => {
        return shipit.start('build');
    });

    shipit.initConfig({
        default: {
            deployTo: '/srv/http/solasistim/shl/parislondon',
            repositoryUrl: 'https://github.com/amoe/parislondon.git',
            dirToCopy: 'dist'
        },
        staging: {
            servers: 'amoe@visarend.solasistim.net',
        },
    });
}
