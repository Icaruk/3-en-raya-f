import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";



const Home = lazy(() => import("./features/home"));
const Game = lazy(() => import("./features/game"));



export default function App() {
	
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
