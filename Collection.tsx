import React = require('react');
import { Manga, MangaCollection } from './Model/MangaCollection';

export class Collection extends React.Component<
  {},
  { collection: MangaCollection }
> {
  constructor(props) {
    super(props);
    this.state = {
      collection: null,
    };
  }

  componentDidMount() {
    fetch('https://kitsu.io/api/edge/anime')
      .then((res) => res.json())
      .then((jsonResponse) => {
        let mangas = jsonResponse.data.map((data) => {
          return {
            id: data.id,
            titre: data.attributes?.canonicalTitle,
            anneesortie: new Date(data.attributes?.startDate),
            description: data.attributes?.description,
          } as Manga;
        });
        let newCollection = new MangaCollection(mangas);
        console.log(newCollection);
        this.setState({ collection: newCollection });
      });
  }

  render() {
    return (
      <div>
        <h1>Bienvenue à vous dans ma librairie !</h1>
        <p>Commencons en affichant ma liste de mangas :)</p>
        <div>
          {this.state.collection?.mangas &&
            this.state.collection.mangas.map((manga) => (
              <div>{manga.titre}</div>
            ))}
        </div>
      </div>
    );
  }
}
