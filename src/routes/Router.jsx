import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AllServices from "../pages/AllServices/AllServices";
import NotFound from "../pages/NotFound/NotFound";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import PrivateRoute from "./PrivateRoute";
import AddService from "../pages/AddService/AddService";
import axios from "axios";
import Spinner from "../components/Spinner";
import ServiceDetails from "../pages/ServiceDetails/ServiceDetails";
import BookService from "../pages/BookService/BookService";
import BookedService from "../pages/BookedService/BookedService";
import ManageService from "../pages/ManageService/ManageService";
import ServiceToDo from "../pages/ServiceToDo/ServiceToDo";
import About from "../pages/About/About";
import Subjects from "../pages/Subjects/Subjects";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    hydrateFallbackElement: <Spinner />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "all-services",
        Component: AllServices,
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "subjects",
        Component: Subjects,
      },
      {
        path: "/service/:id",
        loader: ({ params }) =>
          axios(`https://server-nine-tau-39.vercel.app/service/${params.id}`),
        element: (
          <PrivateRoute>
            <ServiceDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/book-service",
        element: (
          <PrivateRoute>
            <BookService />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/add-service",
        element: (
          <PrivateRoute>
            <AddService />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/manage-service",
        element: (
          <PrivateRoute>
            <ManageService />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/booked-services",
        element: (
          <PrivateRoute>
            <BookedService />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/service-to-do",
        element: (
          <PrivateRoute>
            <ServiceToDo />
          </PrivateRoute>
        ),
      },
    ],
  },

  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "/auth/login",
        Component: Login,
      },
      {
        path: "/auth/registration",
        Component: Registration,
      },
    ],
  },

  {
    path: "/*",
    Component: NotFound,
  },
]);

export default router;
