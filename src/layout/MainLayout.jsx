import { Outlet } from 'react-router'
import GlobalStyle from '../styles/GlobalStyle'
import styled from 'styled-components'
import TopMenu from '../components/TopMenu'

const Container = styled.div`
  display: flex;
  flex-direction: column;
 
  width: 100%;
  
`

function MainLayout() {
  return (
    <>
      <GlobalStyle />
      <Container>
        <header>
          <TopMenu />
        </header>
        <main>
          <Outlet />
        </main>
        <footer>
          <p>&copy; PetAdoption</p>
        </footer>
      </Container>
    </>
  )
}

export default MainLayout
