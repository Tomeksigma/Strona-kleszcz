import React, { useState, useEffect } from 'react';
import { client, urlFor } from './sanity';

// --- IKONY ---
const MenuIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>;
const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>;
const AlertIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-accent mb-2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>;
const DownloadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>;

// --- KOMPONENTY ---
const SensitiveImage = ({ src, alt }) => {
    const [isRevealed, setIsRevealed] = useState(false);
    return (
        <div className="relative rounded-xl overflow-hidden shadow-md bg-gray-200 aspect-video flex flex-col justify-center items-center">
            <img 
                src={src} 
                alt={alt} 
                className={`w-full h-full object-cover smooth-transition ${isRevealed ? '' : 'blur-img'}`} 
            />
            {!isRevealed && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-white p-6 text-center">
                    <AlertIcon />
                    <h3 className="font-bold text-lg mb-2">Treść wrażliwa</h3>
                    <p className="text-sm mb-4 max-w-xs">To zdjęcie przedstawia objawy ugryzienia lub widok wbitego kleszcza, co dla niektórych może być niepokojące.</p>
                    <button 
                        onClick={() => setIsRevealed(true)}
                        className="bg-brand hover:bg-brand-dark text-white px-6 py-2 rounded-full font-medium transition"
                    >
                        Pokaż zdjęcie
                    </button>
                </div>
            )}
        </div>
    );
};

