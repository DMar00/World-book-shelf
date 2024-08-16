import pandas as pd
from book import Book
from utils import extract_id, save_books


##############################funzione per leggere dal file csv###################################
def get_books_from_csv(mode, csv_file_path, id_col, img_col, title_col, descr_col, author_col, date_pub_col,
                       num_pages_col, genres_col, rate1_col, rate2_col, rate3_col, rate4_col, rate5_col, language,
                       publisher):
    df = pd.read_csv(csv_file_path)
    books_dict = {}

    for _, row in df.iterrows():
        book = Book()
        print(mode)
        if mode == 1:
            id = extract_id(row['URL'], 1)
            book.set_id_book(id)
        elif mode == 2:
            id = extract_id(row[id_col], 2)
            book.set_id_book(id)
        else:
            book.set_id_book(row[id_col])
        if img_col != '':
            book.set_url_img(row[img_col])
        book.set_title(row[title_col])
        if descr_col != '' and row[descr_col] != "":
            book.set_description(row[descr_col])
        book.set_authors(row[author_col])
        if date_pub_col != '':
            book.set_publishing_date(row[date_pub_col])
        if num_pages_col != '':
            book.set_page_number(row[num_pages_col])
        if genres_col != '':
            book.set_genres(row[genres_col])
        if rate1_col != '':
            book.set_number_stars_1(row[rate1_col])
        if rate2_col != '':
            book.set_number_stars_2(row[rate2_col])
        if rate3_col != '':
            book.set_number_stars_3(row[rate3_col])
        if rate4_col != '':
            book.set_number_stars_4(row[rate4_col])
        if rate5_col != '':
            book.set_number_stars_5(row[rate5_col])
        if language != '' and row[language] != "":
            book.set_language(row[language])
        if publisher != '':
            book.set_publisher(row[publisher])
        books_dict[book.id_book] = book  # creo un dizionario per id
    return books_dict


##############################################################################################
# descr and genres and img
books0 = get_books_from_csv(0, './dataset_review/Book_Details.csv', 'book_id', 'cover_image_uri', 'book_title',
                            'book_details', 'author', 'publication_info', 'num_pages', 'genres', '', '', '', '', '', '',
                            '')
save_books(books0, './serialized_books/books0.pkl')
print(len(books0))  # 16157

# reviews
books_review1 = get_books_from_csv(0, './dataset_review/book1-100k.csv', 'Id', '', 'Name', '', 'Authors', 'PublishYear',
                                   'pagesNumber', '', 'RatingDist1', 'RatingDist2', 'RatingDist3', 'RatingDist4',
                                   'RatingDist5', 'Language', 'Publisher')
books_review2 = get_books_from_csv(0, './dataset_review/book100k-200k.csv', 'Id', '', 'Name', '', 'Authors',
                                   'PublishYear', 'pagesNumber', '', 'RatingDist1', 'RatingDist2', 'RatingDist3',
                                   'RatingDist4', 'RatingDist5', 'Language', 'Publisher')
books_review3 = get_books_from_csv(0, './dataset_review/book200k-300k.csv', 'Id', '', 'Name', '', 'Authors',
                                   'PublishYear', 'pagesNumber', '', 'RatingDist1', 'RatingDist2', 'RatingDist3',
                                   'RatingDist4', 'RatingDist5', 'Language', 'Publisher')
books_review4 = get_books_from_csv(0, './dataset_review/book300k-400k.csv', 'Id', '', 'Name', '', 'Authors',
                                   'PublishYear', 'pagesNumber', '', 'RatingDist1', 'RatingDist2', 'RatingDist3',
                                   'RatingDist4', 'RatingDist5', 'Language', 'Publisher')
books_review5 = get_books_from_csv(0, './dataset_review/book400k-500k.csv', 'Id', '', 'Name', '', 'Authors',
                                   'PublishYear', 'pagesNumber', '', 'RatingDist1', 'RatingDist2', 'RatingDist3',
                                   'RatingDist4', 'RatingDist5', 'Language', 'Publisher')
