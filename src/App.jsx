import { useState, useEffect } from 'react'



const App = () => {
  const [id, setId] = useState(1);
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function searchPokemon() {
      setLoading(true);

      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)

        const data = await response.json();
        setPokemon(data);
      }
      catch (error) {
        console.error(`Erro ao buscar Pokémon: ${error}`)
        setPokemon(null)
      }
      finally {
        setLoading(false);
      }
    }
    searchPokemon();
  }, [id])

  return (
    <div className='min-h-screen bg-slate-100 flex items-center justify-center p-4'>
      <div className='bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm text-center'>
        <h1 className='text-3xl font-bold text-slate-800 mb-6'>Pokédex</h1>
        {loading ? (<p>Carregando...</p>) :
        pokemon ? (
            <>
              <div className='bg-slate-100 rounded-2xl p-4 mb-4'>
                <img
                 src={pokemon.sprites.other["official-artwork"].front_default} 
                 alt={pokemon.name}
                 className='w-40 h-40 mx-auto'/>
              </div>
              <p className='text-gray-400'>#{pokemon.id}</p>
              <h2 className='text-2xl font-bold capitalize mb-4'>{pokemon.name}</h2>
              <div className='flex justify-center gap-2 mb-6'>
                {pokemon.types.map((tipo) => (
                  <span
                  key={tipo.type.name}
                  className='bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm capitalize'>
                    {tipo.type.name}
                  </span>
                ))}
              </div>
            </>
        ) : (<p className='mb-6'>Não foi possível carregar</p>)}
        <div className='flex gap-3'>
          <button 
          className='flex-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-40 px-4 py-2 rounded-lg font-medium cursor-pointer disabled:cursor-not-allowed'
          onClick={() => setId(id - 1)}
          disabled={id === 1}>
            Anterior
          </button>

          <button 
          className='flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium cursor-pointer'
          onClick={() => setId(id + 1)}>
            Próximo
          </button>          
        </div>
      </div>
    </div>
  )
}

export default App