// --- WIDOKI ---
const HomeView = ({ changeView }) => {
    // Stan na artykuły z Sanity
    const [articles, setArticles] = useState([]);
    // Nowy stan przechowujący aktualnie kliknięty artykuł (null oznacza, że żaden nie jest otwarty)
    const [selectedArticle, setSelectedArticle] = useState(null);

    useEffect(() => {
        client.fetch('*[_type == "article"]')
            .then((data) => setArticles(data))
            .catch(console.error);
    }, []);

    // Blokowanie przewijania strony pod spodem, gdy okienko jest otwarte
    useEffect(() => {
        if (selectedArticle) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [selectedArticle]);

    return (
        <div className="space-y-12 animate-fade-in relative">
            <div className="bg-brand text-white rounded-3xl p-8 md:p-12 shadow-xl flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2 space-y-6">
                    <span className="bg-brand-accent text-brand-dark px-3 py-1 rounded-full text-sm font-bold tracking-wide">KAMPANIA 2026</span>
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">Zrozumieć kleszcze, chronić zdrowie.</h1>
                    <p className="text-brand-light text-lg">Edukujemy uczniów, wspieramy nauczycieli i zwiększamy świadomość o chorobach odkleszczowych w całej Polsce.</p>
                    <div className="flex flex-wrap gap-4 pt-2">
                        <button onClick={() => changeView('knowledge')} className="bg-white text-brand-dark px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition shadow-lg">Baza Wiedzy</button>
                        <button onClick={() => changeView('competition')} className="bg-transparent border-2 border-white px-6 py-3 rounded-full font-bold hover:bg-white/10 transition">Weź udział w konkursie</button>
                    </div>
                </div>
                <div className="md:w-1/2">
                    <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800" alt="Las" className="rounded-2xl shadow-2xl object-cover h-64 w-full" />
                </div>
            </div>

            <section>
                <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-brand inline-block pb-2">Aktualności leśne</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {articles.length > 0 ? (
                        articles.map((article) => (
                            <div 
                                key={article._id} 
                                // Dodano zdarzenie onClick i kursor wskazujący na klikalność
                                onClick={() => setSelectedArticle(article)}
                                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 cursor-pointer flex flex-col transform hover:-translate-y-1"
                            >
                                {article.mainImage && (
                                    <img 
                                        src={urlFor(article.mainImage).width(400).url()} 
                                        alt={article.title}
                                        className="w-full h-48 object-cover rounded-lg mb-4"
                                    />
                                )}
                                <h3 className="font-bold text-xl mb-2 text-brand-dark">{article.title}</h3>
                                <p className="text-gray-600 mb-4 text-sm flex-grow">
                                    {article.content ? article.content.substring(0, 100) + '...' : 'Brak treści...'}
                                </p>
                                <span className="text-brand font-bold text-sm mt-auto inline-block">
                                    Czytaj więcej &rarr;
                                </span>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 italic">Brak nowych wiadomości. Dodaj pierwszy artykuł w panelu!</p>
                    )}
                </div>
            </section>

            {/* --- WYSKAKUJĄCE OKIENKO (MODAL) --- */}
            {selectedArticle && (
                <div 
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-fade-in"
                    onClick={() => setSelectedArticle(null)} // Zamknięcie po kliknięciu w ciemne tło
                >
                    <div 
                        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative flex flex-col"
                        onClick={(e) => e.stopPropagation()} // Zapobiega zamknięciu, gdy klikniesz w sam tekst
                    >
                        {selectedArticle.mainImage && (
                            <div className="relative w-full h-64 sm:h-80 shrink-0">
                                <img 
                                    src={urlFor(selectedArticle.mainImage).url()} 
                                    alt={selectedArticle.title}
                                    className="w-full h-full object-cover rounded-t-2xl"
                                />
                                {/* Przycisk zamknięcia nałożony na zdjęcie */}
                                <button 
                                    onClick={() => setSelectedArticle(null)}
                                    className="absolute top-4 right-4 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 transition-colors duration-300"
                                >
                                    <CloseIcon />
                                </button>
                            </div>
                        )}
                        
                        <div className="p-8 sm:p-10">
                            {!selectedArticle.mainImage && (
                                <div className="flex justify-end mb-4">
                                    <button onClick={() => setSelectedArticle(null)} className="text-gray-400 hover:text-gray-800 transition">
                                        <CloseIcon />
                                    </button>
                                </div>
                            )}
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-6 leading-tight">
                                {selectedArticle.title}
                            </h2>
                            {/* whitespace-pre-wrap zapewnia, że akapity i entery z Sanity będą respektowane */}
                            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">
                                {selectedArticle.content}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
const KnowledgeView = () => {
    // Stan przechowujący nasze dane z Sanity
    const [knowledgeData, setKnowledgeData] = useState(null);

    // Pobieranie danych przy załadowaniu zakładki
    useEffect(() => {
        // Zauważ [0] na końcu - pobieramy pierwszy i jedyny dokument tego typu!
        client.fetch('*[_type == "knowledgeBase"][0]') 
            .then((data) => setKnowledgeData(data))
            .catch(console.error);
    }, []);

    // Pokazujemy leśny ekran ładowania, dopóki dane nie spłyną z chmury
    if (!knowledgeData) {
        return (
            <div className="text-center py-20 animate-fade-in">
                <span className="text-4xl block mb-4">🌲</span>
                <p className="text-xl font-bold text-green-800">Przeszukiwanie leśnych ksiąg...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto mb-12">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">{knowledgeData.headerTitle}</h1>
                <p className="text-gray-600">{knowledgeData.headerDescription}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-brand-dark flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-brand-light text-brand flex items-center justify-center">1</span>
                        {knowledgeData.section1Title}
                    </h2>
                    <p className="text-gray-700 leading-relaxed">{knowledgeData.section1Text}</p>
                    
                    <h2 className="text-2xl font-bold text-brand-dark flex items-center gap-2 pt-4">
                        <span className="w-8 h-8 rounded-full bg-brand-light text-brand flex items-center justify-center">2</span>
                        {knowledgeData.section2Title}
                    </h2>
                    <p className="text-gray-700 leading-relaxed">{knowledgeData.section2Text}</p>
                </div>

                <div className="space-y-6">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold mb-3 text-gray-800">{knowledgeData.sensitiveImageTitle}</h3>
                        {/* Bezpieczne renderowanie zdjęcia z rozmyciem */}
                        {knowledgeData.sensitiveImage && (
                            <SensitiveImage 
                                src={urlFor(knowledgeData.sensitiveImage).url()} 
                                alt={knowledgeData.sensitiveImageTitle} 
                            />
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-brand-light p-8 rounded-2xl mt-12">
                <h2 className="text-2xl font-bold text-brand-dark mb-4">{knowledgeData.prophylaxisTitle}</h2>
                <ul className="space-y-4">
                    {/* Dynamiczne mapowanie listy z Sanity */}
                    {knowledgeData.prophylaxisList && knowledgeData.prophylaxisList.map((rule, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 mt-2 rounded-full bg-brand"></div>
                            <p><strong>{rule.ruleTitle}:</strong> {rule.ruleText}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const EducationView = () => (
    <div className="space-y-12 animate-fade-in">
        <div className="text-center max-w-2xl mx-auto mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Strefa Edukacji</h1>
            <p className="text-gray-600">Darmowe materiały do pobrania dla szkół. Wybierz odpowiednią sekcję.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border-t-4 border-blue-500 rounded-xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Dla Uczniów</h2>
                <p className="text-gray-600 mb-6">Materiały napisane prostym językiem, kolorowe grafiki i quizy, które pomogą zrozumieć zagrożenie w przyjazny sposób.</p>
                <ul className="space-y-3 mb-6">
                    <li className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <span>Komiks: "Przygody w lesie" (PDF)</span>
                        <button className="text-brand hover:text-brand-dark"><DownloadIcon /></button>
                    </li>
                    <li className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <span>Plakat do powieszenia w pokoju</span>
                        <button className="text-brand hover:text-brand-dark"><DownloadIcon /></button>
                    </li>
                </ul>
            </div>

            <div className="bg-white border-t-4 border-brand rounded-xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Dla Nauczycieli</h2>
                <p className="text-gray-600 mb-6">Kompleksowe konspekty lekcji, scenariusze warsztatów oraz szczegółowe dane naukowe oparte na wytycznych sanepidu.</p>
                <ul className="space-y-3 mb-6">
                    <li className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <span>Scenariusz lekcji: Biologia (45 min)</span>
                        <button className="text-brand hover:text-brand-dark"><DownloadIcon /></button>
                    </li>
                    <li className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <span>Prezentacja multimedialna (.pptx)</span>
                        <button className="text-brand hover:text-brand-dark"><DownloadIcon /></button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
);

const CompetitionView = () => (
    <div className="space-y-8 animate-fade-in">
        <div className="bg-brand-dark text-white rounded-2xl p-8 md:p-12 text-center shadow-lg">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">Konkurs Plastyczny "Bezpieczny Las"</h1>
            <p className="text-brand-light text-lg max-w-2xl mx-auto">
                Zaprojektuj ulotkę ostrzegającą przed kleszczami i wygraj atrakcyjne nagrody dla siebie i swojej klasy!
            </p>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-brand inline-block pb-2">Zasady Konkursu</h2>
            <ul className="space-y-4 text-gray-700 mb-8">
                <li className="flex items-start gap-3"><div className="w-2 h-2 mt-2 rounded-full bg-brand"></div><p>Konkurs skierowany jest do uczniów szkół podstawowych.</p></li>
                <li className="flex items-start gap-3"><div className="w-2 h-2 mt-2 rounded-full bg-brand"></div><p>Praca musi być wykonana samodzielnie dowolną techniką plastyczną (format A4).</p></li>
                <li className="flex items-start gap-3"><div className="w-2 h-2 mt-2 rounded-full bg-brand"></div><p>Termin nadsyłania prac mija <strong>30 czerwca 2026 roku</strong>.</p></li>
            </ul>
            <div className="text-center">
                {/* Zmieniono button na link pobierający z zaktualizowanym tekstem */}
                <a 
                    href="/public/REGULAMIN OGÓLNOPOLSKIEGO KONKURSU EDUKACYJNEGO.pdf" 
                    download
                    className="inline-block bg-brand hover:bg-brand-dark text-white font-bold py-3 px-8 rounded-lg shadow-md transition-transform transform hover:scale-105"
                >
                    Pobierz regulamin konkursu (PDF)
                </a>
            </div>
        </div>
    </div>
);

const QuizView = () => {
    const [step, setStep] = useState('intro');
    const [fullName, setFullName] = useState('');
    const [consent, setConsent] = useState(false);
    const [email, setEmail] = useState('');
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [isSending, setIsSending] = useState(false);
    
    // Nowe stany do obsługi wylosowanych pytań
    const [activeQuestions, setActiveQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);

    // Baza 20 pytań
    const allQuestions = [
        { q: "Jak najlepiej ubrać się do lasu?", options: ["Krótkie spodenki i sandały", "Długie, jasne spodnie i zakryte buty", "Ciemne, luźne ubrania"], correct: 1 },
        { q: "Jaki jest prawidłowy sposób usunięcia kleszcza?", options: ["Posmarowanie go masłem", "Wykręcenie go palcami", "Wyciągnięcie pęsetą prosto do góry"], correct: 2 },
        { q: "Przed którą chorobą chroni szczepionka?", options: ["Borelioza", "Kleszczowe Zapalenie Mózgu (KZM)", "Babeszjoza"], correct: 1 },
        { q: "Gdzie najczęściej przebywają kleszcze?", options: ["Skaczą z wysokich drzew", "W trawach i niskich krzewach", "Tylko na bagnach"], correct: 1 },
        { q: "Co zrobić od razu po powrocie z lasu?", options: ["Dokładnie obejrzeć całe ciało", "Zjeść posiłek", "Wypić gorącą herbatę"], correct: 0 },
        { q: "Rumień wędrujący to najczęstszy objaw:", options: ["Boreliozy", "Alergii słonecznej", "KZM"], correct: 0 },
        { q: "Jakiej wielkości jest kleszcz w stadium nimfy?", options: ["Wielkości ziarnka maku", "Wielkości monety", "Wielkości mrówki"], correct: 0 },
        { q: "Kiedy kleszcze są najbardziej aktywne?", options: ["Tylko latem w południe", "Wiosną i jesienią, rano i późnym popołudniem", "Zimą w nocy"], correct: 1 },
        { q: "Czy kleszcze giną zimą?", options: ["Tak, wszystkie giną", "Nie, zapadają w letarg lub są aktywne powyżej 4°C", "Uciekają do ciepłych krajów"], correct: 1 },
        { q: "Co stosujemy na skórę i ubrania, by odstraszyć kleszcze?", options: ["Krem z filtrem", "Repelenty (np. z DEET lub Ikarydyną)", "Oliwkę dla dzieci"], correct: 1 },
        { q: "Które miejsca na ciele kleszcze lubią najbardziej?", options: ["Zimne i suche", "Ciepłe, wilgotne i dobrze ukrwione (np. pachwiny)", "Tylko owłosioną skórę głowy"], correct: 1 },
        { q: "Co należy zrobić ze skórą po usunięciu kleszcza?", options: ["Przemyć wodą utlenioną lub środkiem dezynfekującym", "Polać wrzątkiem", "Zakleić plastrem rozgrzewającym"], correct: 0 },
        { q: "W jaki sposób kleszcz lokalizuje żywiciela?", options: ["Dzięki doskonałemu wzrokowi", "Reagując na dwutlenek węgla, ciepło i zapach potu", "Słysząc kroki z dużej odległości"], correct: 1 },
        { q: "Czy każde ugryzienie kleszcza oznacza zakażenie?", options: ["Tak", "Nie, zależy to od tego, czy kleszcz był nosicielem i jak długo był wbity", "Tylko u dzieci"], correct: 1 },
        { q: "Borelioza to choroba:", options: ["Wirusowa", "Bakteryjna", "Grzybicza"], correct: 1 },
        { q: "KZM to choroba:", options: ["Wirusowa", "Bakteryjna", "Pasożytnicza"], correct: 0 },
        { q: "Zabierając psa do lasu, powinniśmy:", options: ["Zabezpieczyć go specjalnymi kroplami lub obrożą", "Ubrać mu sweterek", "Smarować go masłem"], correct: 0 },
        { q: "Babeszjoza to choroba odkleszczowa, która jest szczególnie groźna dla:", options: ["Ptaków", "Psów", "Wiewiórek"], correct: 1 },
        { q: "Jak długo należy obserwować miejsce po ugryzieniu kleszcza?", options: ["Przez 1 dzień", "Tylko do momentu usunięcia", "Nawet do 30 dni pod kątem wystąpienia rumienia"], correct: 2 },
        { q: "Jakim ruchem wyciągamy kleszcza pęsetą?", options: ["Powolnym wykręcaniem", "Zdecydowanym pociągnięciem pionowo do góry", "Pociągnięciem w bok"], correct: 1 }
    ];

    const handleStart = (e) => {
        e.preventDefault();
        if (fullName.trim() && consent) {
            // Losowanie i wybór dokładnie 10 pytań
            const shuffled = [...allQuestions].sort(() => Math.random() - 0.5).slice(0, 10);
            setActiveQuestions(shuffled);
            setStep('quiz');
        }
    };

    const handleAnswer = (index) => {
        if (index === activeQuestions[currentQuestion].correct) {
            setScore(s => s + 1);
        }
        if (currentQuestion < activeQuestions.length - 1) {
            setCurrentQuestion(c => c + 1);
        } else {
            setStep('results');
        }
    };

    const resetQuiz = () => {
        setStep('intro');
        setFullName('');
        setConsent(false);
        setCurrentQuestion(0);
        setScore(0);
        setEmail('');
        setIsEmailSent(false);
        setActiveQuestions([]);
    };

    const handleSendEmail = (e) => {
        e.preventDefault();
        if (email.trim()) {
            setIsSending(true);
            setTimeout(() => {
                setIsSending(false);
                setIsEmailSent(true);
            }, 1500);
        }
    };

    // Obliczenia (wynik z 10 pytań)
    const percentage = activeQuestions.length > 0 ? (score / activeQuestions.length) * 100 : 0;
    const passed = percentage >= 60;

    return (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center animate-fade-in">
            {step === 'intro' && (
                <div className="bg-white p-10 rounded-2xl shadow-lg max-w-xl w-full border-t-4 border-green-600">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Wielki Quiz o Kleszczach</h1>
                    <p className="text-gray-600 mb-8">Odpowiedz na 10 wylosowanych pytań. Zdobądź minimum 60% (6/10), aby otrzymać imienny certyfikat!</p>
                    <form onSubmit={handleStart} className="space-y-5 text-left">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Imię i nazwisko (do certyfikatu)</label>
                            <input 
                                type="text" 
                                required 
                                value={fullName} 
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
                                placeholder="Np. Jan Kowalski"
                            />
                        </div>
                        <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg border border-gray-100">
                            <input 
                                type="checkbox" 
                                required 
                                id="consent"
                                checked={consent}
                                onChange={(e) => setConsent(e.target.checked)}
                                className="mt-1 w-5 h-5 text-green-600 cursor-pointer"
                            />
                            <label htmlFor="consent" className="text-sm text-gray-600 cursor-pointer">
                                Wyrażam zgodę na przetwarzanie podanych przeze mnie danych w celu wygenerowania imiennego dyplomu ukończenia quizu.
                            </label>
                        </div>
                        <button 
                            type="submit" 
                            disabled={!fullName.trim() || !consent}
                            className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-xl transition-colors disabled:opacity-50"
                        >
                            Losuj pytania i Rozpocznij &rarr;
                        </button>
                    </form>
                </div>
            )}

            {step === 'quiz' && activeQuestions.length > 0 && (
                <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg max-w-2xl w-full border-t-4 border-yellow-500">
                    <div className="mb-8 flex justify-between items-center text-sm font-bold text-gray-400 uppercase">
                        <span>Pytanie {currentQuestion + 1} / 10</span>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">Punkty: {score}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-8 leading-relaxed">
                        {activeQuestions[currentQuestion].q}
                    </h2>
                    <div className="space-y-4">
                        {activeQuestions[currentQuestion].options.map((opt, i) => (
                            <button 
                                key={i} 
                                onClick={() => handleAnswer(i)}
                                className="w-full text-left p-5 rounded-xl border-2 border-gray-100 hover:border-green-500 hover:bg-green-50 font-medium text-gray-700 text-lg transition-all"
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {step === 'results' && (
                <div className="bg-white p-12 rounded-2xl shadow-lg max-w-xl w-full border-t-4 border-green-600">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Twój Wynik</h1>
                    <div className={`text-6xl font-black mb-6 ${passed ? 'text-green-600' : 'text-red-500'}`}>
                        {percentage}%
                    </div>
                    {passed ? (
                        <div className="animate-fade-in">
                            <p className="text-xl text-gray-700 mb-8">Wspaniale, <span className="font-bold">{fullName}</span>! Zdałeś!</p>
                            <button 
                                onClick={() => setStep('certificate')}
                                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white text-lg font-bold py-4 px-6 rounded-xl shadow-lg hover:scale-105 transition-transform"
                            >
                                Odbierz swój dyplom 🎓
                            </button>
                        </div>
                    ) : (
                        <div className="animate-fade-in">
                            <p className="text-lg text-gray-700 mb-8">Niestety, zabrakło Ci odrobiny wiedzy. Wymagane jest 60%.</p>
                            <button 
                                onClick={resetQuiz}
                                className="w-full border-2 border-green-600 text-green-600 hover:bg-green-50 text-lg font-bold py-4 px-6 rounded-xl transition-colors"
                            >
                                Spróbuj jeszcze raz (nowe pytania) 🔄
                            </button>
                        </div>
                    )}
                </div>
            )}

            {step === 'certificate' && (
                <div className="max-w-3xl w-full animate-fade-in">
                    <div className="bg-white p-8 md:p-16 rounded-sm shadow-2xl border-8 border-double border-green-800 relative mb-8">
                        <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
                            <span className="text-[200px]">🌲</span>
                        </div>
                        <div className="relative z-10 space-y-6">
                            <h2 className="text-lg font-bold text-gray-400 uppercase tracking-widest mb-10">
                                Kampania Edukacyjna "Uwaga Kleszcz!"
                            </h2>
                            <div className="py-6">
                                <h1 className="text-4xl md:text-5xl font-serif text-green-900 font-bold mb-10">
                                    Dyplom eksperta leśnego
                                </h1>
                                <p className="text-gray-600 text-xl mb-4">Niniejszym zaświadcza się, że</p>
                                <p className="text-3xl md:text-4xl font-black text-gray-800 border-b-2 border-green-300 pb-2 inline-block px-12 italic">
                                    {fullName}
                                </p>
                                <p className="text-gray-700 text-lg mt-10 max-w-xl mx-auto leading-relaxed">
                                    pomyślnie ukończył(a) test wiedzy z zakresu profilaktyki, występowania oraz zapobiegania zagrożeniom związanym z chorobami odkleszczowymi z wynikiem {score}/10.
                                </p>
                            </div>
                            <div className="flex flex-col md:flex-row justify-between items-center md:items-end mt-16 pt-8 border-t border-gray-200 text-sm text-gray-500 font-medium gap-6">
                                <div className="text-center md:text-left">
                                    <p className="mb-1">Data wydania:</p>
                                    <p className="text-gray-800 text-lg">{new Date().toLocaleDateString('pl-PL')}</p>
                                </div>
                                <div className="text-5xl bg-yellow-100 p-4 rounded-full shadow-inner">🏅</div>
                                <div className="text-center md:text-right">
                                    <p className="mb-1">Wynik testu:</p>
                                    <p className="text-green-700 text-xl font-bold">{percentage}%</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-blue-500 print:hidden">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Pobierz swój dyplom</h3>
                        {!isEmailSent ? (
                            <form onSubmit={handleSendEmail} className="max-w-md mx-auto space-y-4">
                                <input 
                                    type="email" 
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="twoj.adres@email.pl" 
                                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none text-center"
                                />
                                <button 
                                    type="submit"
                                    disabled={isSending || !email.trim()}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors disabled:opacity-50"
                                >
                                    {isSending ? "Wysyłanie..." : "Wyślij dyplom na e-mail 📩"}
                                </button>
                            </form>
                        ) : (
                            <div className="py-6 animate-fade-in">
                                <div className="text-5xl mb-4">✅</div>
                                <h3 className="text-2xl font-bold text-green-600 mb-2">Wysłano!</h3>
                                <p className="text-gray-700">Sprawdź skrzynkę odbiorczą (i SPAM).</p>
                            </div>
                        )}
                        <button onClick={resetQuiz} className="mt-8 text-sm text-gray-400 hover:text-green-700 transition underline font-medium">
                            Rozwiąż quiz ponownie
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- GŁÓWNY KOMPONENT ---
export default function App() {
    const [currentView, setCurrentView] = useState('home');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        setIsMobileMenuOpen(false);
    }, [currentView]);

    const navItems = [
        { id: 'home', label: 'Strona Główna' },
        { id: 'knowledge', label: 'Baza Wiedzy' },
        { id: 'education', label: 'Strefa Edukacji' },
        { id: 'competition', label: 'Konkurs' },
        { id: 'quiz', label: 'Quiz' },
    ];

    const renderView = () => {
        switch(currentView) {
            case 'home': return <HomeView changeView={setCurrentView} />;
            case 'knowledge': return <KnowledgeView />;
            case 'education': return <EducationView />;
            case 'competition': return <CompetitionView />;
            case 'quiz': return <QuizView />;
            default: return <HomeView changeView={setCurrentView} />;
        }
    };

    return (
        <div className="min-h-screen flex flex-col font-sans text-gray-800 pb-32 md:pb-28">
            {/* Pasek Nawigacyjny */}
            <nav className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20">
                        <div className="flex items-center cursor-pointer" onClick={() => setCurrentView('home')}>
                            <div className="w-10 h-10 bg-brand rounded-lg flex items-center justify-center text-white font-bold text-xl mr-3">K</div>
                            <span className="font-bold text-xl text-gray-800 tracking-tight">Uwaga Kleszcz<span className="text-brand">!</span></span>
                        </div>
                        
                        <div className="hidden md:flex items-center space-x-1">
                            {navItems.map(item => (
                                <button 
                                    key={item.id}
                                    onClick={() => setCurrentView(item.id)}
                                    className={`px-4 py-2 rounded-md font-medium transition ${currentView === item.id ? 'text-brand bg-brand-light' : 'text-gray-600 hover:text-brand hover:bg-gray-50'}`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>

                        <div className="md:hidden flex items-center">
                            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600 hover:text-brand p-2">
                                {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                            </button>
                        </div>
                    </div>
                </div>

                {isMobileMenuOpen && (
                    <div className="md:hidden bg-white border-t">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navItems.map(item => (
                                <button 
                                    key={item.id}
                                    onClick={() => setCurrentView(item.id)}
                                    className={`block w-full text-left px-3 py-4 rounded-md font-medium ${currentView === item.id ? 'text-brand bg-brand-light' : 'text-gray-600'}`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </nav>
            {/* Miejsce na renderowany widok */}
            <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 bg-gray-50">
                {renderView()}
            </main>
            
            {/* --- PRZYPIĘTY PASEK NA DOLE (STALE WIDOCZNY) --- */}
           {/* --- PRZYPIĘTY PASEK NA DOLE (STALE WIDOCZNY) --- */}
            <div className="fixed bottom-0 left-0 w-full z-50 shadow-[0_-5px_15px_-3px_rgba(0,0,0,0.1)]">
                
                {/* Sekcja patronatów - drastycznie zmniejszone paddingi (py-1.5) */}
                <section className="bg-white py-1.5 md:py-2 border-t border-gray-200">
                    {/* Zwiększono max-w, by pomieścić 8 logotypów */}
                    <div className="max-w-7xl mx-auto px-4 text-center">
                        {/* Zmniejszony margines dolny (mb-1) i mniejszy tekst */}
                        <h3 className="text-gray-400 font-bold uppercase tracking-widest mb-1 text-[10px]">
                            Patronaty Honorowe i Partnerzy
                        </h3>
                        {/* Zmniejszony gap, aby loga zmieściły się w jednym rzędzie */}
                        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
                            {/* Logo Lasy Państwowe - skorygowana wielkość (h-8) */}
                            <img 
                                src="/LogoLP.svg"
                                alt="Lasy Państwowe" 
                                className="h-8 md:h-10 object-contain hover:scale-125 transition-transform duration-300"
                            />
                            {/* Logo Państwowa Inspekcja Sanitarna - skorygowana wielkość (h-12) */}
                            <img 
                                src="/PANSTWOWA-INSPEKCJA-SANIT.webp" 
                                alt="Państwowa Inspekcja Sanitarna" 
                                className="h-12 md:h-16 object-contain hover:scale-125 transition-transform duration-300"
                            />
                            
                            {/* Nowe logotypy z obrazka */}
                            <img src="/Fundusze Europejskie.png" alt="Fundusze Europejskie" className="h-8 md:h-10 object-contain hover:scale-125 transition-transform duration-300" />
                            <img src="/Rzeczpospolita Polska.png" alt="Rzeczpospolita Polska" className="h-8 md:h-10 object-contain hover:scale-125 transition-transform duration-300" />
                            <img src="/NCBR.png" alt="NCBR" className="h-8 md:h-10 object-contain hover:scale-125 transition-transform duration-300" />
                            <img src="/UE.png" alt="Unia Europejska" className="h-8 md:h-10 object-contain hover:scale-125 transition-transform duration-300" />
                            <img src="/Uczelnie Przyszłości.png" alt="Uczelnie Przyszłości" className="h-8 md:h-10 object-contain hover:scale-125 transition-transform duration-300" />
                            <img src="/Warszawski_Uniwersytet_Medyczny.png" alt="Warszawski Uniwersytet Medyczny" className="h-8 md:h-10 object-contain hover:scale-125 transition-transform duration-300" />
                        </div>
                    </div>
                </section>

                {/* Stopka serwisu - minimalnie chudsza */}
                <footer className="bg-gray-900 text-gray-400 py-1.5 md:py-2 text-center text-[10px]">
                    &copy; 2026 Kampania Edukacyjna "Uwaga Kleszcz!". Wszelkie prawa zastrzeżone. {/*[cite: 4] */}
                </footer>
            </div>
        </div>
               
    );
}

           