import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPokemonDetails } from "../api/api";
import { PokemonDetail } from "../types";
import "../styles/DetailPage.css";
import PokemonDetailsCard from "../components/PokemonDetailsCard";
import { FiArrowLeft as ArrowLeftIcon } from "react-icons/fi";

const DetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetail | null>(
    null
  );

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        if (!id) return;
        const data = await getPokemonDetails(id);
        setPokemonDetails(data);
      } catch (err) {
        setError("Failed to load Pokemon details.");
      } finally {
        setLoading(false);
      }
    };
    fetchPokemonDetails();
  }, [id]);

  if (loading)
    return (
      <div className="message-container">
        <h1>Loading...</h1>
      </div>
    );
  if (error)
    return (
      <div className="message-container">
        <h1>{error}</h1>
      </div>
    );
  if (!pokemonDetails)
    return (
      <div className="message-container">
        <h1>No data found.</h1>
      </div>
    );
  return (
    <div className="container">
      <Link className="back-button" to="/">
        {ArrowLeftIcon({ size: 18, style: { marginRight: "8px" } })}
        Back to list
      </Link>

      <div className="info-container">
        <div className="info-image-container">
          <img
            src={pokemonDetails.sprites.front_default}
            alt={`Front picture of the Pokemon ${pokemonDetails.name}`}
          />
        </div>

        <PokemonDetailsCard pokemon={pokemonDetails} />
        <div className="info-image-container">
          <img
            src={pokemonDetails.sprites.back_default}
            alt={`Back picture of the Pokemon ${pokemonDetails.name}`}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
