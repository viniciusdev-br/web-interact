import { Router } from './routes'
import { UserProvider } from './context/User';

function App() {
    return (
        <UserProvider>
            <Router />
        </UserProvider>
    )
}

export default App
