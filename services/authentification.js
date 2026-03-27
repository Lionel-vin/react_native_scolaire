export async function authentifier(login,mdp){
    const url="https://5529.s5.nuage-peda.fr/mobileAPI/API/authentification.php"
    try{
        const response=await fetch(url,{
            method:"POST",
            body:JSON.stringify({
                "login":login,
                "mdp":mdp
            })
        });
        if (!response.ok) {
            throw new Error(`Statut de réponse : ${reponse.status}`);
        }
         const data = await response.json();
        return data;
    }catch(erreur){
         console.error(erreur.message);
    }

}
