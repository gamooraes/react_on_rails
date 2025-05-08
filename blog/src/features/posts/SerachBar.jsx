import { useRef } from "react";
import PropTypes from "prop-types";

function SearchBar({ value, onSearchChange, onImmediateChange }) {
    const searchDebounceRef = useRef(null); // Espera para ter certeza de que o usuário terminou de digitar para realizar a requisição de busca na API

    const handleSearching = (e) => {
        const searchValue = e.target.value;

        //Atualiza o termo de busca imediatamente
        onImmediateChange(searchValue);

        //Limpa o timeout de busca se existir impedindo uma nova requisição na API caso ainda esteja digitando
        if (searchDebounceRef.current) {
            clearTimeout(searchDebounceRef.curretn)
        }
        // Define um novo timeout
        searchDebounceRef.current = setTimeout(() => {
            onSearchChange(searchValue)
        }, 500)
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Serach..."
                value={value}
                onChange={handleSearching}
            />
        </div>
    )
}

SearchBar.PropTypes = {
    value: PropTypes.string.isRequired,
    onSearchChange: PropTypes.func.isRequired,
    onImmediateChange: PropTypes.func.isRequired,
}
export default SearchBar;