import re
import pickle
import numpy as np

''' funzioni per serializzare/deserializzare oggetti Book'''
def save_books(books, file_path):
    with open(file_path, 'wb') as f:
        pickle.dump(books, f)


def load_books(file_path):
    with open(file_path, 'rb') as f:
        books = pickle.load(f)
    return books


''' funzione per estrarre id goodreads da stringa
    se mode == 8 prendo id [] da 
    se mode == 7 prendo id [] da 
'''
def extract_id(url, mode):
    if mode == 1:
        pattern = r'show/(\d+)'
    if mode == 2:
        pattern = r'^(\d+)'
    match = re.search(pattern, url)
    if match:
        return int(match.group(1))
    return None


'''
    uso questa funzione in quanto i generi altrimenti verrebbero salvati come stringa così
    "['Fantasy', 'Young Adult', 'Fiction', 'Magic', 'Childrens', 'Audiobook']"
    invece io voglio un array di stringhe
'''
def parse_string_genres_to_array(input_string):
    cleaned_string = input_string.strip('[]')  # Rimuovi le parentesi quadre iniziali e finali
    cleaned_string = cleaned_string.replace("'",
                                            "")  # Sostituisci le virgolette singole iniziali e finali con una stringa vuota
    result_array = cleaned_string.split(",")  # Dividi la stringa in un array utilizzando la virgola come separatore
    result_array = [word.strip() for word in result_array]  # Rimuovi gli spazi bianchi intorno ad ogni parola
    return result_array


'''uso questa funzione altrimenti mi salva "1:9877" invece di 9877 come valore per numero di review per stella 1'''
def extract_number_from_string_review(input_string):
    pattern = r'\d+$'  # Pattern regex per trovare una sequenza di numeri alla fine della stringa
    match = re.search(pattern, input_string)
    if match:
        return int(match.group())  # Restituisci il numero estratto come intero
    else:
        return None  # Se non viene trovato nessun match, restituisci None o gestisci l'errore come preferisci



'''funzione che controlla se una valore è stato impostato per sbaglio a nan'''
def is_nan(value):
    # Controlla se il valore è un numero e se è NaN
    if isinstance(value, (float, int)):
        return np.isnan(value)
    # Controlla se il valore è una stringa rappresentante 'nan'
    elif isinstance(value, str):
        return value.lower() == 'nan' #or value.strip() == ''
    return False