books_review6 = get_books_from_csv(0, './dataset_review/book500k-600k.csv', 'Id', '', 'Name', '', 'Authors',
                                   'PublishYear', 'pagesNumber', '', 'RatingDist1', 'RatingDist2', 'RatingDist3',
                                   'RatingDist4', 'RatingDist5', 'Language', 'Publisher')
books_review7 = get_books_from_csv(0, './dataset_review/book600k-700k.csv', 'Id', '', 'Name', '', 'Authors',
                                   'PublishYear', 'pagesNumber', '', 'RatingDist1', 'RatingDist2', 'RatingDist3',
                                   'RatingDist4', 'RatingDist5', 'Language', 'Publisher')
books_review8 = get_books_from_csv(0, './dataset_review/book700k-800k.csv', 'Id', '', 'Name', '', 'Authors',
                                   'PublishYear', 'pagesNumber', '', 'RatingDist1', 'RatingDist2', 'RatingDist3',
                                   'RatingDist4', 'RatingDist5', 'Language', 'Publisher')
books_review9 = get_books_from_csv(0, './dataset_review/book800k-900k.csv', 'Id', '', 'Name', '', 'Authors',
                                   'PublishYear', 'pagesNumber', '', 'RatingDist1', 'RatingDist2', 'RatingDist3',
                                   'RatingDist4', 'RatingDist5', 'Language', 'Publisher')
books_review10 = get_books_from_csv(0, './dataset_review/book900k-1000k.csv', 'Id', '', 'Name', '', 'Authors',
                                    'PublishYear', 'pagesNumber', '', 'RatingDist1', 'RatingDist2', 'RatingDist3',
                                    'RatingDist4', 'RatingDist5', 'Language', 'Publisher')
books_review11 = get_books_from_csv(0, './dataset_review/book1000k-1100k.csv', 'Id', '', 'Name', '', 'Authors',
                                    'PublishYear', 'pagesNumber', '', 'RatingDist1', 'RatingDist2', 'RatingDist3',
                                    'RatingDist4', 'RatingDist5', 'Language', 'Publisher')
books_review12 = get_books_from_csv(0, './dataset_review/book1100k-1200k.csv', 'Id', '', 'Name', '', 'Authors',
                                    'PublishYear', 'pagesNumber', '', 'RatingDist1', 'RatingDist2', 'RatingDist3',
                                    'RatingDist4', 'RatingDist5', 'Language', 'Publisher')
books_review13 = get_books_from_csv(0, './dataset_review/book1200k-1300k.csv', 'Id', '', 'Name', '', 'Authors',
                                    'PublishYear', 'pagesNumber', '', 'RatingDist1', 'RatingDist2', 'RatingDist3',
                                    'RatingDist4', 'RatingDist5', 'Language', 'Publisher')
books_review14 = get_books_from_csv(0, './dataset_review/book1300k-1400k.csv', 'Id', '', 'Name', '', 'Authors',
                                    'PublishYear', 'pagesNumber', '', 'RatingDist1', 'RatingDist2', 'RatingDist3',
                                    'RatingDist4', 'RatingDist5', 'Language', 'Publisher')
books_review15 = get_books_from_csv(0, './dataset_review/book1400k-1500k.csv', 'Id', '', 'Name', '', 'Authors',
                                    'PublishYear', 'pagesNumber', '', 'RatingDist1', 'RatingDist2', 'RatingDist3',
                                    'RatingDist4', 'RatingDist5', 'Language', 'Publisher')
books_review16 = get_books_from_csv(0, './dataset_review/book1500k-1600k.csv', 'Id', '', 'Name', '', 'Authors',
                                    'PublishYear', 'pagesNumber', '', 'RatingDist1', 'RatingDist2', 'RatingDist3',
                                    'RatingDist4', 'RatingDist5', 'Language', 'Publisher')
books_review17 = get_books_from_csv(0, './dataset_review/book1600k-1700k.csv', 'Id', '', 'Name', '', 'Authors',
                                    'PublishYear', 'pagesNumber', '', 'RatingDist1', 'RatingDist2', 'RatingDist3',
                                    'RatingDist4', 'RatingDist5', 'Language', 'Publisher')
