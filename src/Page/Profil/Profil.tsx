
import './Profil.css';

export default function Profil() {
    // Récupère et parse les données du localStorage
    let datauser = localStorage.getItem("datauser");
    let data: any = {};
    if (datauser) {
        try {
            const parsed = JSON.parse(datauser);
            data = parsed.data ;
        } catch (e) {
            data = {};
        }
    }

    return (
        <div className="profil-container">
            <h2>Profil utilisateur</h2>
            <ul>
                {Object.entries(data)
                  .filter(([key]) => key !== "_id" && key !== "id " && key !== "__v")
                  .map(([key, value]) => (
                    <li key={key}>
                        <strong>{key} :</strong> {String(value)}
                    </li>
                ))}
            </ul>
        </div>
    );
}