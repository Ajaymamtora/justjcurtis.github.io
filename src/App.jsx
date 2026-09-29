import { Navbar } from "./components/navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import {
  HomePage,
  WorkPage,
  ProjectsPage,
  AboutPage,
  CVPage,
  NotFoundPage,
  WipPage
} from "./components/pages";
import { AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { LoadingPage } from "./components/pages/loadingPage";
import { useImageUrls } from "./hooks/useImageUrls";
import { AppRoutes } from "./utils/navigation/routes";

const styles = {
  app: {
    display: 'flex',
    flexFlow: 'column',
    minHeight: '100svh'
  }
}

function App() {
  const images = useImageUrls() // using a hook to wrap fetching a context is preferred
  const initialImages = useRef(images) // refs survive rerenders
  const location = useLocation()
  const [doneLoading, setDoneLoading] = useState(false)

  const isLoading = !initialImages.current ? !images || !doneLoading : !images

  const isNavbarless = [AppRoutes.cv].includes(location.pathname)

  return (
    <div style={styles.app} className="App bg-neutral-focus">
      {!isLoading && !isNavbarless && <Navbar images={images} />}
      <AnimatePresence>
        {isLoading ?
          <LoadingPage key='loading' done={setDoneLoading} /> :
          <>
            <Routes location={location} key={location.pathname}>
              <Route exact path={AppRoutes.home} element={<HomePage />} />
              <Route exact path={AppRoutes.work} element={<WorkPage />} />
              <Route exact path={AppRoutes.projects} element={<ProjectsPage />} />
              <Route exact path={AppRoutes.about} element={<AboutPage />} />
              <Route exact path={AppRoutes.cv} element={<CVPage />} />
              <Route exact path={AppRoutes.wip} element={<WipPage />} />
              <Route path={AppRoutes.notFound} element={<NotFoundPage />} />
            </Routes>
          </>
        }
      </AnimatePresence>
    </div>
  );
}

export default App;
