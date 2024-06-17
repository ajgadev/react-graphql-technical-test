import { useState, useEffect, useCallback } from 'react'
import './App.css'
import {useQuery, useLazyQuery } from '@apollo/client'
import { Project } from './type'
import ProjectList from './components/ProjectList'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'
import { PROJECTS_BY_NAME } from './queryConsts'

function App() {
  const { loading, error, data } = useQuery(PROJECTS_BY_NAME)
  const [getProjects, result] = useLazyQuery(PROJECTS_BY_NAME)
  const [projects, setProjects] = useState<Project[]>([])
  const { query, setQuery, errorQuery } = useSearch()
  
  const handlSubmit = (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const fields = new FormData(event.currentTarget)
    const { query } = Object.fromEntries(fields) as Record<string, string>
    getProjects({ variables: {filter:{ name: query }} })
  }

  const debouncedSetSearch = useCallback(debounce((search : string) => {
    getProjects({ variables: {filter: { name: search }} })
  }, 500), [])

  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setQuery(newValue)
    debouncedSetSearch(newValue)
  }

  useEffect(() => {
    if (result.data) {
      console.log('result', result.data.projects)
      setProjects(result.data.projects)
    }
  }, [result])

  useEffect(() => {
    if (data) {
      setProjects(data.projects)
    }
  }, [data])

  if (error) return <span className='error'>${error.message}</span>
  return (
    <>
      <h1>List of projects</h1>
      <form onSubmit={handlSubmit} className='w-100 m-5 flex gap-5 justify-center'>
        <input className='border-2 border-gray-200 rounded py-2 px-4' placeholder='Search by name' type='text' value={query} onChange={(e) => handleChange(e)} />
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type='submit'>Search</button>
      </form>
      {errorQuery && <p style={{ color: 'red' }}>{errorQuery}</p>}
      {loading && <p>Loading...</p>}
      {projects.length > 0 && (
        <ProjectList projects={projects} />
      )}
    </>
  )
}

export default App
