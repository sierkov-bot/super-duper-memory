'use client'

import { PageContext, QueryContext } from '@/app/contexts'
import { useContext, useState } from 'react'
import { GET_CHARACTERS } from '@/app/queries'
import { ApolloProvider, useQuery } from '@apollo/client'
import client from '@/app/apollo-client'


function CharacterImage({ id, character }) {
  const url = (id) => {
    return `https://rickandmortyapi.com/api/character/avatar/${id}.jpeg`
  }
  const [width, height] = [256, 256]
  return <img className="w-20 h-20 rounded-full" src={url(id)} alt={character} width={width} height={height} />
}

function CharacterStatus({ status }) {
  return (
    <div className="flex items-center">
    <div className={"h-2.5 w-2.5 rounded-full " +
                     (status == "Alive" ? "bg-green-500" : "bg-red-500") + " mr-2"}></div> {status}
    </div>
  )
}

function CharacterItem({ id, name, species, status}) {
  const fandomLink = `https://rickandmorty.fandom.com/wiki/${name.replace(' ', '_')}`
  return (
    <>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
          <CharacterImage id={id} character={name} />
          <div className="pl-3">
            <div className="text-base font-semibold">{name}</div>
            <div className="font-normal text-gray-500">{species}</div>
          </div>
        </th>

        <td className="px-6 py-4">
          <CharacterStatus status={status} />
        </td>
        <td className="px-6 py-4">
          <a href={fandomLink} target="_blank" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">More info</a>
        </td>
      </tr>
    </>
  )
}

function CharactersList({ entries, info, fetchMore, setPage, setQuery }) {
  return (
    <>
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
       <div className="flex items-center justify-between pb-4 bg-white dark:bg-gray-900">
       <SearchInput fetchMore={fetchMore} setQuery={setQuery} setPage={setPage} />
    </div>

    <Paginator info={info} fetchMore={fetchMore} setPage={setPage} />

    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Character
              </th>

              <th scope="col" className="px-6 py-3">
                Status
    </th>
    <th scope="col" className="px-6 py-3">
    </th>

    </tr>
    </thead>
    <tbody>
    {entries.map(({ id, name, species, status }) => (
      <CharacterItem key={id} id={id} name={name} species={species} status={status} />
    ))}
    </tbody>
    </table>
    <Paginator info={info} fetchMore={fetchMore} setPage={setPage} />
    </div>
    </>
  )
}

function Paginator({ info, fetchMore, setPage }) {
  const page = useContext(PageContext)
  const query = useContext(QueryContext)
  const prev = page > 1 ? page - 1 : 1
  const next = page == info.pages ? page : page + 1

  const displayFrom = page == 1 ? 1 : (page-1)*20+1
  const displayTo = info.count > 20 ? (page-1)*20+20 : info.count

  function fetchPrev() {
    fetchMore({variables: {page: prev, filter: {name: query}}})
    setPage(prev)
  }
  function fetchNext() {
    fetchMore({variables: {page: next, filter: {name: query}}})
    setPage(next)
  }
  return (
    <div className="flex flex-col items-center py-5">

      <span className="text-sm text-gray-700 dark:text-gray-400">
        Showing <span className="font-semibold text-gray-900 dark:text-white">
        {displayFrom}
        </span> to <span className="font-semibold text-gray-900 dark:text-white">
          {displayTo > info.count? info.count : displayTo}
        </span> of <span className="font-semibold text-gray-900 dark:text-white">
          {info.count}
        </span> Entries
      </span>

      <div className="inline-flex mt-2 xs:mt-0">
        <button onClick={() => fetchPrev()}
                disabled={page == 1 ? true : false}
                className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          Prev
        </button>
        <button onClick={() => fetchNext()}
                disabled={page == info.pages ? true : false}
                className="px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          Next
        </button>
      </div>
    </div>
  )
}

function CharacterData({ setPage, setQuery }) {
  const page = useContext(PageContext)
  const query = useContext(QueryContext)
  const { loading, error, data, fetchMore } = useQuery(GET_CHARACTERS, {
    variables: { page: page, filter: {name: query} },
  })

  if (loading) return null
  if (error) return ( <div>Error</div> )

  const entries = data.characters.results
  const info = data.characters.info

  return (
    <CharactersList entries={entries}
                    setQuery={setQuery}
                    setPage={setPage}
                    info={info}
                    fetchMore={fetchMore} />
  )
}

function SearchInput({ fetchMore, setQuery, setPage }) {
  const query = useContext(QueryContext)
  const queryChangedHandler = (event) => {
    if (event.key === 'Enter') {
      setQuery(event.target.value)
      setPage(1) // Reset the page on search
      fetchMore({variables: {page: 1, filter: {name: event.target.value}}})
    }
  }

  return (
    <>
      <div className="relative mt-3 mr-5 ml-4">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
        </div>
        <input onKeyUp={queryChangedHandler} type="text" id="character-search" className="block pt-3 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search by name" />
      </div>
    </>
  )
}

export default function Home() {
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState("")

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ApolloProvider client={client}>
        <PageContext.Provider value={page}>
          <QueryContext.Provider value={query}>
            <CharacterData setPage={setPage} setQuery={setQuery} />
          </QueryContext.Provider>
        </PageContext.Provider>
      </ApolloProvider>
    </main>
  )
}
