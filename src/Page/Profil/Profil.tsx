import './Profil.css';
import { useState } from 'react';

export default function Profil() {
    // Récupère et parse les données du localStorage
    let datauser = localStorage.getItem("datauser");
    let initialData: any = {};
    if (datauser) {
        try {
            const parsed = JSON.parse(datauser);
            initialData = parsed.data || {};
        } catch (e) {
            initialData = {};
        }
    }

    // State pour les valeurs éditées
    const [editData, setEditData] = useState<any>(initialData);
    

    // Handler pour modifier un champ
    const handleChange = async (key: string, value: string) => {
        setEditData({ ...editData, [key]: value });
        console.log(`Champ ${key} modifié : ${value}`, "edidata",editData);
    }

  const updateUser = async () => {
    const API_URL = import.meta.env.VITE_API_URL;
      let data =  await fetch(`${API_URL}/users/updateuser`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token") || "",
            },
            body: JSON.stringify({editData}),
    })

    let reponse = await data.json();
    if (reponse.status === true) {
        console.log("Utilisateur mis à jour avec succès");
        // Mettre à jour le localStorage avec les nouvelles données
        localStorage.setItem("datauser", JSON.stringify({ data: editData }));
        setEditData(editData); // Mettre à jour l'état avec les nouvelles données
    }
  }

    return (
        <div className="profil-container">
            <h2>Profil utilisateur</h2>
            <ul>
                {Object.entries(editData)
                  .map(([key, value]) => (
                    <li key={key}>
                        <strong>{key} :</strong>
                        <input
                            className='inputProfil'
                            type="text"
                            value={typeof value === 'string' || typeof value === 'number' ? value : ''}
                            onChange={e => handleChange(key, e.target.value)}
                        />
                    </li>
                ))}
                   <button className='buttonProfil' onClick={updateUser}>Mettre à jour</button>

            </ul>
        </div>
    );
}