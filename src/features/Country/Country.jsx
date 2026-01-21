import { useParams } from "react-router-dom";
import { useApp } from "../../context/useApp";
import CountryItem from "./CountryItem";
import BackBtn from "../../ui/BackBtn";

function Country() {
  const { name } = useParams();
  const { data } = useApp();

  const formattedName = name.replace(/\s+/g, "").toLowerCase();

  const country = data.find(
    (c) =>
      c.name?.common
        ?.replace(/\s+/g, "")
        .toLowerCase() === formattedName
  );

  if (!country) return null;

  return (
    <div className="primaryContainer grid grid-rows-[auto_1fr]">
      <BackBtn />
      <div className="grid gap-10 md:gap-4 lg:grid-cols-2">
        <CountryItem country={country} />
      </div>
    </div>
  );
}

export default Country;
