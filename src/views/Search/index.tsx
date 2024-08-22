import SearchBar from '@views/Search/components/SearchBar';
import userData from '@data/userlist.json';


const Search = () => {
  // console.log("empData:",empData)
  
  return (
      <SearchBar data={userData}/>
  )
}

export default Search