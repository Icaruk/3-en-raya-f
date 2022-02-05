
import { Button, Card, Center, Group, List, Space, Table, Title } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchRanking from "./actions/fetchRanking";



export default function Ranking() {
	
	const navigate = useNavigate();
	const notifications = useNotifications();
	
	
	
	// ***********************************************************
	// Estados
	// ***********************************************************
	
	const [ranking, setRanking] = useState([]);
	
	
	
	// ***********************************************************
	// Efectos
	// ***********************************************************
	
	useEffect( () => {
		
		(async() => {
			
			const {response, isError} = await fetchRanking();
			
			if (isError) return notifications.showNotification({
				color: "red",
				title: "Error",
				message: response?.message ?? "Error desconocido",
			});
			
			console.log( `response (${typeof response}):`, response );
			
			setRanking(response);
			
		})();
		
	}, []);
	
	
	
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
				
				<Title
					align="center"
					color="primary"
				>
					Ranking
				</Title>
				
				
				<Space h="md" />
				
				
				<Button
					variant="light"
					color="blue"
					fullWidth
					onClick={ () => navigate("/")}
				>
					⬅️ Atrás
				</Button>
				
				
				<Space h="md" />
				
				
				<Table>
					<thead>
						<tr>
							<th>Top</th>
							<th>Name</th>
							<th>Wins</th>
						</tr>
					</thead>
					
					<tbody>
						{ ranking.map( (_x, _idx) => {
							
							let icon;
							
							switch (_idx) {
								case 0: icon = "👑"; break;
								case 1: icon = "🥈"; break;
								case 2: icon = "🥉"; break;
								default: icon = "";
							};
							
							
							return (
								<tr
									key={_x.username}
								>
									<td>{_idx + 1} {icon} </td>
									<td>{_x.username}</td>
									<td>{_x.wins}</td>
								</tr>
							);
						})}
					</tbody>		
				</Table>
				
				
			</Card>
		
		</Center>
		
	);
	
};


