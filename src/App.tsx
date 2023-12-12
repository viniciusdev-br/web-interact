import { Router } from './routes'
import { UserProvider } from './context/User';
import './App.css';

function App() {
    return (
        <UserProvider>
            <Router />
        </UserProvider>
    )
}

export default App
