import dame from "dame";
import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";



const Home = lazy(() => import("./features/home"));
const Game = lazy(() => import("./features/game"));



export default function App() {
	
	useEffect( () => {
		
		// Meto la URL de la API en dame para hacer futuras peticiones sin necesidad de especificarla
		dame.baseUrl = import.meta.env.VITE_API_URL;
		
	}, []);
	
	
	
	return (
		<div
			style={{
				width: "100vw",
				height: "100vh",
			}}
		>
			<Suspense
				fallback={
					<p>Cargando...</p>
				}
			>
				
				<Routes>
					
					<Route path="/" element={<Home />} />
					<Route path="/game" element={<Game />} />
					
				</Routes>
				
			</Suspense>
		</div>
	);
	
};
