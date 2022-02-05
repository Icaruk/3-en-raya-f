import dame from "dame";



/**
 * Devuelve el top jugadores con más victorias
 * @param {string} [username] Si se quiere buscar los datos de un solo jugador.
 * @returns {Promise<dame.Response>}
 */
export default function fetchRanking(username) {
	
	let url = "/ranking";
	if (username) url += `/${username}`;
	
	return dame.get(url);
	
};
