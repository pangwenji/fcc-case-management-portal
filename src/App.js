import './styles/App.css';
import {
  HashRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import PortalPage from './pages/PortalPage';
import AuthGuard from './component/AuthGuard';
import { Provider } from "react-redux";
import store from './store/rootStore'
import { publicRoutes } from './route/routes';

function App() {
  return (
      <Provider store={store}>
        <HashRouter>
          <Routes>
            {publicRoutes.map((e) => <Route key={e.name} path={e.path} element={e.component} />)}
            <Route path="/cms/*" element={
              <AuthGuard redirectPath="/">
                <PortalPage />
              </AuthGuard>} />
            <Route path='*' element={<Navigate to={"/"} replace />} />
          </Routes>
        </HashRouter>
      </Provider>
  );
}


export default App;
