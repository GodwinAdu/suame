import { useEffect } from 'react'
import Main from '../component/Main'
import Layout from '../layout'
import { fetchUser } from '../utils/fetchMainUser'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  return (
    <Layout>
      <Main />
    </Layout>
  )
}

export default Home