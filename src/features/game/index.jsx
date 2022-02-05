
import { Button, Card, Center, Group, Space, Text, Title } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import dame from "dame";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import TableCell from "./partials/TableCell";



export default function Game() {
	
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const notifications = useNotifications();
	
	
	
	// ***********************************************************
	// Estados
	// ***********************************************************
	
	const [table, setTable] = useState([
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0],
	]);
	const [turn, setTurn] = useState(0);
	const [status, setStatus] = useState("playing");
	const [username, setUsername] = useState("");
	const [winner, setWinner] = useState(null);
	
	
	
	// ***********************************************************
	// Efectos
	// ***********************************************************
	
	useEffect( () => {
		getPartida(searchParams.get("matchId"));
	}, [])
	
	
	
	// ***********************************************************
	// Funciones
	// ***********************************************************
	
	const getPartida = async (matchId) => {
		
		console.log( `[match] loading ${matchId}` );
			
		const {response, isError} = await dame.get(`/match/${matchId}`);
		if (isError) return notifications.showNotification({
			color: "red",
			title: "Error",
			message: response?.message ?? "Error desconocido",
		});
		
		
		setTable(response.table);
		setTurn(response.turn);
		setUsername(response.username);
		setStatus(response.status);
		setWinner(response.winner);
		
		console.log( `[match] loading ${matchId} --- OK` );
		
	};
	
	
	
	const pulsaMeteFicha = async (fila, columna) => {
		
		if (status === "ended") return notifications.showNotification({
			color: "red",
			title: "Partida terminada",
			message: "La partida ya ha terminado.",
		});
		
		
		setTurn(2);
		
		const {response, isError} = await dame.put("/match", {
			matchId: searchParams.get("matchId"),
			coords: [fila, columna],
		});
		
		if (isError) return notifications.showNotification({
			color: "red",
			title: "Error",
			message: response?.message ?? "Error desconocido",
		});
		
		
		setTable(response.table);
		setTurn(response.turn);
		setStatus(response.status);
		setWinner(response.winner);
		
	};
	
	
	
	const pulsaReset = async () => {
		
		console.log( `[match] resetting ${searchParams.get("matchId")}` );
		
		// Pido nueva partida pidiendo que sobreescriba un matchId
		const {response, isError} = await dame.post("/newMatch", {
			username: username,
			matchId: searchParams.get("matchId"),
		});
		
		if (isError) return notifications.showNotification({
			color: "red",
			title: "Error",
			message: response?.message ?? "Error desconocido",
		});
		
		getPartida(response._id);
		
		console.log( `[match] resetting ${searchParams.get("matchId")} --- OK` );
		
	};
	
	
	
	const pulsaNuevaPartida = async () => {
		
		// Pido nueva partida
		const {response, isError} = await dame.post("/newMatch", {
			username: username,
		});
		
		if (isError) return notifications.showNotification({
			color: "red",
			title: "Error",
			message: response?.message ?? "Error desconocido",
		});
		
		
		// Guardo el matchId por si cierra la pestaña y navego
		localStorage.setItem("matchId", response._id);
		navigate(`/game?matchId=${response._id}`);
		
		getPartida(response._id);
		
	};
	
	
	
	// ***********************************************************
	// Memos
	// ***********************************************************
	
	const {turnText, turnTextGradient} = useMemo( () => {
		
		switch (turn) {
			case 1: return {
				turnText: `Turno de ${username}`,
				turnTextGradient: { from: 'green', to: 'cyan', deg: 45 },
			};
			case 2: return {
				turnText: `Turno de la IA`,
				turnTextGradient: { from: 'red', to: 'yellow', deg: 45 },
			};
			default: return {
				turnText: "Cargando...",
				turnTextGradient: { from: 'blue', to: 'purple', deg: 45 },
			};
		};
		
	}, [turn, username]);
	
	
	
	// ############################################################
	// Render
	// ############################################################
	
	return (
		
		<Center
			style={{
				height: "100%",
			}}
		>
			
			<Card
				shadow="md"
			>
				
				{status === "playing" &&
					<Text
						align="center"
						variant="gradient"
						gradient={turnTextGradient}
						size="xl"
						weight="bold"
					>
						{turnText}
					</Text>
				}
				
				
				{status === "playing" && <Text align="center">Partida en curso</Text> }
				{status === "ended" && <>
					<Text align="center">Partida terminada</Text>
					
					{ winner
						? <Text align="center">Ganador: {winner}</Text>
						: <Text align="center">Empate</Text>
					}
					
					
				</>}
				
				
				<Space h="md" />
				
				
				<Group
					direction="column"
					position="center"
					style={{gap: 0}}
				>
					
					<Group style={{gap: 0}} >
						<TableCell
							status={table[0][0]}
							onClick={ () => pulsaMeteFicha(0, 0) }
						/>
						<TableCell
							status={table[0][1]}
							onClick={ () => pulsaMeteFicha(0, 1) }
						/>
						<TableCell
							status={table[0][2]}
							onClick={ () => pulsaMeteFicha(0, 2) }
						/>
					</Group>
					
					<Group style={{gap: 0}} >
						<TableCell
							status={table[1][0]}
							onClick={ () => pulsaMeteFicha(1, 0) }
						/>
						<TableCell
							status={table[1][1]}
							onClick={ () => pulsaMeteFicha(1, 1) }
						/>
						<TableCell
							status={table[1][2]}
							onClick={ () => pulsaMeteFicha(1, 2) }
						/>
					</Group>
					
					<Group style={{gap: 0}} >
						<TableCell
							status={table[2][0]}
							onClick={ () => pulsaMeteFicha(2, 0) }
						/>
						<TableCell
							status={table[2][1]}
							onClick={ () => pulsaMeteFicha(2, 1) }
						/>
						<TableCell
							status={table[2][2]}
							onClick={ () => pulsaMeteFicha(2, 2) }
						/>
					</Group>
				</Group>
				
				
				<Space h="md" />
				
				
				<Group>
					<Button
						variant="light"
						color="blue"
						style={{flexGrow: 1}}
						onClick={ () => navigate("/")}
					>
						⬅️ Atrás
					</Button>
					
					{ status === "playing" &&
						<Button
							variant="light"
							color="red"
							style={{flexGrow: 1}}
							onClick={pulsaReset}
						>
							💥 Reset
						</Button>
					}
					
					{ status === "ended" &&
						<Button
							variant="light"
							color="green"
							style={{flexGrow: 1}}
							onClick={pulsaNuevaPartida}
						>
							Nueva partida
						</Button>
					}
				</Group>
				
				
				
				
			</Card>
			
		</Center>
		
	);
	
};


