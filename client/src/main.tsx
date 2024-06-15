import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProjectInfo from './components/ProjectInfo'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: import.meta.env.VITE_APOLO_SERVER_URL,
  })
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/projects',
    element: <App />,
  },
  {
    path: '/projects/:projectId',
    element: <ProjectInfo />,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>,
)
