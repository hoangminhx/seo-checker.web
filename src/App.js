import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

import { useEffect } from 'react'

import { loadEnvironment } from './helpers/environment'
import MainLayout from './features/layouts/MainLayout'
import SearchPage from './features/search/SearchPage'

function App() {
  useEffect(() => {
    loadEnvironment()
  }, [])

  return (
    <MainLayout>
      <SearchPage />
    </MainLayout>
  )
}

export default App
