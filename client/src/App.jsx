import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Home/Home'
import Header from './components/Header'
import { Bounce, ToastContainer } from 'react-toastify'

function App() {


  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
