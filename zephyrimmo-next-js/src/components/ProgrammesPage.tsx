"use client";

import { useEffect, useState } from "react";
import ProgrammeCard from "./ServiceCard";

interface ProgrammesPageProps {
  programmes: Programme[];
  niveaux: string[];
}

interface Programme {
  _id: string;
  title: string;
  slug: { current: string };
  image: string;
  imageUrl: string;
  niveau?: string;
}

export default function ProgrammesPage({
  programmes,
  niveaux,
}: ProgrammesPageProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedNiveau, setSelectedNiveau] = useState("Tous");
  const [filteredProgrammes, setFilteredProgrammes] = useState<Programme[]>([]);

  useEffect(() => {
    setLoading(true);
    setFilteredProgrammes(programmes);
    setLoading(false);
  }, []);

  const handleClick = (niveau: string): void => {
    setLoading(true);
    console.log("niveau", niveau);
    setSelectedNiveau(niveau); // Set the state for the selected value
    if (niveau === "Tous") {
      setFilteredProgrammes(programmes);
    } else {
      setFilteredProgrammes(programmes.filter((p) => p.niveau === niveau));
    }
    setLoading(false);
  };

  return (
    <>
      <ul className="programmes__filtre nav nav-tabs nav-fill justify-content-center mb-4">
        {niveaux.map((niveau, i) => {
          return (
            <li key={i} className="nav-item">
              <button
                className={`nav-link ${selectedNiveau == niveau && "active"}`}
                onClick={() => handleClick(niveau)}
                disabled={loading}
              >
                {niveau}
              </button>
            </li>
          );
        })}
      </ul>
      <div className="row row-cols-1 row-cols-md-3 row-cols-xl-4">
        {programmes.length === undefined && <p>Aucun Programme disponible.</p>}
        {loading ? (
          <div>Chargement des programmes...</div> // Show loading here only
        ) : (
          filteredProgrammes
            .sort((a, b) => {
              return a.title.localeCompare(b.title, "fr", {
                sensitivity: "accent", // Ensures accents are considered in sorting
                ignorePunctuation: true, // Ignores special punctuation if any
              });
            })
            .map((programme) => {
              return (
                <ProgrammeCard key={programme._id} programme={programme} />
              );
            })
        )}
      </div>
    </>
  );
}
