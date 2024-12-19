import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import { ProtectedRoute } from './layout/ProtectedRoute';

const routes = [
  {
    id: 1,
    path: '#',
    title:
      'eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template',
    element: ECommerce,
  },
  {
    id: 2,
    path: '/calender',
    title: 'Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template',
    element: Calendar,
  },
  {
    id: 3,
    path: '/profile',
    title: 'Profiles | TailAdmin - Tailwind CSS Admin Dashboard Template',
    element: Profile,
  },
  {
    id: 4,
    path: '/forms/form-elements',
    title: 'Forms | TailAdmin - Tailwind CSS Admin Dashboard Template',
    element: FormElements,
  },
  {
    id: 5,
    path: '/forms/form-layout',
    title: 'Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template',
    element: FormLayout,
  },
  {
    id: 6,
    path: '/tables',
    title: 'Tables | TailAdmin - Tailwind CSS Admin Dashboard Template',
    element: Tables,
  },
];

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ProtectedRoute>
                <ECommerce />
              </ProtectedRoute>
            </>
          }
        />

        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ProtectedRoute>
                <FormLayout />
              </ProtectedRoute>
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ProtectedRoute>
                <Tables />
              </ProtectedRoute>
            </>
          }
        />
        {/* <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Buttons />
            </>
          }
        /> */}
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignIn />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
