import SearchBar from '@views/Search/components/searchBar';
import empData from '@data/emplist.json';


const Search = () => {
  console.log("empData:",empData)
  
  return (
      <SearchBar data={empData}/>
  )
}

export default Search