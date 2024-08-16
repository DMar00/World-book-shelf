from utils import load_books, save_books, is_nan

'''funzione che restituisce i libri con quel parametro nullo'''
def get_null(A, parameter):
    return {key: A[key] for key in A
            if (getattr(A[key], parameter) is None
            or getattr(A[key], parameter) == ""
            or is_nan(getattr(A[key], parameter))
            )}


'''funzione per aggiungere info ai libri'''
def update_books(A, B):
    for key in A:
        if key in B:
            if (A[key].genres is None or is_nan(A[key].genres) or A[key].genres == "") and ((B[key].genres is not None) and (not is_nan(B[key].genres))):
                A[key].genres = B[key].genres  # Aggiorna il genere di A con il genere di B

            if (A[key].description is None or is_nan(A[key].description) or A[key].description == "") and ((B[key].description is not None) and (not is_nan(B[key].description))):
                A[key].description = B[key].description

            if (A[key].url_img is None or is_nan(A[key].url_img) or A[key].url_img == "") and ((B[key].url_img is not None) and (not is_nan(B[key].url_img))):
                A[key].url_img = B[key].url_img

            if (A[key].publisher is None or is_nan(A[key].publisher) or A[key].publisher == "") and ((B[key].publisher is not None) and (not is_nan(B[key].publisher))):
                A[key].publisher = B[key].publisher

            if (A[key].language is None or is_nan(A[key].language) or A[key].language == "") and ((B[key].language is not None) and (not is_nan(B[key].language))):
                A[key].language = B[key].language
    return A


def remove_keys_from_dict(A, B):
    return {key: value for key, value in A.items() if key not in B}


def update_img_books(A):
    for key in A:
        if is_nan(A[key].url_img) or A[key].url_img is None:
            A[key].url_img = ""
    return A

def update_lang_books(A):
    for key in A:
        if is_nan(A[key].language) or A[key].language is None:
            A[key].language = ""
    return A

def get_unique_languages(A):
    languages = set()  # Usare un set per evitare duplicati
    for book in A.values():
        if book.language:  # Verificare se il language è definito e non è None
            languages.add(book.language)
    return list(languages)  # Convertire il set in lista se necessario

def normalize_languages(A):
    normalization_map = {
        'spa': 'Spanish', 'swe': 'Swedish', 'hin': 'Hindi', 'pol': 'Polish',
        'ara': 'Arabic', 'ind': 'Indonesian', 'ger': 'German', 'jpn': 'Japanese',
        'por': 'Portuguese', 'en-gb': 'English', 'fin': 'Finnish', 'en-us': 'English',
        'ita': 'Italian', 'nor': 'Norwegian', 'fre': 'French', 'eng': 'English',
        'en-ca': 'English', 'grc': 'Greek', 'rum': 'Romanian', 'nl': 'Dutch',
        'myn': 'Mayan', 'dan': 'Danish', 'mul': 'Multiple', 'afr': 'Afrikaans',
        'tur': 'Turkish', 'enm': 'Middle English', 'gre': 'Greek', 'cze': 'Czech',
        'zho': 'Chinese', 'rus': 'Russian', 'msa': 'Malay', 'per': 'Persian',
        'spanish': 'Spanish', 'swedish': 'Swedish', 'hindi': 'Hindi', 'polish': 'Polish',
        'arabic': 'Arabic', 'indonesian': 'Indonesian', 'german': 'German', 'japanese': 'Japanese',
        'portuguese': 'Portuguese', 'finnish': 'Finnish', 'italian': 'Italian', 'norwegian': 'Norwegian',
        'french': 'French', 'english': 'English', 'greek': 'Greek', 'romanian': 'Romanian',
        'dutch': 'Dutch', 'mayan': 'Mayan', 'danish': 'Danish', 'multiple': 'Multiple',
        'afrikaans': 'Afrikaans', 'turkish': 'Turkish', 'middle english': 'Middle English',
        'czech': 'Czech', 'chinese': 'Chinese', 'russian': 'Russian', 'malay': 'Malay',
        'persian': 'Persian'
    }
    for book in A.values():
        if book.language:
            normalized_language = normalization_map.get(book.language.lower())
            if normalized_language:
                book.language = normalized_language


def get_unique_publish_date(A):
    dates = set()  # Usare un set per evitare duplicati
    for book in A.values():
        if book.publishing_date:
            if book.publishing_date == 162: #errore anno publicazione del libro id = 76978
                book.publishing_date = 1927
            dates.add(book.publishing_date)
    return list(dates)  # Convertire il set in lista se necessario


