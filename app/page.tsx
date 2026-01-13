

"use client";

import { useState } from 'react';
import { logToServer } from './actions';


function CountryDropdown() {
  const countries = [
    "Argentina",
    "Austria",
    "Australia",
    "Belgium",
    "Brazil",
    "Canada",
    "Chile",
    "China",
    "Colombia",
    "Czech Republic",
    "Denmark",
    "Egypt",
    "Finland",
    "France",
    "Germany",
    "Greece",
    "India",
    "Indonesia",
    "Ireland",
    "Israel",
    "Italy",
    "Japan",
    "Kenya",
    "Malaysia",
    "Mexico",
    "Morocco",
    "Netherlands",
    "New Zealand",
    "Nigeria",
    "Norway",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Russia",
    "Saudi Arabia",
    "Singapore",
    "South Africa",
    "South Korea",
    "Spain",
    "Sweden",
    "Switzerland",
    "Thailand",
    "Turkey",
    "UAE",
    "UK",
    "USA",
    "Venezuela",
    "Vietnam"
    ];



    //console.log(countries.length);    



  return (
    <select className="bg-gray-800 text-white border border-gray-600 rounded p-2">
      <option value="">Select Country</option>
      {countries.map((country) => (
        <option key={country} value={country}>
          {country}
        </option>
      ))}
    </select>
  );
}


// 1. Das Interface: Der "Vertrag" zwischen den Komponenten
interface GenreDropdownProps {
  selectedGenre: string;                // Welcher Wert ist gerade aktiv?
  onGenreChange: (value: string) => void; // Die Funktion, die den State oben ändert
}



function GenreDropdown({ selectedGenre, onGenreChange }: GenreDropdownProps) {
  const genres = [
    "Pop",
    "Rock",
    "Hip-Hop",
    "Jazz",
    "Classical",
    "Electronic",
    "Country",
    "Reggae",
    "Blues",
    "R&B",
    "Metal"
  ];



  return (
    <select value={selectedGenre} className="bg-gray-800 text-white border border-gray-600 rounded p-2" onChange={(e) => {
    const val = e.target.value;
    //setGenre(val);                  // 1. State im Client
    onGenreChange(e.target.value);
    console.log(val);               // 2. Log im Browser
    logToServer(val);               // 3. Log am Server (Server Action)
  }}>
      <option value="">Select Genre</option>
      {genres.map((genre) => (
        <option key={genre} value={genre}>
          {genre}
        </option>
      ))}
    </select>
  );
}



export default function MyApp() {
  
    const [genre, setGenre] = useState("");
  
  return (
    <div className="bg-gray-900 text-white min-h-screen p-4">
      

      <div className="mt-8">
        <CountryDropdown />
        <GenreDropdown selectedGenre={genre} onGenreChange={(val) => setGenre(val)} />
      </div>


      //add a component that lists the seledted country and genre below the dropdowns.      
      <div className="mt-8">
        <h2 className="text-2xl font-bold"> App Country and Genre</h2>
        <p className="mt-4">Country: [Selected Con]</p>
        <p className="mt-2">Genre: [Selected gen]{genre}</p>
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded" onClick={() => {
          setGenre("Rock");
      }}>
          Log Selected Genre to Server
        </button>
      </div>
    </div>
  );
}