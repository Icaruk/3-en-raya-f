
import { Card, Center, Group, Space, Text, Title } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import dame from "dame";
import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import TableCell from "./partials/TableCell";



export default function Game() {
	
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
	const [username, setUsername] = useState("");
	
	
	
	// ***********************************************************
	// Efectos
	// ***********************************************************
	
	useEffect( () => {
		(async() => {
			
			const {response, isError} = await dame.get(`/match/${searchParams.get("matchId")}`);
			if (isError) return notifications.showNotification({
				color: "red",
				title: "Error",
				message: response?.message ?? "Error desconocido",
			});
			
			
			setTable(response.table);
			setTurn(response.turn);
			setUsername(response.username);
			
		})();
	}, [])
	
	
	
	// ***********************************************************
	// Funciones
	// ***********************************************************
	
	const pulsaMeteFicha = async (fila, columna) => {
		
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
		
	};
	
	
	
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
				turnText: "Esperando jugador",
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
				
				
				<Text
					align="center"
					variant="gradient"
					gradient={turnTextGradient}
					size="xl"
					weight="bold"
				>
					{turnText}
				</Text>
				
				
				<Text align="center">{turn === 0 ? "Cargando..." : "Partida en curso"}</Text>
				
				
				<Space h="md" />
				
				
				
				<Group
					direction="column"
					align="center"
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
				
			</Card>
			
		</Center>
		
	);
	
};


