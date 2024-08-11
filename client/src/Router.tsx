import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "@/routes/App";
import Home from "@/routes/Home";
import ProductsView from "@/routes/ProductsView";
import ErrorPage from "@/routes/ErrorPage";
import { loader as productLoader } from "@/routes/ProductDetails";
import SidebarPage from "@/routes/SidebarPage";
import BasketSidebar from "@/components/BasketSidebar";
import SummarySidebar from "@/components/SummarySidebar";
import BasketView from "@/routes/BasketView";
import LoadingProductPage from "@/components/LoadingProductPage";
import PageNotFound from "@/routes/PageNotFound";

const ProductDetails = lazy(() => import("@/routes/ProductDetails"));

const Router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { 
                errorElement: <ErrorPage />,
                children: [
                    {
                        index: true,
                        element: <Home />
                    },
                    {
                        path: "/shop",
                        element: <SidebarPage><BasketSidebar /></SidebarPage>,
                        children: [
                            {
                              errorElement: <ErrorPage />,
                              children: [
                                  {
                                      index: true,
                                      element: <ProductsView />,
                                  },
                                  {
                                      path: "/shop/product/:productId",
                                      /*    lazy: async () => {let { ProductDetails } = await import("@/routes/ProductDetails")
                                              return { Component: ProductDetails }}, */
                                      element: <Suspense fallback={<LoadingProductPage />}><ProductDetails /></Suspense>,
                                      loader: productLoader
                                  }
                              ]  
                            }    
                        ]
                    },
                    {
                        path: "/shop/basket",
                        element: <SidebarPage><SummarySidebar /></SidebarPage>,
                        children: [
                            {
                                errorElement: <ErrorPage />,
                                children: [
                                    {
                                        index: true,
                                        element: <BasketView />,
                                    },
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        path: "*",
        element: <PageNotFound />,
        errorElement: <ErrorPage />
    }
]);

export default Router;