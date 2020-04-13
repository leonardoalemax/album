import { Games } from './scrap/playstation';
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';


const adapter = new FileSync('playsation.db.json')
const db = low(adapter)

db.defaults({ games: [] }).write()

const init = async () => {
  const games = await Games('https://psnprofiles.com/leonardoalemax');

  games.map(game => {
    db.get('games')
      .push({ ...game })
      .write()
  });

}

init();