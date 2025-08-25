import React, { useEffect, useRef, useState } from 'react';
import cards_data from '../../assets/cards/Cards_data';
import { Link } from 'react-router-dom';


function TitleCards({title, category}) {

  const [apiData, setApiData] = useState([])
  const cardsRef = useRef();



  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlN2YzZWIxNDdiYjljOTc2ZTEwZWNhYmViZmM4Y2Y0ZCIsIm5iZiI6MTc1NDUzODE5Ni43OTcsInN1YiI6IjY4OTQyMGQ0N2I0ZGYyYjA0YjA3YzNjMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hNjzfPpjFoN8GecvPrF-82V5HondLy34fQqAvSlHOdw'
  }
};



  useEffect(() => {
fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));


    cardsRef.current.addEventListener('wheel', handleWheel)
  }, []);






  const handleWheel = (event) => {
      event.preventDefault();
      cardsRef.current.scrollLeft += event.deltaY;
  }


  return (
    <div className='mt-[50px] mb-[30px] titleCards'>
   
      <h2 className='mb-[10px] text-2xl font-bold'>{title ? title : 'Popular on Netflix'}</h2>
        <div className='flex gap-3 overflow-scroll scrollbar-hidden' ref={cardsRef}>
          {apiData.map((card, index) => (
            <Link to={`/player/${card.id}`} className='min-w-2xs relative'>
                <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="movie_image" key={index} className='rounded-2xl cursor-pointer'/>
                <p className='mb-[8px] absolute bottom-0.5 right-1.5'>{card.original_title}</p>
            </Link>
          ))}
        </div>
    </div>
  )
}

export default TitleCards




