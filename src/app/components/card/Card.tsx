import Link from "next/link";

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  id: string;
  animalType: string;
}

export default function Card({
  title,
  description,
  imageUrl,
  id,
  animalType,
}: CardProps) {
  return (
    <Link href={`/breed/${id}?type=${animalType}`}>
      <div className="bg-white shadow-md rounded-lg p-4 mb-4 cursor-pointer transform transition-transform duration-300 hover:scale-105">
        <div className="w-full h-48 flex items-center justify-center rounded-t-lg overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="max-w-full max-h-full object-contain"
          />
        </div>
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p>{description}</p>
      </div>
    </Link>
  );
}
