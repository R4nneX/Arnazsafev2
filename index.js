const fetch = require('node-fetch');
const moment = require('moment');
const chalk = require('chalk');
const rs = require('readline-sync');
const chalkRainbow = require('chalk-rainbow')

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const GoStumble = (auth) => new Promise((resolve, reject) => {

  fetch('http://kitkabackend.eastus.cloudapp.azure.com:5010/round/finishv2/3', {
    method: 'GET',
    headers: {
      'authorization': auth
    }
  })
    .then(res => res.text())
    .then(data => {
      resolve(data);
    })
    .catch(err => {
      reject(err);
    });

});

(async () => {

  console.log(chalk.green(`
 ____           ____  __ __                  _  __
   / __ )__  __   / __ \/ // / ____  ____  ___ | |/ /
  / __  / / / /  / /_/ / // /_/ __ \/ __ \/ _ \|   /
 / /_/ / /_/ /  / _, _/__  __/ / / / / / /  __/   |
/_____/\__, /  /_/ |_|  /_/ /_/ /_/_/ /_/\___/_/|_|
      /____/
                                                  
      THANKS : R4nneX & Safwankun                                                                                

By : ${('R4nneX & Safwankun')}
`));

  const auth = rs.question(chalk.cyan('Masuki Auth Mas😘 : '));
  console.log('');

  while (true) {

    const result = await GoStumble(auth);
    if (!result) {

      console.log(chalk.cyan(`\r[ ${moment().format('HH:mm:ss')} ] Auth Eror !`));

    } else if (result.includes('User')) {

      const data = JSON.parse(result);
      const username = data.User.Username;
      const country = data.User.Country;
      const trophy = data.User.SkillRating;
      const crown = data.User.Crowns;

      console.log(chalk.blue(`\r
-  [${moment().format('HH:mm:ss')}]  -
>  ${(`ID By Safwankun : ${country}`)}
>  ${(`USER By Safwankun : ${username}`)}  
>  ${(`TROPHY By Safwankun : ${trophy}`)}  
>  ${(`CROWN By Safwankun : ${crown}`)}
>  ${(`STATUS : ⚡Berhasil⚡`)}`));
      await sleep(6500);

    } else if (result == 'BANNED') {
      console.log(chalk.bgRed(`Mampus Kena Banned🥴😫 `));
      break;
    }
  }

})();
