import { useEffect, useState } from "react";
import { fetchPokemon,fetchPokemonName } from "./api";

function Header() {
  return (
    <header className="hero is-dark is-bold">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">日本大学文理学部情報科学 webプログラミングの演習3</h1>
          <p class="name">情報科学科 5420079 川口聖人</p>
        </div>
      </div>
    </header>
  );
}

function Image(props) {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image">
          <img src={props.src} alt="cute dog!" />
        </figure>
      </div>
    </div>
  );
}
function Loading() {
  return <p>Loading...</p>;
}

function Gallery(props) {
  const { urls } = props;
  if (urls == null) {
    return <Loading />;
  }
  return (
    <div className="columns is-vcentered is-multiline">
      {urls.map((url) => {
        return (
          <div key={url} className="column is-3">
            <Image src={url} />
          </div>
        );
      })}
    </div>
  );
}
function Form(props) {
  function handleSubmit(event) {
    event.preventDefault();
    const { breed } = event.target.elements;
    props.onFormSubmit(breed.value);
  }
  const pokeID=[];
  for(let i=1;i<899;i++){
    pokeID.push(i);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="field has-addons">
          <div className="control is-expanded">
            <div className="select is-fullwidth">
              <select name="breed" defaultValue="1">
                {pokeID.map((poke) => {
                return (
                  <option value={poke}>{poke}</option>
                );
              })}
              </select>
            </div>
          </div>
          <div className="control">
            <button type="submit" className="button is-dark">
              Set
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
function Resetbutton(props){
  function handleSubmit(event) {
    event.preventDefault();
    props.onFormSubmit();
  }
  return(
    <form onSubmit={handleSubmit}>
    <button type="submit" className="button is-dark">
    Reset
  </button>
  </form>
  )
}
function Main() {
  const [urls, setUrls] = useState(null);
  const urlsArray=[];
  useEffect(() => {
    fetchPokemon(25).then((url) => {
      urlsArray.push(url);
      setUrls(urlsArray);
    });
  }, []);
  function reloadImages(breed) {
    fetchPokemon(breed).then((url) => {
      setUrls([...urls,url]);
    });
  }
  function reset(){
    const urlsArray=[];
    setUrls(urlsArray);
  }
  return (
    <main>
      <div>
        <p className="container">君だけのポケモンパーティーを作ろう! 番号一覧から、好きなポケモンを選んで、Setボタンを押すとポケモンが現れるよ! Resetボタンで表示してるポケモンを消せるよ!</p>
      </div>
      <section className="section">
        <div className="container">
          <Form onFormSubmit={reloadImages} />
          <Resetbutton onFormSubmit={reset}/>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Gallery urls={urls} />
        </div>
      </section>
    </main>
  );
}
function Footer() {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>© 川口聖人 2021</p>
        <p>Pokémon and Pokémon character names are trademarks of Nintendo.</p>
        <p>このサイトはpokeAPIを使用して作成しました。</p>
      </div>
    </footer>
  );
}


function App() {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;