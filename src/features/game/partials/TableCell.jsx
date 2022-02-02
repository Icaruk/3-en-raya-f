
import { Center } from "@mantine/core";
import React, { useMemo } from "react";



export default function TableCell({
	status = 0,
	onClick = () => {},
}) {
	
	
	const strFicha = useMemo( () => {
		if (status === 1) return "🟢";
		if (status === 2) return "❌";
		return "";
	}, [status]);
	
	
	
	return (
		
		<Center
			style={{
				border: "1px solid rgba(0, 0, 0, 0.15)",
				// padding: "1em",
				width: "5em",
				height: "5em",
				cursor: status === 0 ? "pointer" : "not-allowed",
			}}
			onClick={ () => {
				if (status === 0) onClick();
			}}
		>
			<p style={{
				fontSize: "3em",
			}}>
				{strFicha}
			</p>
		</Center>
		
	);
	
};


