
import { Button, Card, Center, Group, Input, InputWrapper, SimpleGrid, Space, TextInput, Title } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import dame from "dame";
import React, { useRef } from "react";
import { useNavigate, useRoutes } from "react-router-dom";



export default function Home() {
	
	const navigate = useNavigate();
	const notifications = useNotifications();
	
	const refInput = useRef(null);
	
	
	
	const pulsaJugarContraIA = async () => {
		
		const username = refInput.current.value;
		
		
		// Validación
		if (!/^[a-zA-Z]{3,16}$/.test(username)) return notifications.showNotification({
			color: "red",
			title: "Nombre de usuario inválido",
			message: "El nombre de usuario debe tener entre 3 y 16 caracteres alfanuméricos.",
		});
		
		
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
		
	};
	
	
	
	return (
		
		<Center
			style={{
				height: "100%",
			}}
		>
			
			<Card
				shadow="md"
			>
				
				<Title
					align="center"
					color="primary"
				>
					3 en raya
				</Title>
				
				
				<Space h="md" />
				
				
				<TextInput
					ref={refInput}
					label="Nombre de usuario"
					description="Se usará para el ránking al terminar la partida"
				/>
				
				
				<Space h="md" />
				
				
				<Group
					direction="column"
					position="center"
					style={{
						gap: 6,
					}}
				>	
					<Button
						fullWidth
						variant="gradient"
						onClick={pulsaJugarContraIA}
					>
						Jugar contra IA
					</Button>
					
					<Button
						fullWidth
						variant="light"
						onClick={ () => navigate("/ranking") }
					>
						🏅 Ranking
					</Button>
				</Group>
				
			</Card>
		
		</Center>
		
	);
	
};


