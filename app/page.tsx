"use client";

import React, { useState } from 'react';
import { logToServer } from './actions';

import Profile from './profile.js';



function CountryDropdown() {

  const countries = ["Argentina", "Austria", "Australia", "Belgium", "Brazil", "Canada", "Chile", "China", "Colombia", "Czech Republic", "Denmark", "Egypt", "Finland", "France", "Germany", "Greece", "India", "Indonesia", "Ireland", "Israel", "Italy", "Japan", "Kenya", "Malaysia", "Mexico", "Morocco", "Netherlands", "New Zealand", "Nigeria", "Norway", "Peru", "Philippines", "Poland", "Portugal", "Russia", "Saudi Arabia", "Singapore", "South Africa", "South Korea", "Spain", "Sweden", "Switzerland", "Thailand", "Turkey", "UAE", "UK", "USA", "Venezuela", "Vietnam"];

  //console.log(countries.length);

  const buildOutput =
    <select className="bg-gray-800 text-white border border-gray-600 rounded p-2">
      <option value="">Select Country</option>
      {countries.map((country) => (
        <option key={country} value={country}>
          {country}
        </option>
      ))}
    </select>;





  return (
    <>
      {buildOutput}
    </>
  );
}


// 1. Das Interface: Der "Vertrag" zwischen den Komponenten
interface GenreDropdownProps {
  selectedGenre: string;// Welcher Wert ist gerade aktiv?
  onGenreChange: (value: string) => void; // Die Funktion, die den State oben ändert
}


interface FilterTextChangeProps {
  filterText: string;
  onFilterTextChange: (value: string) => void;
}

interface FilterStockOnlyChangeProps {
  inStockOnly: boolean;
  onStockOnlyChange: (value: boolean) => void;
}


type SearchBarProps =
  FilterTextChangeProps &
  FilterStockOnlyChangeProps;




function GenreDropdown({ selectedGenre, onGenreChange }: GenreDropdownProps) {
  const genres = ["Pop", "Rock", "Hip-Hop", "Jazz", "Classical", "Electronic", "Country", "Reggae", "Blues", "R&B", "Metal"];

  return (
    <select value={selectedGenre} className="bg-gray-800 text-white border border-gray-600 rounded p-2" onChange={(e) => {
      const val = e.target.value;
      //setGenre(val);  // 1. State im Client
      onGenreChange(e.target.value);
      console.log(val);   // 2. Log im Browser
      logToServer(val);   // 3. Log am Server (Server Action)
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



interface Product {
  category: string;
  price: string;
  stocked: boolean;
  name: string;
}

function ProductRow({ product }: { product: Product }) {
  return (
    <tr>
      <td>{product.stocked ? product.name : <span style={{ color: 'red' }}>{product.name}</span>}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductCategoryRow({ category }: { category: string }) {
  return (
    <tr>
      <th colSpan={2}>{category}</th>
    </tr>
  );
}





function ProductTable({
  products,
  filterText,
  onFilterTextChange,
  inStockOnly,
  onStockOnlyChange
}: { products: Product[] } & FilterTextChangeProps & FilterStockOnlyChangeProps) {

  const rows: React.ReactElement[] = [];

  let lastCategory: string | null = null;




  products.forEach((product) => {

    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }


    if (product.category != lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
      lastCategory = product.category;
    }
    rows.push(<ProductRow product={product} key={product.name} />);
  });




  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );

}

function SearchBar(props: SearchBarProps) {


  return (
    <form>
      <input type="text" placeholder="Search..." value={props.filterText} onChange={(e) => props.onFilterTextChange(e.target.value)} />
      <p>
        <input type="checkbox" checked={props.inStockOnly} onChange={(e) => props.onStockOnlyChange(e.target.checked)} />  Only show products in stock
      </p>
    </form>
  );
}


function FilterableProductTable({ products }: { products: Product[] }) {


  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);


  const searchProps = {
    filterText,
    onFilterTextChange: setFilterText,
    inStockOnly,
    onStockOnlyChange: setInStockOnly
  };


  return (
    <>
      <SearchBar filterText={filterText} onFilterTextChange={setFilterText} inStockOnly={inStockOnly} onStockOnlyChange={setInStockOnly} />

      <SearchBar {...searchProps} />
      <ProductTable products={products} filterText={filterText} onFilterTextChange={setFilterText} inStockOnly={inStockOnly} onStockOnlyChange={setInStockOnly} />
      <div>is checked: {inStockOnly.toString()} text: {filterText}</div>
    </>

  );
}



export default function MyApp() {

  const PRODUCTS = [
    { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
    { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
    { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
    { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
    { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
    { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
  ];


  const [genre, setGenre] = useState("");

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4">


      <div className="mt-8">
        <CountryDropdown />
        <GenreDropdown selectedGenre={genre} onGenreChange={(val) => setGenre(val)} />
        <GenreDropdown selectedGenre={genre} onGenreChange={setGenre} />
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

      <FilterableProductTable products={PRODUCTS} />

      <Profile />
      <Profile />
      <Profile />
    </div>
  );
}