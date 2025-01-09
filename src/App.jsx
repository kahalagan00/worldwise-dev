import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

// import Homepage from "./pages/Homepage";
// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import Login from "./pages/Login";
// import AppLayout from "./pages/AppLayout";
// import PageNotFound from "./pages/PageNotFound";

const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

// Without lazy loading
// dist/index.html                   0.48 kB │ gzip:   0.31 kB
// dist/assets/index-40b44e46.css   30.49 kB │ gzip:   5.07 kB
// dist/assets/index-15bdb4ee.js   507.37 kB │ gzip: 147.65 kB

// With lazy loading
// dist/index.html                           0.48 kB │ gzip:   0.31 kB
// dist/assets/Logo-515b84ce.css             0.03 kB │ gzip:   0.05 kB
// dist/assets/Login-f39ef3ff.css            0.35 kB │ gzip:   0.22 kB
// dist/assets/Product-cf1be470.css          0.47 kB │ gzip:   0.27 kB
// dist/assets/PageNav-d3c5d403.css          0.51 kB │ gzip:   0.28 kB
// dist/assets/Homepage-380f4eeb.css         0.51 kB │ gzip:   0.30 kB
// dist/assets/AppLayout-a9e6818a.css        1.91 kB │ gzip:   0.70 kB
// dist/assets/index-712240e7.css           26.81 kB │ gzip:   4.38 kB
// dist/assets/Product.module-02d70b80.js    0.06 kB │ gzip:   0.07 kB
// dist/assets/PageNotFound-97d9090d.js      0.15 kB │ gzip:   0.15 kB
// dist/assets/Logo-f073d67e.js              0.21 kB │ gzip:   0.19 kB
// dist/assets/PageNav-ab69e0c1.js           0.49 kB │ gzip:   0.27 kB
// dist/assets/Pricing-dc67b6c7.js           0.65 kB │ gzip:   0.41 kB
// dist/assets/Homepage-ecb303f7.js          0.67 kB │ gzip:   0.41 kB
// dist/assets/Product-74055c87.js           0.86 kB │ gzip:   0.48 kB
// dist/assets/Login-a003210a.js             1.01 kB │ gzip:   0.53 kB
// dist/assets/AppLayout-49eadc41.js       156.96 kB │ gzip:  46.12 kB
// dist/assets/index-04e46a0f.js           348.85 kB │ gzip: 101.19 kB

import SpinnerFullPage from "./components/SpinnerFullPage";
import City from "./components/City";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import Form from "./components/Form";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />}></Route>
              <Route path="product" element={<Product />}></Route>
              <Route path="pricing" element={<Pricing />}></Route>
              <Route path="login" element={<Login />}></Route>
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />}></Route>
                <Route path="cities/:id" element={<City />}></Route>
                <Route path="countries" element={<CountryList />}></Route>
                <Route path="form" element={<Form />}></Route>
              </Route>
              <Route path="*" element={<PageNotFound />}></Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
