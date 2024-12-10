import './App.css';
import ThemeProvider from './components/common/ThemeProvider';
import CryptoData from './components/pages/CryptoData';

function App() {
    return (
        <>
            <ThemeProvider>
                <CryptoData />
            </ThemeProvider>
        </>
    );
}

export default App;
