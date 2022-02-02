import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { NotificationsProvider } from '@mantine/notifications'



ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<MantineProvider
				theme={{
					// colorScheme: "dark"
				}}
			>
				<ModalsProvider>
					<NotificationsProvider>
						<App />
					</NotificationsProvider>
				</ModalsProvider>
			</MantineProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
)
