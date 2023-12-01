import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Tracking from './screens/tracking';
import Main from './screens/main';

const App: React.FC = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/tracking/:sonumber" element={<Tracking />} />
      </Routes>
    </Router>
  );
}

export default App;
