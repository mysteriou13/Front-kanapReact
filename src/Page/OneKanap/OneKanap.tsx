import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Kanap from "../../Component/Kanap/Kanap";

export default function OneKanap() {
  const { id } = useParams<{ id: string }>();
  const API_URL = import.meta.env.VITE_API_URL;

  const [oneKanap, setOneKanap] = useState<any>(null);

  useEffect(() => {
    const OneProduct = async () => {
      let product = await fetch(`${API_URL}/product/displayOneproduct/${id}`);
      let reponse = await product.json();
      console.log("reponse oneKanap");
      setOneKanap(reponse.data); // ou reponse selon la structure de ta réponse
    };
    OneProduct();
  }, []);

  if (!oneKanap) return <div>Chargement...</div>;

  return (
    <div>
    {oneKanap ? (
      <Kanap item={oneKanap} key={oneKanap._id} mode="one" />
    ) : (
      <div>Chargement...</div>
    )}
  </div>
  );
}