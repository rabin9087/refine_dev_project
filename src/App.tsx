import { Refine } from "@refinedev/core";
import { dataProvider } from "./providers/data-provider";
import ShowProduct from "./pages/Products/ShowProduct";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import routerProvider from '@refinedev/react-router-v6'
import ProductsList from "./pages/Products/ProductsList";
import HomePage from "./pages/HomePage/HomePage";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";

import {
  ThemedLayoutV2,
  ErrorComponent,
  RefineThemes,
  useNotificationProvider,
  RefineSnackbarProvider,
  AuthPage,
} from "@refinedev/mui";
import EditProduct from "./pages/Products/EditProduct";
import CreateProduct from "./pages/Products/CreateProduct";


const API_URL = "https://fakestoreapi.com"
function App() {
  return (
    <BrowserRouter>
      <DevtoolsProvider>
        <Refine dataProvider={dataProvider(API_URL)}
          routerProvider={routerProvider}
          resources={[

            {
              name: "products",
              list: "/products",
              create: "/products/create",
              edit: "/products/edit/:id",
              show: "/products/:id",
              meta: {
                canDelete: true
              },
            },
            {
              name: "categories",
              list: "/categories",
              create: "/categories",
              edit: "/categories/:id",
              show: "/categories/:id",
              meta: {
                canDelete: true
              },
            },
            {
              name: "users",
              list: "/users",
              create: "/users",
              edit: "/users/:id",
              show: "/users/:id",
              meta: {
                canDelete: true
              },
            },
          ]}
        >

          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/products" element={<ProductsList />}></Route>
            <Route path="/products/:id" element={<ShowProduct />}></Route>
            <Route path="/products/edit/:id" element={<EditProduct />}></Route>
            <Route path="/products/create" element={<CreateProduct />}></Route>
            <Route path="*" element={<ErrorComponent />}></Route>
          </Routes>

        </Refine>
        <DevtoolsPanel />
      </DevtoolsProvider>
    </BrowserRouter>
  );
}

export default App;
