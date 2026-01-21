import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

function AppProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState(null);

  // Fetch countries
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,flags,region,subregion,capital,population,cca3,tld,currencies,languages"
        );
        const json = await res.json();
        setData(json);
        setFilteredCountries(json);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Search
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    setFilteredCountries(
      data.filter((c) =>
        c.name?.common?.toLowerCase().includes(query)
      )
    );
  };

  // Region filter
  const handleSelectChange = (option) => {
    setSelectedRegion(option?.value || null);
  };

  const displayedCountries = (searchQuery ? filteredCountries : data).filter(
    (c) => (selectedRegion ? c.region === selectedRegion : true)
  );

  // Country details
  const { name } = useParams();
  const formattedName = name?.replace(/\s+/g, "").toLowerCase();

  const country = data.find(
    (c) =>
      c.name?.common
        ?.replace(/\s+/g, "")
        .toLowerCase() === formattedName
  );

  const COUNTRY_NAME = country?.name?.common || "";
  const COUNTRY_OFFICIAL_NAME = country?.name?.official || "";
  const COUNTRY_FLAG = country?.flags?.svg || "";
  const COUNTRY_POPULATION = country?.population?.toLocaleString() || "N/A";
  const COUNTRY_REGION = country?.region || "N/A";
  const COUNTRY_SUB_REGION = country?.subregion || "N/A";
  const COUNTRY_CAPITAL = country?.capital?.join(", ") || "N/A";
  const COUNTRY_TLD = country?.tld?.join(" | ") || "N/A";

  const COUNTRY_CURRENCIES = country?.currencies
    ? Object.entries(country.currencies)
        .map(([code, cur]) => `${cur.name} (${code})`)
        .join(", ")
    : "N/A";

  const COUNTRY_LANGUAGES = country?.languages
    ? Object.values(country.languages).join(", ")
    : "N/A";

  return (
    <AppContext.Provider
      value={{
        isLoading,
        data,
        displayedCountries,
        handleSearchChange,
        handleSelectChange,
        searchQuery,
        selectedRegion,

        COUNTRY_NAME,
        COUNTRY_OFFICIAL_NAME,
        COUNTRY_FLAG,
        COUNTRY_POPULATION,
        COUNTRY_REGION,
        COUNTRY_SUB_REGION,
        COUNTRY_CAPITAL,
        COUNTRY_TLD,
        COUNTRY_CURRENCIES,
        COUNTRY_LANGUAGES,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppProvider };
