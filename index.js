import cheerio from 'cheerio';
import fetch from 'node-fetch';
import { Games } from './scrap/playstation'

const init = async () => {
  // const data = await fetch('https://psnprofiles.com/leonardoalemax');
  // const $ = cheerio.load(await data.text());


  // const games = $('#gamesTable tr');

  // const dataSet = games.get().map(game => {
  //   const title = $(game).find('.title').text();
  //   const picture = $(game).find('img').prop('src');
  //   const platform = $(game).find('.platform').text();
  //   const percentege = $(game).find('.progress-bar span').text();

  //   return {
  //     title, platform, picture, percentege
  //   }
  // });


  // https://psnprofiles.com/leonardoalemax
  // console.log(dataSet);
  Games('https://psnprofiles.com/leonardoalemax')
    .then((data) => {
      console.log(data);
    })
}

init();