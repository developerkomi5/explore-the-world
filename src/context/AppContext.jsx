import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const AppContext = createContext();

const API_URL =
  "https://restcountries.com/v3.1/all?fields=name,flags,region,subregion,capital,population,cca3,tld,currencies,languages";

function AppProvider({ children }) {
  // ===== GLOBAL STATES =====
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState(null);

  // ===== LOADING HANDLER =====
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // ===== FETCH COUNTRIES =====
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(API_URL);

        if (!res.ok) {
          throw new Error("Failed to fetch countries");
        }

        const result = await res.json();
        setData(result);
        setFilteredCountries(result);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  // ===== SEARCH FILTER =====
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = data.filter((country) =>
      country.name.common.toLowerCase().includes(query)
    );

    setFilteredCountries(filtered);
  };

  // ===== REGION FILTER =====
  const handleSelectChange = (selectedOption) => {
    setSelectedRegion(selectedOption?.value || null);
  };

  // ===== FINAL DISPLAYED COUNTRIES =====
  const displayedCountries = (
    searchQuery.length > 0 ? filteredCountries : data
  ).filter((country) =>
    selectedRegion ? country.region === selectedRegion : true
  );

  // ===== COUNTRY DETAILS PAGE =====
  const { name } = useParams();

  const formattedName = name
    ?.replace(/\s+/g, "")
    .toLowerCase();

  const CountryObject = data.find(
    (country) =>
      country.name.common.replace(/\s+/g, "").toLowerCase() === formattedName
  );

  // ===== COUNTRY DETAILS SAFELY EXTRACTED =====
  const COUNTRY_NAME = CountryObject?.name?.common || "";
  const COUNTRY_OFFICIAL_NAME = CountryObject?.name?.official || "";
  const COUNTRY_FLAG = CountryObject?.flags?.svg || "";
  const COUNTRY_POPULATION = CountryObject?.population?.toLocaleString() || "";
  const COUNTRY_REGION = CountryObject?.region || "";
  const COUNTRY_SUB_REGION = CountryObject?.subregion || "";
  const COUNTRY_CAPITAL = CountryObject?.capital?.join(", ") || "No Capital";
  const COUNTRY_TLD = CountryObject?.tld?.join(" | ") || "";

  const COUNTRY_CURRENCIES = CountryObject?.currencies
    ? Object.entries(CountryObject.currencies)
        .map(([code, currency]) => `${currency.name} (${code})`)
        .join(", ")
    : "";

  const COUNTRY_LANGUAGES = CountryObject?.languages
    ? Object.values(CountryObject.languages).join(", ")
    : "";

  return (
    <AppContext.Provider
      value={{
        isLoading,
        data,
        displayedCountries,
        handleSearchChange,
        searchQuery,
        selectedRegion,
        handleSelectChange,

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
