const appPackageJson = require('../package.json');/* 获取到package.json */

/* 
*   清除控制台内容
*/
function clearConsole() {
    process.stdout.write(
        process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H'
    );
}


module.exports = {
    clearConsole,
    appPackageJson
};