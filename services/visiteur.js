export async function getUser(leta) {
    const url = "https://5529.s5.nuage-peda.fr/mobileAPI/API/visiteur.php";
    
    try {
        const reponse = await fetch(url + "?login=" + leta);
        
        if (!reponse.ok) {
            throw new Error(`Statut de réponse : ${reponse.status}`);
        }
        
        const data = await reponse.json();
        return data;

    } catch (erreur) {
        console.error(erreur.message);
    }
}