books_review18 = get_books_from_csv(0, './dataset_review/book1700k-1800k.csv', 'Id', '', 'Name', '', 'Authors',
                                    'PublishYear', 'pagesNumber', '', 'RatingDist1', 'RatingDist2', 'RatingDist3',
                                    'RatingDist4', 'RatingDist5', 'Language', 'Publisher')
books_review19 = get_books_from_csv(0, './dataset_review/book1800k-1900k.csv', 'Id', '', 'Name', '', 'Authors',
                                    'PublishYear', 'PagesNumber', '', 'RatingDist1', 'RatingDist2', 'RatingDist3',
                                    'RatingDist4', 'RatingDist5', 'Language', 'Publisher')
books_review20 = get_books_from_csv(0, './dataset_review/book1900k-2000k.csv', 'Id', '', 'Name', '', 'Authors',
                                    'PublishYear', 'PagesNumber', '', 'RatingDist1', 'RatingDist2', 'RatingDist3',
                                    'RatingDist4', 'RatingDist5', 'Language', 'Publisher')
books_review21 = get_books_from_csv(0, './dataset_review/book2000k-3000k.csv', 'Id', '', 'Name', '', 'Authors',
                                    'PublishYear', 'PagesNumber', '', 'RatingDist1', 'RatingDist2', 'RatingDist3',
                                    'RatingDist4', 'RatingDist5', 'Language', 'Publisher')
books_review22 = get_books_from_csv(0, './dataset_review/book3000k-4000k.csv', 'Id', '', 'Name', '', 'Authors',
                                    'PublishYear', 'PagesNumber', '', 'RatingDist1', 'RatingDist2', 'RatingDist3',
                                    'RatingDist4', 'RatingDist5', 'Language', 'Publisher')
books_review23 = get_books_from_csv(0, './dataset_review/book4000k-5000k.csv', 'Id', '', 'Name', '', 'Authors',
                                    'PublishYear', 'PagesNumber', '', 'RatingDist1', 'RatingDist2', 'RatingDist3',
                                    'RatingDist4', 'RatingDist5', 'Language', 'Publisher')
books_union = books_review1 | books_review2 | books_review3 | books_review4 | books_review5 | books_review6 | books_review7 | books_review8 | books_review9
books_union = books_union | books_review10 | books_review11 | books_review12 | books_review13 | books_review14 | books_review15 | books_review16
books_union = books_union | books_review17 | books_review18 | books_review19 | books_review20 | books_review21 | books_review22 | books_review23
save_books(books_union, './serialized_books/books_review_union.pkl')

# images
books1 = get_books_from_csv(0, './dataset_images/books_.csv', 'goodreads_book_id', 'image_url', 'title', '', 'authors',
                            'original_publication_year', '', '', '', '', '', '', '', 'language_code', '')
save_books(books1, './serialized_books/books1.pkl')
print(len(books1))  # 10000

# images
books2 = get_books_from_csv(0, './dataset_images/Books.csv', 'book_id', 'Image-URL', 'Title', '', 'Author',
                            'Publication Year', '', '', '', '', '', '', '', '', '')
save_books(books2, './serialized_books/books2.pkl')
print(len(books2))  # 10000

# books for genres, description
books3 = get_books_from_csv(1, './dataset_genres/goodreads_data.csv', '', '', 'Book', 'Description', 'Author', '', '',
                            'Genres', '', '', '', '', '', '', '')
save_books(books3, './serialized_books/books3.pkl')
print(len(books3))  # 10000

# books for genres and img and descr
books4 = get_books_from_csv(2, './dataset_genres/books_1.Best_Books_Ever.csv', 'bookId', 'coverImg', 'title',
                            'description', 'author', '', '', 'genres', '', '', '', '', '', 'language', 'publisher')
save_books(books4, './serialized_books/books4.pkl')
print(len(books4))  # 52424
