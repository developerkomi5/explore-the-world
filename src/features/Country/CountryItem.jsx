import Box, { Label } from "../../ui/Box";

function CountryItem({ country }) {
  const COUNTRY_NAME = country?.name?.common;
  const COUNTRY_OFFICIAL_NAME = country?.name?.official;
  const COUNTRY_FLAG = country?.flags?.svg;
  const COUNTRY_POPULATION = country?.population?.toLocaleString();
  const COUNTRY_REGION = country?.region;
  const COUNTRY_SUB_REGION = country?.subregion;
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
    <>
      <img
        className="w-full px-2 mx-auto lg:mx-0 max-h-[250px] sm:h-full sm:p-0 sm:w-4/5"
        src={COUNTRY_FLAG}
        alt={COUNTRY_NAME}
      />

      <div className="py-5 mb-20 sm:mb-0 h-fit">
        <h1 className="text-3xl pb-7 font-800">{COUNTRY_NAME}</h1>

        <div className="flex flex-col gap-10 sm:flex-row">
          <div className="countryDetails">
            <Box><Label bold>Native Name:</Label><Label lighter>{COUNTRY_OFFICIAL_NAME}</Label></Box>
            <Box><Label bold>Population:</Label><Label lighter>{COUNTRY_POPULATION}</Label></Box>
            <Box><Label bold>Region:</Label><Label lighter>{COUNTRY_REGION}</Label></Box>
            <Box><Label bold>Sub Region:</Label><Label lighter>{COUNTRY_SUB_REGION}</Label></Box>
            <Box><Label bold>Capital:</Label><Label lighter>{COUNTRY_CAPITAL}</Label></Box>
          </div>

          <div className="countryDetails">
            <Box><Label bold>Top Level Domain:</Label><Label lighter>{COUNTRY_TLD}</Label></Box>
            <Box><Label bold>Currencies:</Label><Label lighter>{COUNTRY_CURRENCIES}</Label></Box>
            <Box><Label bold>Languages:</Label><Label lighter>{COUNTRY_LANGUAGES}</Label></Box>
          </div>
        </div>
      </div>
    </>
  );
}

export default CountryItem;
