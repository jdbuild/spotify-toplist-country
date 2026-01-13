

function GenreDropdown() {
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
    <select className="bg-gray-800 text-white border border-gray-600 rounded p-2">
      <option value="">Select Genre</option>
      {genres.map((genre) => (
        <option key={genre} value={genre}>
          {genre}
        </option>
      ))}
    </select>
  );
}

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



    console.log(countries.length);

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

export default function MyApp() {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-4">
      

      <div className="mt-8">
        <CountryDropdown />
        <GenreDropdown />
      </div>


      //add a component that lists the seledted country and genre below the dropdowns.      
      <div className="mt-8">
        <h2 className="text-2xl font-bold"> Country and Genre</h2>
        <p className="mt-4">Country: [Selected Con]</p>
        <p className="mt-2">Genre: [Selected gen]</p>
      </div>
    </div>
  );
}