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
import UserList from "./pages/Users/UserList";
import CategoryList from "./pages/Categories/CategoryList";
import CreateCategory from "./pages/Categories/Createcategory";
import CreateUser from "./pages/Users/CreateUser";
import EditUser from "./pages/Users/EditUser";
import ShowUser from "./pages/Users/ShowUser";


const API_URL = "https://fakestoreapi.com"
function App() {
  return (
    <BrowserRouter>
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
            create: "/categories/create",
            edit: "/categories/edit/:id",
            show: "/categories/:id",
            meta: {
              canDelete: true
            },
          },
          {
            name: "users",
            list: "/users",
            create: "/users/create",
            edit: "/users/edit/:id",
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

          <Route path="/users" element={<UserList />}></Route>
          <Route path="/users/create" element={<CreateUser />}></Route>
          <Route path="/users/:id" element={<ShowUser />}></Route>
          <Route path="/users/edit/:id" element={<EditUser />}></Route>


          <Route path="/categories" element={<CategoryList />}></Route>
          <Route path="*" element={<ErrorComponent />}></Route>
        </Routes>

      </Refine>

    </BrowserRouter>
  );
}

export default App;
