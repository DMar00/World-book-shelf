import requests
from utils import load_books, parse_string_genres_to_array, extract_number_from_string_review

# Dati da inserire (multipli documenti)
books_obj = load_books('./serialized_books/books_to_load.pkl')
print(f"Books obj to load {len(books_obj)}")
zero = sum(1 for book in books_obj.values() if book.page_number <= 0) #38
print(f"Books with 0 pages : {zero}")
#20230 - 38 = 20192 libri totali

#delete all books
response = requests.post('http://localhost:4000/api/book/dropAllBooks')

i = 0
for key, book in books_obj.items():
    # i = i + 1
    print(f"ID: {key} - Titolo: {book.title} - Pages: {book.page_number}")

    if book.page_number > 0 :
        new_document = {
            "id_book": key,
            "title": book.title,
            "authors": book.authors,
            "genres": parse_string_genres_to_array(book.genres),
            "description": book.description,
            "publisher": book.publisher,
            "publish_year": book.publishing_date,
            "pages_number": int(book.page_number),
            "language": book.language,
            "number_stars_1": extract_number_from_string_review(book.number_stars_1),
            "number_stars_2": extract_number_from_string_review(book.number_stars_2),
            "number_stars_3": extract_number_from_string_review(book.number_stars_3),
            "number_stars_4": extract_number_from_string_review(book.number_stars_4),
            "number_stars_5": extract_number_from_string_review(book.number_stars_5),
            "coverUrl": book.url_img
        }

        # save book on database
        response = requests.post('http://localhost:4000/api/book/addBook', json=new_document)
        #response = requests.post('http://localhost:4000/api/book/addBookContinue', json=new_document)
        print(response.text)  # Stampa la risposta del server