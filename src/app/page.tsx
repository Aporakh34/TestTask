"use client";

import { useEffect, useState } from "react";
import Card from "./components/card/Card";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import { Cat, Dog } from "../types/animals";
import Loader from "./components/loader/Loader";

export default function Home() {
  const [dogData, setDogData] = useState<Dog[]>([]);
  const [catData, setCatData] = useState<Cat[]>([]);
  const [animalType, setAnimalType] = useState<"dog" | "cat" | "all">("all");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const dogResponse = await fetch("https://api.thedogapi.com/v1/breeds", {
          headers: {
            "x-api-key":
              "live_Uvl44OFxXjeFOEev0u34VzBP8egsPraF4XVJtGlznlWb5kFxzzCm9TUE7X2qUN43",
          },
        });
        const catResponse = await fetch("https://api.thecatapi.com/v1/breeds", {
          headers: {
            "x-api-key":
              "live_NvkfhovbR7lHyb1AX8RqaD4Cj0osw0f1ntGosDGzRnZFSKrkBvnQBHAPCrTfTHE9",
          },
        });

        const dogData: Dog[] = await dogResponse.json();
        const catData: Cat[] = await catResponse.json();

        setDogData(dogData);
        setCatData(catData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  const filteredDogData = dogData.filter((dog) =>
    dog.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const filteredCatData = catData.filter((cat) =>
    cat.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-100 p-4">
        <div className="container mx-auto mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded mb-4 w-full"
          />
          <button
            onClick={() => setAnimalType("all")}
            className={`p-2 border rounded mr-2 ${
              animalType === "all" ? "bg-blue-500 text-white" : ""
            }`}
          >
            All
          </button>
          <button
            onClick={() => setAnimalType("dog")}
            className={`p-2 border rounded mr-2 ${
              animalType === "dog" ? "bg-blue-500 text-white" : ""
            }`}
          >
            Dogs
          </button>
          <button
            onClick={() => setAnimalType("cat")}
            className={`p-2 border rounded ${
              animalType === "cat" ? "bg-blue-500 text-white" : ""
            }`}
          >
            Cats
          </button>
        </div>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {(animalType === "all" || animalType === "dog") &&
            filteredDogData.map(
              (dog) =>
                dog.image?.url && (
                  <Card
                    key={dog.id}
                    id={dog.id}
                    title={dog.name}
                    description={dog.breed_group || "No breed group"}
                    imageUrl={dog.image.url}
                    animalType="dog"
                  />
                )
            )}
          {(animalType === "all" || animalType === "cat") &&
            filteredCatData.map(
              (cat) =>
                cat.image?.url && (
                  <Card
                    key={cat.id}
                    id={cat.id}
                    title={cat.name}
                    description={cat.origin || "No origin"}
                    imageUrl={cat.image.url}
                    animalType="cat"
                  />
                )
            )}
        </div>
      </main>
      <Footer />
    </>
  );
}
