import { useState, useEffect } from 'react'
import './App.css'
import {gql, useQuery} from '@apollo/client'
import { Project } from './type'
import ProjectList from './components/ProjectList'

const ALL_PROJECTS = gql`
  query {
    projects {
      id
      name
      key
      # packaging {
      #   id
      #   weight
      #   components {
      #     id
      #     name
      #     weight
      #   }
      # }
    }
  }
`
function App() {
  const { loading, error, data } = useQuery(ALL_PROJECTS)
  const [projects, setProjects] = useState<Project[]>([])
  useEffect(() => {
    if (data) {
      setProjects(data.projects)
    }
  }, [data])
  if (error) return <span className='error'>${error.message}</span>
  return (
    <>
      <h1>List of projects</h1>
      {loading && <p>Loading...</p>}
      {projects.length > 0 && (
        <ProjectList projects={projects} />
      )}
      {data && <p className='text-3xl font-bold underline'>Projects: {JSON.stringify(data)}</p>}
    </>
  )
}

export default App
