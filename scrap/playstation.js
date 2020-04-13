import cheerio from 'cheerio';
import fetch from 'node-fetch';

export const Trophies = async (url) => {
  const data = await fetch(url);
  const $ = cheerio.load(await data.text());


  const trophies = $('div.box.no-top-border table.zebra tr');

  const dataSet = trophies.get().map(trophy => {
    const title = $(trophy).find('.title').text();
    const picture = $(trophy).find('img').prop('src');

    let rarity = $(trophy).find('.rarity nobr').text().split('%')[0];
    rarity = parseFloat(rarity) / 100;

    const type = $(trophy).find('td:last-child img').prop('title');
    const date = $(trophy).find('.typo-top-date nobr').text();
    const hour = $(trophy).find('.typo-bottom-date nobr').text();

    let win = undefined;
    if (date) {
      win = `${date} - ${hour}`;
    }

    return {
      title, picture, rarity, type, win
    }
  });

  return dataSet;
}


export const Games = async (url) => {
  const data = await fetch(url);
  const $ = cheerio.load(await data.text());

  const games = $('#gamesTable tr');

  const dataSet = games.get().map(async game => {
    const title = $(game).find('.title').text();
    const picture = $(game).find('img').prop('src');
    const platform = $(game).find('.platform').text();
    const percentege = $(game).find('.progress-bar span').text();
    let href = $(game).find('a.title').prop('href');
    href = `https://psnprofiles.com${href}`;

    const trophies = await Trophies(href);

    return {
      title, platform, picture, href, percentege, trophies
    }
  });

  const results = await Promise.all(dataSet);
  return results;
}