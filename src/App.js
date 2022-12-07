// import logo from './logo.svg';
import './App.css';
import { useEffect, useState, useRef } from "react";
import AwesomeDebouncePromise from 'awesome-debounce-promise'

let id = 1;

function App() {
  const [currentListId, setCurrentListId] = useState(() => {
    let savedCurrentListId = localStorage.getItem('currentListId');
    if (savedCurrentListId) {
      return JSON.parse(savedCurrentListId);
    } else {
      return 1;
    }
  })

  const [currentList, setCurrentList] = useState(() => {
    let savedList = localStorage.getItem('list-' + currentListId);
    if (savedList) {
      return JSON.parse(savedList);
    } else {
      return {
        id: 1,
        name: 'New List', 
        items: []
      };
    }
  });

  const [tmdbConfig, setTmdbConfig] = useState({});
  const [localeOptions, setLocaleOptions] = useState([]);
  const savedLocale = localStorage.getItem('locale');
  const [locale, setLocale] = useState(
    savedLocale ? savedLocale : 'CA'
  );
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInput = useRef(null);

  useEffect(() => {
    localStorage.setItem(`list-${currentList.id}`, JSON.stringify(currentList));
  }, [currentList]);

  useEffect(() => {
    window.localStorage.setItem('locale', locale);
  }, [locale]);

  useEffect(() => {
    const fetchConfigData = async () => {
      const response = await fetch(
        'https://api.themoviedb.org/3/configuration?api_key=251ba64a492fa521304db43e5fa3d2ad',
      );
      const data = await response.json();
      setTmdbConfig(data);
    };
    const fetchProviderData = async () => {
      const response = await fetch(
        'https://api.themoviedb.org/3/watch/providers/regions?api_key=251ba64a492fa521304db43e5fa3d2ad&language=en-US',
      );
      const data = await response.json();
      setLocaleOptions(data.results);
    };
 
    fetchConfigData();
    fetchProviderData();
  }, []);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    let title = event.target.title.value;
    event.target.title.value = "";
    searchMovies(title, currentList.items.length);
  }

  const searchMovies = (title, rank) => {
    saveMovie({
      id: id++,
      title,
      rank
    })
  }

  const saveMovie = (movieData, rank) => {
    let newList = {...currentList};
    newList.items.push(movieData);
    setCurrentList(newList);
  }

  async function handleSearchInputChange(event) {
    // setPreviewSelected(null);
    if (event.target.value === '') {
      setSearchResults([]);
      return;
    }
    const response = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=251ba64a492fa521304db43e5fa3d2ad&language=en-US&query=${event.target.value}&page=1&include_adult=false`);
    const data = await response.json();
    setSearchResults(data.results);
  }

  const handleSearchInputChangeDebounced = AwesomeDebouncePromise(
    handleSearchInputChange, 
    250
  )

  const handleSelectSearchResult = (movieData) => {
    setSearchResults([]);
    searchInput.current.value = '';
    saveMovie(movieData);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>ScreenRank</h1>
      </header>
      <main>
        <article>
          <header>
            <h2>{currentList.name}</h2>
          </header>
          <ol className="movie-list">
            {currentList.items.map((item, index) => (
              <li className="movie-list__item" key={index}>{item.title}</li>
            ))}
            <li className="movie-search">
              <input autoFocus placeholder="Search Movie Titles..." ref={searchInput} onChange={handleSearchInputChangeDebounced} onFocus={(event) => {event.target.setSelectionRange(0, event.target.value.length)}} type="text"></input>
              <ul>{searchResults && searchResults.map((item, index) => {
                return <div key={index} onClick={(event) => handleSelectSearchResult(item)}>{item.title}</div>
              })}</ul>
            </li>
          </ol>
          <button onClick={() => { setCurrentList({...currentList, items: []}) }}>Clear</button>
        </article>
      </main>
    </div>
  );
}

export default App;
