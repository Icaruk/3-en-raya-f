
import { Button, Card, Center, Group, Input, InputWrapper, SimpleGrid, Space, Text, TextInput, Title } from "@mantine/core";
import React, { useState } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import TableCell from "./partials/TableCell";



export default function Game() {
	
	const navigate = useNavigate();
	
	
	const [matrix, setMatrix] = useState([
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0],
	]);
	
	
	
	const meteFicha = (playerId, fila, columna) => {
		
		const _matrix = [...matrix];
		
		_matrix[fila][columna] = playerId;
		setMatrix(_matrix);
		
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
					Turno del jugador 1
				</Title>
				
				<Text align="center">Partida en curso</Text>
				
				
				<Space h="md" />
				
				
				
				<Group
					direction="column"
					align="center"
					style={{gap: 0}}
				>
					<Group style={{gap: 0}} >
						<TableCell
							status={matrix[0][0]}
							onClick={ () => meteFicha(1, 0, 0) }
						/>
						<TableCell
							status={matrix[0][1]}
							onClick={ () => meteFicha(1, 0, 1) }
						/>
						<TableCell
							status={matrix[0][2]}
							onClick={ () => meteFicha(1, 0, 2) }
						/>
					</Group>
					
					<Group style={{gap: 0}} >
						<TableCell
							status={matrix[1][0]}
							onClick={ () => meteFicha(1, 1, 0) }
						/>
						<TableCell
							status={matrix[1][1]}
							onClick={ () => meteFicha(1, 1, 1) }
						/>
						<TableCell
							status={matrix[1][2]}
							onClick={ () => meteFicha(1, 1, 2) }
						/>
					</Group>
					
					<Group style={{gap: 0}} >
						<TableCell
							status={matrix[2][0]}
							onClick={ () => meteFicha(1, 2, 0) }
						/>
						<TableCell
							status={matrix[2][1]}
							onClick={ () => meteFicha(1, 2, 1) }
						/>
						<TableCell
							status={matrix[2][2]}
							onClick={ () => meteFicha(1, 2, 2) }
						/>
					</Group>
				</Group>
				
			</Card>
			
		</Center>
		
	);
	
};


