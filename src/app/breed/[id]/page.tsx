"use client";

import Footer from "@/app/components/footer/Footer";
import Header from "@/app/components/header/Header";
import Loader from "@/app/components/loader/Loader";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Breed } from "../../../types/breed";

export default function BreedPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id as string;
  const type = searchParams.get("type") as "dog" | "cat";
  const [breedData, setBreedData] = useState<Breed | null>(null);

  async function fetchBreedData(breedId: string, type: "dog" | "cat") {
    const url =
      type === "dog"
        ? `https://api.thedogapi.com/v1/breeds/${breedId}`
        : `https://api.thecatapi.com/v1/breeds/${breedId}`;
    const response = await fetch(url, {
      headers: {
        "x-api-key":
          type === "dog"
            ? "live_Uvl44OFxXjeFOEev0u34VzBP8egsPraF4XVJtGlznlWb5kFxzzCm9TUE7X2qUN43"
            : "live_NvkfhovbR7lHyb1AX8RqaD4Cj0osw0f1ntGosDGzRnZFSKrkBvnQBHAPCrTfTHE9",
      },
    });
    const data: Breed = await response.json();
    setBreedData(data);
  }

  useEffect(() => {
    if (id && type) {
      fetchBreedData(id, type);
    }
  }, [id, type]);

  if (!breedData) {
    return <Loader />;
  }

  const imageUrl =
    breedData.image?.url ||
    `https://cdn2.${type === "dog" ? "thedogapi" : "thecatapi"}.com/images/${
      breedData.reference_image_id
    }.jpg`;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-100 p-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-blue-600">
              {breedData.name}
            </h1>
          </div>
          <div className="w-full h-96 flex items-center justify-center rounded-lg overflow-hidden mb-4 p-4 bg-white shadow-lg">
            <img
              src={imageUrl}
              alt={breedData.name}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="mb-2">
              <strong>Weight:</strong> {breedData.weight?.imperial} lbs (
              {breedData.weight?.metric} kg)
            </p>

            {type === "dog" ? (
              <>
                <p className="mb-2">
                  <strong>Height:</strong> {breedData.height?.imperial} inches (
                  {breedData.height?.metric} cm)
                </p>
                <p className="mb-2">
                  <strong>Bred For:</strong> {breedData.bred_for}
                </p>
                <p className="mb-2">
                  <strong>Breed Group:</strong> {breedData.breed_group}
                </p>
              </>
            ) : (
              <>
                <p className="mb-2">
                  <strong>Description:</strong> {breedData.description}
                </p>

                <p className="mb-2">
                  <strong>Adaptability:</strong> {breedData.adaptability}/5
                </p>
                <p className="mb-2">
                  <strong>Affection Level:</strong> {breedData.affection_level}
                  /5
                </p>
                <p className="mb-2">
                  <strong>Child Friendly:</strong> {breedData.child_friendly}/5
                </p>
                <p className="mb-2">
                  <strong>Dog Friendly:</strong> {breedData.dog_friendly}/5
                </p>
                <p className="mb-2">
                  <strong>Energy Level:</strong> {breedData.energy_level}/5
                </p>
                <p className="mb-2">
                  <strong>Grooming:</strong> {breedData.grooming}/5
                </p>
                <p className="mb-2">
                  <strong>Health Issues:</strong> {breedData.health_issues}/5
                </p>
                <p className="mb-2">
                  <strong>Intelligence:</strong> {breedData.intelligence}/5
                </p>
                <p className="mb-2">
                  <strong>Shedding Level:</strong> {breedData.shedding_level}/5
                </p>
                <p className="mb-2">
                  <strong>Social Needs:</strong> {breedData.social_needs}/5
                </p>
                <p className="mb-2">
                  <strong>Stranger Friendly:</strong>{" "}
                  {breedData.stranger_friendly}/5
                </p>
                <p className="mb-2">
                  <strong>Vetstreet URL:</strong>{" "}
                  <a
                    href={breedData.vetstreet_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Vetstreet
                  </a>
                </p>
                <p className="mb-2">
                  <strong>VCA Hospitals URL:</strong>{" "}
                  <a
                    href={breedData.vcahospitals_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    VCA Hospitals
                  </a>
                </p>
                <p className="mb-2">
                  <strong>More Info:</strong>{" "}
                  <a
                    href={breedData.wikipedia_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Wikipedia
                  </a>
                </p>
              </>
            )}
            {breedData.country_code && (
              <p className="mb-2">
                <strong>Country Code:</strong> {breedData.country_code}
              </p>
            )}
            {breedData.origin && (
              <p className="mb-2">
                <strong>Origin:</strong> {breedData.origin}
              </p>
            )}
            <p className="mb-2">
              <strong>Life Span:</strong> {breedData.life_span}
            </p>
            <p className="mb-2">
              <strong>Temperament:</strong> {breedData.temperament}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
