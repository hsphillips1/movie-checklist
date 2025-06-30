import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MovieChecklist.css';

const movies = [
  { title: "Parasite", year: 2019 },
  { title: "Mulholland Drive", year: 2001 },
  { title: "There Will Be Blood", year: 2007 },
  { title: "In the Mood For Love", year: 2000 },
  { title: "Moonlight", year: 2016 },
  { title: "No Country For Old Men", year: 2007 },
  { title: "Eternal Sunshine of the Spotless Mind", year: 2004 },
  { title: "Get Out", year: 2017 },
  { title: "Spirited Away", year: 2001 },
  { title: "The Social Network", year: 2010 },
  { title: "Mad Max: Fury Road", year: 2015 },
  { title: "The Zone of Interest", year: 2023 },
  { title: "Children of Men", year: 2006 },
  { title: "Inglourious Basterds", year: 2009 },
  { title: "City of God", year: 2002 },
  { title: "Crouching Tiger, Hidden Dragon", year: 2000 },
  { title: "Brokeback Mountain", year: 2005 },
  { title: "Y Tu Mama Tambien", year: 2001 },
  { title: "Zodiac", year: 2007 },
  { title: "The Wolf of Wall Street", year: 2013 },
  { title: "The Royal Tenenbaums", year: 2001 },
  { title: "The Grand Budapest Hotel", year: 2014 },
  { title: "Boyhood", year: 2014 },
  { title: "Her", year: 2013 },
  { title: "Phantom Thread", year: 2017 },
  { title: "Anatomy of a Fall", year: 2023 },
  { title: "Adaptation", year: 2002 },
  { title: "The Dark Knight", year: 2008 },
  { title: "Arrival", year: 2016 },
  { title: "Lost in Translation", year: 2003 },
  { title: "The Departed", year: 2006 },
  { title: "Bridesmaids", year: 2011 },
  { title: "A Separation", year: 2011 },
  { title: "WALL-E", year: 2008 },
  { title: "A Prophet", year: 2009 },
  { title: "A Serious Man", year: 2009 },
  { title: "Call Me By Your Name", year: 2017 },
  { title: "Portrait of A Lady on Fire", year: 2019 },
  { title: "Lady Bird", year: 2017 },
  { title: "Yi Yi", year: 2000 },
  { title: "Amelie", year: 2001 },
  { title: "The Master", year: 2012 },
  { title: "Oldboy", year: 2003 },
  { title: "Once Upon A Time in Hollywood", year: 2019, imdbID: "tt7131622" },
  { title: "Moneyball", year: 2011 },
  { title: "ROMA", year: 2018 },
  { title: "Almost Famous", year: 2000 },
  { title: "The Lives of Others", year: 2006 },
  { title: "Before Sunset", year: 2004 },
  { title: "Up", year: 2009 },
  { title: "12 Years A Slave", year: 2013 },
  { title: "The Favourite", year: 2018 },
  { title: "Borat", year: 2006 },
  { title: "Pan’s Labyrinth", year: 2006 },
  { title: "Inception", year: 2010 },
  { title: "Punch-Drunk Love", year: 2002 },
  { title: "Best in Show", year: 2000 },
  { title: "Uncut Gems", year: 2019 },
  { title: "Toni Erdmann", year: 2016 },
  { title: "Whiplash", year: 2014 },
  { title: "Kill Bill Vol. 1", year: 2003 },
  { title: "Memento", year: 2000 },
  { title: "Little Miss Sunshine", year: 2006 },
  { title: "Gone Girl", year: 2014 },
  { title: "Oppenheimer", year: 2023 },
  { title: "Spotlight", year: 2015 },
  { title: "TAR", year: 2022, imdbID: "tt14444726" },
  { title: "The Hurt Locker", year: 2008 },
  { title: "Under The Skin", year: 2013 },
  { title: "Let The Right One In", year: 2008 },
  { title: "Ocean’s Eleven", year: 2001 },
  { title: "Carol", year: 2015 },
  { title: "Ratatouille", year: 2007 },
  { title: "The Florida Project", year: 2017 },
  { title: "Amour", year: 2012 },
  { title: "O Brother, Where Art Thou", year: 2000 },
  { title: "Everything Everywhere All At Once", year: 2022 },
  { title: "Aftersun", year: 2022 },
  { title: "Tree of Life", year: 2011 },
  { title: "Volver", year: 2006 },
  { title: "Black Swan", year: 2010 },
  { title: "The Act of Killing", year: 2012 },
  { title: "Inside Llewyn Davis", year: 2013 },
  { title: "Melancholia", year: 2011 },
  { title: "Anchorman", year: 2004 },
  { title: "Past Lives", year: 2023 },
  { title: "The Fellowship of the Ring", year: 2001 },
  { title: "The Gleaners and I", year: 2000, imdbID: "tt0247380" },
  { title: "Interstellar", year: 2014 },
  { title: "Frances Ha", year: 2012 },
  { title: "Fish Tank", year: 2009 },
  { title: "Gladiator", year: 2000 },
  { title: "Michael Clayton", year: 2007 },
  { title: "Minority Report", year: 2002 },
  { title: "The Worst Person in the World", year: 2021 },
  { title: "Black Panther", year: 2018 },
  { title: "Gravity", year: 2013 },
  { title: "Grizzly Man", year: 2005 },
  { title: "Memories of Murder", year: 2003 },
  { title: "Superbad", year: 2007 }
];

