import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import MiniBook from '../../components/mini-book/MiniBook'
import ReactPaginate from 'react-paginate'
import  useSearch  from '../../hooks/useSearch'
import { Container, Row } from 'react-bootstrap'
import './SearchPage.css'
import DescrBook from '../../components/descr-book/DescrBook'

const SearchPage = () => {
    const { searchBooks } = useSearch();
    const location = useLocation();
    const { query } = location.state;
    const [results, setResults] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const data = await searchBooks(query, currentPage + 1);
            if (data.success) {
                setResults(data.books);
                setTotalPages(data.totalPages);
            }
        };
        fetchData();
    }, [query, currentPage]);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    return (
        <div className='page'>
            <Container className='text-center'>
                <h1>Search Results '{query}'</h1>
                <Row>
                    {results.map(book => (
                        <div key={book._id}>
                            <DescrBook image={book.cover} title={book.title} authors={book.authors} id={book.id_book} descr={book.description}/>
                        </div>
                    ))}
                </Row>
                <Row className='d-flex justify-content-center align-items-center'>
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

export default SearchPage