'''funzione che restituisce solo i libri che hanno genere'''
def filter_books_with_genre(A):
    # Nuovo dizionario con i libri che hanno genere definito (non None, non vuoto e non array vuoto)
    return {key: A[key] for key in A
            if A[key].genres is not None
            and A[key].genres != ""
            and A[key].genres != []
            and A[key].genres != "[]"
            and not is_nan(A[key].genres)}






def update_publisher_books(A):
    for key in A:
        if is_nan(A[key].publisher) or A[key].publisher is None:
            A[key].publisher = ""
    return A




'''funzioni che restituiscono il numero di libri con una certa caratteristica'''


def count_books_with_none_genre(A):
    # Utilizza sum con un'espressione generatore per contare i libri con genere None
    return sum(1 for key in A if A[key].genres is None)


def count_books_with_none_descr(A):
    # Utilizza sum con un'espressione generatore per contare i libri con description None
    return sum(1 for key in A if A[key].description is None)


def count_books_with_nan_descr(A):
    return {key: A[key] for key in A if is_nan(A[key].description)}

def books_with_none_descr(A):
    return {key: A[key] for key in A if A[key].description is None}

def count_books_with_nan_lang(A):
    return {key: A[key] for key in A if is_nan(A[key].language)}

def count_books_with_nan_publisher(A):
    return {key: A[key] for key in A if is_nan(A[key].publisher)}

def count_books_with_none_img(A):
    # Utilizza sum con un'espressione generatore per contare i libri con description None
    return sum(1 for key in A if A[key].url_img is None)


def count_books_with_genre(A):
    # Utilizza sum con un'espressione generatore per contare i libri con genere None
    return sum(1 for key in A if A[key].genres is not None)

def find_matching_keys(A, B):
    matching_keys = [key for key in A if key in B]
    return matching_keys



#########################################################################################################
# g= genres i=images d=descr r=ratings
books_gid = load_books('./serialized_books/books4.pkl')
# print(len(books_gid)) #52.424

books_gd = load_books('./serialized_books/books3.pkl')
# print(len(books_gd)) #10.000

books_i = load_books('./serialized_books/books2.pkl')
# print(len(books_i)) #10.000

books_ir = load_books('./serialized_books/books1.pkl')
# print(len(books_ir)) #10.000

books_r = load_books('./serialized_books/books_review_union.pkl')
# print(len(books_r)) #1.850.115

books_gidr = load_books('./serialized_books/books0.pkl')


#add genres, descr and images to books
books_r = update_books(books_r, books_gidr)  # add genres, descr and image
books_r = update_books(books_r, books_gd)    # add genres, descr
books_r = update_books(books_r, books_gid)   # add genres, descr and image
books_to_load = filter_books_with_genre(books_r)  # get only books with genres
#print(books_to_load[236357])
books_to_load = update_books(books_to_load, books_i)  # add other img
books_to_load = update_books(books_to_load, books_ir)  # add other img

nullGen = get_null(books_to_load, "genres")
nullImg = get_null(books_to_load, "url_img")
nullDescr = get_null(books_to_load, "description")
nullPub = get_null(books_to_load, "publisher")
nullLang = get_null(books_to_load, "language")
nullTitle = get_null(books_to_load, "title")
nullAuthor = get_null(books_to_load, "authors")
nullPubDate = get_null(books_to_load, "publishing_date")
nullPage = get_null(books_to_load, "page_number")

print(f"null gen: {len(nullGen)} - null img: {len(nullImg)} - null descr: {len(nullDescr)}")
print(f"null pub: {len(nullPub)} - null Lang: {len(nullLang)} - null Title: {len(nullTitle)}")
print(f"null auth: {len(nullAuthor)} - null pubDate: {len(nullPubDate)} - null page: {len(nullPage)}\n")

#rimuovo libri con description null
books_to_load = remove_keys_from_dict(books_to_load, nullDescr)
print(f"After removing null descr book -> books with null descr: {len(get_null(books_to_load, 'description'))}\n")

#rimuovo libri con publisher null
books_to_load = remove_keys_from_dict(books_to_load, nullPub)
print(f"After removing null pub book -> books with null pub: {len(get_null(books_to_load, 'publisher'))}\n")

#controllo language
books_to_load = update_lang_books(books_to_load)
languages_used = get_unique_languages(books_to_load)
print(f"{languages_used}")
normalize_languages(books_to_load)
languages_used = get_unique_languages(books_to_load)
print(f"{languages_used} \n")

#controllo publish date
dates_used = get_unique_publish_date(books_to_load)
print(f"{dates_used} \n")

#aggiorna libri senza immagine
books_to_load = update_img_books(books_to_load)

# salvo libri da caricare nel db
print(f"books to load : {len(books_to_load)}")
save_books(books_to_load, './serialized_books/books_to_load.pkl')