export default function MovieChecklist() {
  const [movieData, setMovieData] = useState([]);
  const [expandedMovie, setExpandedMovie] = useState(null);
  const [selectedMood, setSelectedMood] = useState('');
  const [showUnseenOnly, setShowUnseenOnly] = useState(false);
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const savedStates = JSON.parse(localStorage.getItem('seenMovies') || '{}');
      const savedCache = JSON.parse(localStorage.getItem('movieCache') || '{}');
      const data = await Promise.all(
        movies.map(async (movie, i) => {
          const cacheKey = `${movie.title} (${movie.year})`;
          if (savedCache[cacheKey]) {
            return {
              position: i + 1,
              genre: savedCache[cacheKey].Genre || '',
              title: movie.title,
              seen: savedStates[movie.title] || false,
              ...savedCache[cacheKey],
            };
          }
          try {
            const queryParam = movie.imdbID ? `i=${movie.imdbID}` : `t=${encodeURIComponent(movie.title)}&y=${movie.year}`;
            const res = await axios.get(`https://www.omdbapi.com/?apikey=ba7c3c0f&${queryParam}`);
            savedCache[cacheKey] = res.data;
            localStorage.setItem('movieCache', JSON.stringify(savedCache));
            return {
              position: i + 1,
              title: movie.title,
              seen: savedStates[movie.title] || false,
              ...res.data,
            };
          } catch (err) {
            return {
              position: i + 1,
              title: movie.title,
              seen: savedStates[movie.title] || false,
              Error: 'Data not found'
            };
          }
        })
      );
      setMovieData(data);
    }
    fetchData();
  }, []);

  const toggleSeen = (index) => {
    const updated = [...movieData];
    updated[index].seen = !updated[index].seen;
    setMovieData(updated);

    const newStates = updated.reduce((acc, m) => {
      acc[m.title] = m.seen;
      return acc;
    }, {});
    localStorage.setItem('seenMovies', JSON.stringify(newStates));
  };

  const moodMap = {
    Fun: ['Comedy', 'Adventure', 'Animation', 'Family'],
    Intense: ['Thriller', 'Crime', 'Mystery', 'Action', 'Drama'],
    Emotional: ['Drama', 'Romance', 'Biography'],
    Artsy: ['Fantasy', 'Biography', 'Music', 'Musical', 'History'],
    Dark: ['Horror', 'War', 'History', 'Documentary', 'Thriller'],
    Uplifting: ['Family', 'Sport', 'Talk-Show', 'Comedy'],
    ThoughtProvoking: ['Sci-Fi', 'Mystery', 'Drama', 'History'],
    SlowBurn: ['Biography', 'History', 'Drama', 'Romance']
  };
  const moodFiltered = selectedMood ? movieData.filter(movie => {
    const genres = (movie.Genre || '').split(', ').map(g => g.trim());
    return genres.some(g => moodMap[selectedMood]?.includes(g));
  }) : movieData;
  const filteredMovies = (showUnseenOnly ? moodFiltered.filter(movie => !movie.seen) : moodFiltered)
    .sort((a, b) => sortAsc ? a.position - b.position : b.position - a.position);
  const seenCount = movieData.filter(m => m.seen).length;

  return (
    <div className="checklist-container">
      <h1>🎥 Carmen and Henry and Dart Watch Movies</h1>
      <div className="filter-toggles">
        <label className="cute-toggle">
          <input type="checkbox" checked={showUnseenOnly} onChange={() => setShowUnseenOnly(!showUnseenOnly)} />
          🎭 Unseen Only
        </label>
        <label className="cute-toggle">
          <input type="checkbox" checked={sortAsc} onChange={() => setSortAsc(!sortAsc)} />
          ⬆️ Ascending Order
        </label>
        <select className="cute-toggle" value={selectedMood} onChange={e => setSelectedMood(e.target.value)}>
          <option value="">🌀 All Moods</option>
          {Object.keys(moodMap).map(mood => (
            <option key={mood} value={mood}>{mood}</option>
          ))}
        </select>
      </div>

      {expandedMovie !== null && (
        <div className="modal-overlay" onClick={() => setExpandedMovie(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setExpandedMovie(null)}>&times;</button>
            {(() => {
              const movie = filteredMovies[expandedMovie];
              return (
                <>
                  <h2>{movie.Title || movie.title}</h2>
                  <p><strong>Actors:</strong> {movie.Actors || 'N/A'}</p>
                  <p><strong>Director:</strong> {movie.Director || 'N/A'}</p>
                  <p><strong>Runtime:</strong> {movie.Runtime || 'N/A'}</p>
                  <p><strong>Rated:</strong> {movie.Rated || 'N/A'}</p>
                  <p><strong>Language:</strong> {movie.Language || 'N/A'}</p>
                  <p><strong>Awards:</strong> {movie.Awards || 'N/A'}</p>
                  <p><strong>IMDb:</strong> <a href={`https://www.imdb.com/title/${movie.imdbID}`} target="_blank" rel="noopener noreferrer">View on IMDb</a></p>
                  <p><strong>Similar Movies:</strong> {movieData
                    .filter((m, idx) => m.Title !== movie.Title && (
                      (m.Director && m.Director === movie.Director) ||
                      (m.Genre && movie.Genre && m.Genre.split(', ').some(g => m.Genre.includes(g)))
                    ))
                    .sort((a, b) => (a.Director === movie.Director ? -1 : 1))
                    .slice(0, 3)
                    .map((m, j, arr) => (
                      <span key={j} className="similar-title">{m.Title || m.title}{j < arr.length - 1 ? ', ' : ''}</span>
                    ))}</p>
                </>
              );
            })()}
          </div>
        </div>
      )}

      <div className="movie-grid">
        {filteredMovies.map((movie, i) => (
          <div key={i} className={`movie-card ${movie.seen ? 'seen' : ''} ${expandedMovie === i ? 'expanded' : ''}`} onClick={() => setExpandedMovie(expandedMovie === i ? null : i)}>
            {movie.Poster && movie.Poster !== "N/A" ? (
              <img src={movie.Poster} alt={movie.Title} className="poster" />
            ) : (
              <div className="poster placeholder">No Poster</div>
            )}
            <div className="info">
              <div className="position">#{movie.position}</div>
              <h2>{movie.Title || movie.title}</h2>
              <p className="release">Released: {movie.Released || "N/A"}</p>
              <p className="plot">{movie.Plot && movie.Plot !== "N/A" ? movie.Plot : "No description available."}</p>
              <div className="genres">{(movie.Genre || movie.genre || 'Unknown').split(', ').map((g, idx) => (
                <span key={idx} className="genre-pill">{g}</span>
              ))}</div>
              
                  <label className="seen-toggle">
                <input type="checkbox" checked={movie.seen} onChange={e => { e.stopPropagation(); toggleSeen(i); }} />
                Seen
              </label>
              
            </div>
          </div>
        ))}
      </div>
      <div className="progress-float">
        ✅ {seenCount} / {movies.length} seen
      </div>
    </div>
  );
}
