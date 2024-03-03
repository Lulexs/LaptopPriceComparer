import LaptopGridInfScroll from "./LaptopGrid/LaptopGridInfScroll.tsx";
import LaptopGridPaginated from "./LaptopGrid/LaptopGridPaginated.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@mantine/core/styles.css";
import { NavbarMinimal } from "./NavbarMinimal/NavbarMinimal.tsx";
import { Faq } from "./Faq/Faq.tsx";
import Settings from "./Settings/Settings.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Flex, MantineProvider } from "@mantine/core";
import { useState } from "react";

function App() {
  const client = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } },
  });

  const [infScroll, setInfScroll] = useState(true);

  return (
    <>
      <MantineProvider>
        <QueryClientProvider client={client}>
          <Router>
            <Flex>
              <NavbarMinimal />
              <Routes>
                <Route
                  path="/"
                  element={
                    infScroll ? (
                      <LaptopGridInfScroll
                        baseUrl="http://127.0.0.1:5000/laptops/"
                        startIndex={0}
                        increment={15}
                      />
                    ) : (
                      <LaptopGridPaginated
                        baseUrl="http://127.0.0.1:5000/laptops/"
                        startIndex={0}
                        increment={10}
                      />
                    )
                  }
                />
                <Route
                  path="/home"
                  element={
                    infScroll ? (
                      <LaptopGridInfScroll
                        baseUrl="http://127.0.0.1:5000/laptops/"
                        startIndex={0}
                        increment={15}
                      />
                    ) : (
                      <LaptopGridPaginated
                        baseUrl="http://127.0.0.1:5000/laptops/"
                        startIndex={0}
                        increment={10}
                      />
                    )
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <Settings
                      infScroll={infScroll}
                      setInfScroll={setInfScroll}
                    />
                  }
                />
                <Route path="/info" element={<Faq />} />
              </Routes>
            </Flex>
          </Router>
        </QueryClientProvider>
      </MantineProvider>
    </>
  );
}

export default App;
