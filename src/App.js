import React from 'react';
import {useEffect, useState} from 'react';
import MovieCard from './MovieCard';

import './App.css';
import SearchIcon from './search.svg';
// 9eb546a5
const API_URL = 'http://www.omdbapi.com/?apikey=9eb546a5';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovie = async (title) =>{
        const APIresponse = await fetch(`${API_URL}&s=${title}`);
        const data = await APIresponse.json();
        setMovies(data.Search);
    }
    useEffect(() => {
        searchMovie(searchTerm)
    },[]);
    return (
        <>
        <div className="app">
            <h1>Movie Land</h1>

            <div className='search'>
                <input 
                placeholder='Search for movies' 
                value = {searchTerm} 
                onChange={(e)=> setSearchTerm(e.target.value)}
                />

                <img 
                src = {SearchIcon} 
                alt='Search'
                onClick={()=>searchMovie(searchTerm)}
                ></img>
            </div>

            {
                movies?.length > 0 ? 
                (
                    <div className='container'>
                        {
                            movies.map((movie) => <MovieCard movie = {movie}/> )
                        }
                    </div>
                ) : 
                (
                    <div className='empty'>
                        <h2> No Movies Found</h2>
                    </div>
                )
            }
        </div>
        </>
    );
}

export default App;