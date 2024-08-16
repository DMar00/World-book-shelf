class Book:
    def __init__(self):
        self.id_book = None
        self.title = None
        self.genres = None
        self.authors = None
        self.language = None 
        self.description = None
        self.url_img = None 
        self.publisher = None 
        self.publishing_date = None 
        self.page_number = None 
        self.number_stars_1 = None 
        self.number_stars_2 = None 
        self.number_stars_3 = None 
        self.number_stars_4 = None 
        self.number_stars_5 = None 

    # Setters
    def set_id_book(self, id_book):
        self.id_book = id_book

    def set_title(self, title):
        self.title = title

    def set_genres(self, genres):
        self.genres = genres

    def set_authors(self, authors):
        self.authors = authors

    def set_language(self, language):
        self.language = language

    def set_description(self, description):
        self.description = description

    def set_url_img(self, url_img):
        self.url_img = url_img

    def set_publisher(self, publisher):
        self.publisher = publisher

    def set_publishing_date(self, publishing_date):
        self.publishing_date = publishing_date

    def set_page_number(self, page_number):
        self.page_number = page_number

    def set_number_stars_1(self, number_stars_1):
        self.number_stars_1 = number_stars_1

    def set_number_stars_2(self, number_stars_2):
        self.number_stars_2 = number_stars_2

    def set_number_stars_3(self, number_stars_3):
        self.number_stars_3 = number_stars_3

    def set_number_stars_4(self, number_stars_4):
        self.number_stars_4 = number_stars_4

    def set_number_stars_5(self, number_stars_5):
        self.number_stars_5 = number_stars_5

    # Metodo per stampare le informazioni del libro
    def __repr__(self):
        return f"Book(id_book={self.id_book}, title={self.title}, genres={self.genres}, " \
               f"authors={self.authors}, language={self.language}, description={self.description}, " \
               f"url_img={self.url_img}, publisher={self.publisher}, " \
               f"publishing_date={self.publishing_date}, page_number={self.page_number}, " \
               f"number_stars_1={self.number_stars_1}, number_stars_2={self.number_stars_2}, " \
               f"number_stars_3={self.number_stars_3}, number_stars_4={self.number_stars_4}, " \
               f"number_stars_5={self.number_stars_5})"
                
