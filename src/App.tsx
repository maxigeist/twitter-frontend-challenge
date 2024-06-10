import React from "react";
import "./App.css";
import {Layout} from "./components/layout/Layout";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const App = () => {
    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            <Layout/>
        </QueryClientProvider>
    );
};

export default App;
