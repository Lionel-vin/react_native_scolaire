import { getUser } from './visiteur.js';
let user=await getUser(4);
////let authentifie=await authentifier("cleroy","motdepasse");
//
console.log(user);