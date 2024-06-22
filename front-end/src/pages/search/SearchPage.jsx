import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import ReactPaginate from 'react-paginate';
import useSearch from '../../hooks/useSearch';
import { Container, Row, Col } from 'react-bootstrap';
import './SearchPage.css';
import DescrBook from '../../components/descr-book/DescrBook';
import Select from 'react-select'; // Importa React Select

const SearchPage = () => {
    const { searchBooks } = useSearch();
    const location = useLocation();
    const { query } = queryString.parse(location.search);
    const [results, setResults] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const [orderBy, setOrderBy] = useState(''); // Stato per gestire il filtro di ordinamento

    useEffect(() => {
        const fetchData = async () => {
            console.log("query : " + query);
            if (query !== '') {
                const data = await searchBooks(query, currentPage + 1, orderBy);
                if (data.success) {
                    setResults(data.books);
                    setTotalPages(data.totalPages);
                }
            }
        };
        fetchData();
    }, [query, currentPage, orderBy]);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const options = [
        { value: 'title', label: 'Title' },
        { value: 'author', label: 'Author' },
        { value: 'pages', label: 'Pages' },
    ];

    const handleSelectChange = (selectedOption) => {
        setOrderBy(selectedOption.value); // Imposta il criterio di ordinamento selezionato
    };

    return (
        <div className='page'>
            <Container className='d-flex flex-column text-center'>
                <h1>Search Results '{query}'</h1>
                <Row>
                    <Col lg={12} className='mb-3'>
                        <Select
                            options={options}
                            onChange={handleSelectChange}
                            value={options.find(option => option.value === orderBy)}
                            placeholder="Order by"
                        />
                    </Col>
                </Row>
                <Row>
                    {results.length === 0 ? (
                        <div>No books found</div>
                    ) : (
                        results.map(book => (
                            <Col lg={6} key={book._id}>
                                <DescrBook
                                    image={book.cover}
                                    title={book.title}
                                    authors={book.authors}
                                    id={book.id_book}
                                    descr={book.description}
                                />
                            </Col>
                        ))
                    )}
                </Row>
                <Row className='d-flex align-items-end flex-grow-1 justify-content-center'>
                    <ReactPaginate
                        pageCount={totalPages}
                        pageRangeDisplayed={2}
                        marginPagesDisplayed={1}
                        onPageChange={handlePageClick}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                    />
                </Row>
            </Container>
        </div>
    );
}

export default SearchPage;
/*
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import ReactPaginate from 'react-paginate';
import useSearch from '../../hooks/useSearch';
import { Container, Row, Col } from 'react-bootstrap';
import './SearchPage.css';
import DescrBook from '../../components/descr-book/DescrBook';
import Select from 'react-select'; // Importa React Select

const SearchPage = () => {
    const { searchBooks } = useSearch();
    const location = useLocation();
    const { query } = queryString.parse(location.search);
    const [results, setResults] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [orderBy, setOrderBy] = useState(''); // Stato per gestire il filtro di ordinamento

    useEffect(() => {
        const fetchData = async () => {
            console.log("query : " + query);
            if (query !== '') {
                const data = await searchBooks(query, currentPage + 1, orderBy); // Passa anche il criterio di ordinamento
                if (data.success) {
                    setResults(data.books);
                    setTotalPages(data.totalPages);
                }
            }
        };
        fetchData();
    }, [query, currentPage, orderBy]); // Aggiungi orderBy come dipendenza dell'effetto useEffect

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const options = [
        { value: '', label: 'None' },
        { value: 'title', label: 'Title' },
        { value: 'author', label: 'Author' },
        { value: 'pages', label: 'Pages' },
        // Aggiungi altri criteri di ordinamento se necessario
    ];

    const handleSelectChange = (selectedOption) => {
        setOrderBy(selectedOption.value); // Imposta il criterio di ordinamento selezionato
    };

    return (
        <div className='page'>
            <Container className='d-flex flex-column text-center'>
                <h1>Search Results '{query}'</h1>
                <Row>
                    <Col lg={12} className='mb-3'>
                        <Select
                            options={options}
                            onChange={handleSelectChange}
                            value={options.find(option => option.value === orderBy)}
                            placeholder="Order by"
                        />
                    </Col>
                </Row>
                <Row>
                    {results.length === 0 ? (
                        <div>No books found</div>
                    ) : (
                        results.map(book => (
                            <Col lg={6} key={book._id}>
                                <DescrBook
                                    image={book.cover}
                                    title={book.title}
                                    authors={book.authors}
                                    id={book.id_book}
                                    descr={book.description}
                                />
                            </Col>
                        ))
                    )}
                </Row>
                <Row className='d-flex align-items-end flex-grow-1 justify-content-center'>
                    <ReactPaginate
                        pageCount={totalPages}
                        pageRangeDisplayed={2}
                        marginPagesDisplayed={1}
                        onPageChange={handlePageClick}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                    />
                </Row>
            </Container>
        </div>
    );
}

export default SearchPage;*/
