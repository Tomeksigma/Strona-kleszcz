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
    const [articles, setArticles] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState(null);

    useEffect(() => {
        client.fetch('*[_type == "article"]')
            .then((data) => setArticles(data))
            .catch(console.error);
    }, []);

    useEffect(() => {
        if (selectedArticle) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [selectedArticle]);

    return (
        <div className="space-y-12 animate-fade-in relative pb-12">
            {/* Nowa Główna sekcja (Hero) z tłem lasu - Rozszerzona */}
            <div className="relative w-full h-[600px] flex flex-col justify-center px-6 md:px-12 py-16 bg-[#122217] overflow-hidden rounded-3xl shadow-xl">
                <div className="absolute inset-0 bg-[url('/image_79b4eb.jpg')] bg-cover bg-center opacity-50 mix-blend-overlay"></div>
                <div className="relative z-10 max-w-4xl mx-auto w-full text-center md:text-left">
                    <span className="text-[#d48b48] font-bold tracking-widest text-xs uppercase mb-4 block">
                        Projekt edukacyjny 2026
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight mb-6">
                        Zauważ ryzyko, zanim kleszcz zauważy Ciebie
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 italic font-serif mb-10">
                        Nie odkładaj – Działaj! Edukujemy uczniów i wspieramy nauczycieli w całej Polsce.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                        <button 
                            onClick={() => changeView('education')} 
                            className="bg-[#EFA75D] hover:bg-[#d98b48] text-gray-900 px-8 py-3 rounded-full font-bold transition shadow-lg"
                        >
                            Wejdź do Strefy Edukacji
                        </button>
                        <button 
                            onClick={() => changeView('competition')} 
                            className="bg-transparent border border-gray-400 text-gray-200 px-8 py-3 rounded-full font-bold hover:bg-white/10 hover:border-white transition"
                        >
                            Konkurs na mural
                        </button>
                    </div>
                </div>
            </div>

            {/* Siatka odnośników na dole pierwszej strony (bez dodawania pustych podstron) */}
            <section className="mt-16 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { id: 'knowledge', title: 'Baza Wiedzy', desc: 'Najważniejsze informacje o kleszczach i profilaktyce.' },
                        { id: 'education', title: 'Strefa Edukacji', desc: 'Materiały, komiksy i plakaty dla uczniów.' },
                        { id: 'teachers', title: 'Dla nauczycieli', desc: 'Konspekty i interaktywne scenariusze lekcji.' },
                        { id: 'competition', title: 'Konkurs', desc: 'Regulamin i zasady zgłoszeń do konkursu.' },
                        { id: 'quiz', title: 'Wielki Quiz', desc: 'Sprawdź swoją wiedzę i zdobądź certyfikat.' },
                        { id: 'survey', title: 'Ankieta', desc: 'Pomóż nam ulepszyć materiały edukacyjne.' }
                    ].map((item) => (
                        <div 
                            key={item.id} 
                            onClick={() => changeView(item.id)}
                            className="bg-white rounded-2xl p-8 shadow-sm cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-gray-100"
                        >
                            <h3 className="text-2xl font-bold font-serif text-[#143B2A] mb-2">{item.title}</h3>
                            <p className="text-gray-500 text-sm">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Sekcja Aktualności pod odnośnikami */}
            <section className="pt-12 border-t border-gray-200 mt-16">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-brand inline-block pb-2">Aktualności leśne</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {articles.length > 0 ? (
                        articles.map((article) => (
                            <div 
                                key={article._id} 
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
                    onClick={() => setSelectedArticle(null)}
                >
                    <div 
                        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {selectedArticle.mainImage && (
                            <div className="relative w-full h-64 sm:h-80 shrink-0">
                                <img 
                                    src={urlFor(selectedArticle.mainImage).url()} 
                                    alt={selectedArticle.title}
                                    className="w-full h-full object-cover rounded-t-2xl"
                                />
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
    const [knowledgeData, setKnowledgeData] = useState(null);

    useEffect(() => {
        client.fetch('*[_type == "knowledgeBase"][0]') 
            .then((data) => setKnowledgeData(data))
            .catch(console.error);
    }, []);

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

// Nowy wyodrębniony widok edukacji dla Uczniów
const EducationView = () => (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
        <div className="text-center mb-8">
            <h1 className="text-4xl font-serif font-bold text-[#143B2A] mb-4">Strefa Edukacji (Dla Uczniów)</h1>
            <p className="text-gray-600">Darmowe materiały do pobrania przygotowane specjalnie dla Ciebie.</p>
        </div>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8 text-blue-900 text-sm shadow-sm">
            Materiały edukacyjne udostępnione w serwisie »Uwaga Kleszcz!« można bezpłatnie pobierać, drukować i wykorzystywać do celów edukacyjnych.
        </div>

        <div className="bg-white border-t-4 border-[#EFA75D] rounded-xl p-8 shadow-sm">
            <p className="text-gray-600 mb-6">Materiały napisane prostym językiem, kolorowe grafiki i quizy, które pomogą zrozumieć zagrożenie w przyjazny sposób.</p>
            <ul className="space-y-3 mb-6">
                <li className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <span className="font-medium text-[#143B2A]">Komiks: "Przygody w lesie" (PDF)</span>
                    <button className="text-[#EFA75D] hover:text-[#d98b48]"><DownloadIcon /></button>
                </li>
                <li className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <span className="font-medium text-[#143B2A]">Plakat do powieszenia w pokoju</span>
                    <button className="text-[#EFA75D] hover:text-[#d98b48]"><DownloadIcon /></button>
                </li>
            </ul>
        </div>
    </div>
);

// Nowy wyodrębniony widok edukacji dla Nauczycieli
const TeachersView = () => (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
        <div className="text-center mb-8">
            <h1 className="text-4xl font-serif font-bold text-[#143B2A] mb-4">Dla Nauczycieli</h1>
            <p className="text-gray-600">Dwie interaktywne lekcje, konspekty i szczegółowe dane naukowe.</p>
        </div>
        <div className="bg-white border-t-4 border-[#143B2A] rounded-xl p-8 shadow-sm">
            <p className="text-gray-600 mb-6">Kompleksowe konspekty lekcji, scenariusze warsztatów oraz szczegółowe dane naukowe oparte na wytycznych sanepidu.</p>
            <ul className="space-y-3 mb-6">
                <li className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <span className="font-medium text-[#143B2A]">Scenariusz lekcji: Biologia (45 min)</span>
                    <button className="text-[#143B2A] hover:text-green-900"><DownloadIcon /></button>
                </li>
                <li className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <span className="font-medium text-[#143B2A]">Prezentacja multimedialna (.pptx)</span>
                    <button className="text-[#143B2A] hover:text-green-900"><DownloadIcon /></button>
                </li>
            </ul>
        </div>
    </div>
);

// Zaktualizowany widok Konkursu z nowym nagłówkiem
const CompetitionView = () => (
    <div className="space-y-8 animate-fade-in">
        <div className="bg-[#0F291E] text-white rounded-3xl p-8 md:p-16 mb-8 text-center shadow-lg">
            <span className="text-[#d48b48] font-bold tracking-widest text-xs uppercase mb-4 block">OGÓLNOPOLSKI KONKURS EDUKACYJNY</span>
            <h1 className="text-3xl md:text-5xl font-serif font-bold mb-6">
                Konkurs na projekt muralu
            </h1>
            <div className="text-gray-300 text-sm max-w-3xl mx-auto mt-6">
                <p className="mb-2">Dla uczniów kształcących się w zawodzie technik leśnik. Pytania kieruj na: <a href="mailto:s097260@student.wum.edu.pl" className="text-white font-bold hover:underline">s097260@student.wum.edu.pl</a></p>
                <p className="mb-2 mt-6">Udział w konkursie jest dobrowolny i bezpłatny. Przed zgłoszeniem zapoznaj się z Regulaminem Konkursu oraz Klauzulą informacyjną RODO. Uczestnicy niepełnoletni zobowiązani są do dołączenia zgody przedstawiciela ustawowego.</p>
            </div>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-serif font-bold text-[#143B2A] mb-6">Dokumenty do pobrania</h2>
            <div className="flex flex-col md:flex-row flex-wrap justify-center gap-4">
                <a href="/regulamin-konkursu.pdf" download className="bg-[#F8F9F5] border border-gray-200 hover:bg-[#EAECE1] text-[#143B2A] font-semibold py-3 px-6 rounded-lg transition text-sm">Regulamin Konkursu</a>
                <a href="/formularz-zgloszeniowy.pdf" download className="bg-[#F8F9F5] border border-gray-200 hover:bg-[#EAECE1] text-[#143B2A] font-semibold py-3 px-6 rounded-lg transition text-sm">Formularz zgłoszeniowy</a>
                <a href="/klauzula-rodo.pdf" download className="bg-[#F8F9F5] border border-gray-200 hover:bg-[#EAECE1] text-[#143B2A] font-semibold py-3 px-6 rounded-lg transition text-sm">Klauzula informacyjna RODO</a>
            </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 max-w-4xl mx-auto text-xs text-gray-500 leading-relaxed">
            <strong className="text-gray-700">Prawa autorskie i Galeria:</strong> Prezentowane prace zostały zgłoszone do ogólnopolskiego konkursu edukacyjnego. Prawa autorskie do prac przysługują ich twórcom lub innym uprawnionym podmiotom. Prace są publikowane na podstawie licencji udzielonych Organizatorowi Konkursu.
        </div>
    </div>
);

// Twój Quiz z poprzedniej wiadomości (niezmodyfikowany pod względem mechaniki i pytań)
const QuizView = () => {
    const [step, setStep] = useState('intro');
    const [fullName, setFullName] = useState('');
    
    const [activeQuestions, setActiveQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);

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
        if (fullName.trim()) {
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
        setCurrentQuestion(0);
        setScore(0);
        setActiveQuestions([]);
    };

    const percentage = activeQuestions.length > 0 ? (score / activeQuestions.length) * 100 : 0;
    const passed = percentage >= 70;

    return (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center animate-fade-in">
            {step === 'intro' && (
                <div className="bg-white p-10 rounded-2xl shadow-lg max-w-xl w-full border-t-4 border-green-600">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Wielki Quiz o Kleszczach</h1>
                    <p className="text-gray-600 mb-8">Odpowiedz na 10 wylosowanych pytań. Zdobądź minimum 70% (7/10), aby otrzymać imienny certyfikat!</p>
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
                        
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-xs text-gray-600 mb-4 mt-2">
                            Podane imię i nazwisko zostaną wykorzystane wyłącznie do wygenerowania imiennego certyfikatu w Twojej przeglądarce. Dane nie są zapisywane w bazie ani przesyłane do administratora strony. Certyfikat możesz samodzielnie pobrać na swoje urządzenie.<br/><br/>
                            <strong>Pamiętaj o zapisaniu certyfikatu</strong> – po zakończeniu sesji jego ponowne pobranie może wymagać ponownego rozwiązania quizu.
                        </div>

                        <button 
                            type="submit" 
                            disabled={!fullName.trim()}
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
                            <div className="text-center mb-6">
                                <h3 className="text-2xl font-bold text-green-600 mb-2">Gratulacje! Udało Ci się zaliczyć quiz.</h3>
                                <p className="text-gray-700 mb-4">Możesz teraz wygenerować i pobrać swój certyfikat.</p>
                                <div className="bg-green-50 text-green-800 border border-green-200 p-3 rounded-lg text-sm font-semibold">
                                    Jeżeli bierzesz udział w konkursie edukacyjnym, zachowaj certyfikat, ponieważ będzie potrzebny przy zgłoszeniu.
                                </div>
                            </div>
                            <button 
                                onClick={() => setStep('certificate')}
                                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white text-lg font-bold py-4 px-6 rounded-xl shadow-lg hover:scale-105 transition-transform"
                            >
                                Odbierz swój dyplom 🎓
                            </button>
                        </div>
                    ) : (
                        <div className="animate-fade-in">
                            <p className="text-lg text-gray-700 mb-8">Niestety, zabrakło Ci odrobiny wiedzy. Wymagane jest 70%.</p>
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
                <div className="max-w-4xl w-full animate-fade-in mx-auto">
                    <div className="relative w-full shadow-2xl mb-8 bg-white print:shadow-none">
                        <img 
                            src="/Certyfikat.jpg" 
                            alt="Certyfikat Ukończenia" 
                            className="w-full h-auto rounded-sm block"
                        />
                        <div className="absolute top-[58%] md:top-[59%] left-0 w-full text-center px-4">
                            <p className="text-2xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-800 italic">
                                {fullName}
                            </p>
                        </div>
                        <div className="absolute bottom-[14%] left-[18%] md:bottom-[15%] md:left-[17%]">
                            <p className="text-sm md:text-xl lg:text-2xl font-medium text-gray-800">
                                {new Date().toLocaleDateString('pl-PL')}
                            </p>
                        </div>
                    </div>
                    <div className="mt-8 text-center print:hidden flex flex-col items-center gap-4">
                        <button 
                            onClick={() => window.print()}
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl shadow-md transition-transform transform hover:scale-105"
                        >
                            Zapisz / Wydrukuj dyplom 🖨️
                        </button>
                        <button 
                            onClick={resetQuiz}
                            className="text-sm text-gray-400 hover:text-green-700 transition underline font-medium"
                        >
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

    // Zaktualizowana nawigacja – dodano osobną sekcję dla Nauczycieli zgodnie z prośbą
    const navItems = [
        { id: 'home', label: 'Start' },
        { id: 'knowledge', label: 'Baza Wiedzy' },
        { id: 'education', label: 'Strefa Edukacji' },
        { id: 'teachers', label: 'Dla nauczycieli' },
        { id: 'competition', label: 'Konkurs' },
        { id: 'quiz', label: 'Quiz' },
    ];

    const renderView = () => {
        switch(currentView) {
            case 'home': return <HomeView changeView={setCurrentView} />;
            case 'knowledge': return <KnowledgeView />;
            case 'education': return <EducationView />;
            case 'teachers': return <TeachersView />;
            case 'competition': return <CompetitionView />;
            case 'quiz': return <QuizView />;
            default: return <HomeView changeView={setCurrentView} />;
        }
    };

    return (
        <div className="min-h-screen flex flex-col font-sans text-gray-800 bg-[#F8F9F5]">
            <div className="bg-yellow-400 text-yellow-900 text-center py-2 px-4 text-xs font-bold tracking-wide">
                Strona znajduje się w fazie przygotowania. Część prezentowanych materiałów ma charakter demonstracyjny i nie stanowi jeszcze ostatecznej, zweryfikowanej wersji treści edukacyjnych projektu.
            </div>
            
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
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition ${currentView === item.id ? 'text-brand bg-brand-light' : 'text-gray-600 hover:text-brand hover:bg-gray-50'}`}
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

            <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                {renderView()}
            </main>
            
            <div className="w-full mt-auto border-t border-gray-200">
                <section className="bg-white py-1.5 md:py-2">
                    <div className="max-w-7xl mx-auto px-4 text-center">
                        <h3 className="text-gray-400 font-bold uppercase tracking-widest mb-1 text-[10px]">
                            Patronaty Honorowe i Partnerzy
                        </h3>
                        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
                            <img src="/LogoLP.svg" alt="Lasy Państwowe" className="h-8 md:h-10 object-contain hover:scale-125 transition-transform duration-300" />
                            <img src="/PANSTWOWA-INSPEKCJA-SANIT.webp" alt="Państwowa Inspekcja Sanitarna" className="h-12 md:h-16 object-contain hover:scale-125 transition-transform duration-300" />
                            <img src="/Fundusze Europejskie.png" alt="Fundusze Europejskie" className="h-8 md:h-10 object-contain hover:scale-125 transition-transform duration-300" />
                            <img src="/Rzeczpospolita Polska.png" alt="Rzeczpospolita Polska" className="h-8 md:h-10 object-contain hover:scale-125 transition-transform duration-300" />
                            <img src="/NCBR.png" alt="NCBR" className="h-8 md:h-10 object-contain hover:scale-125 transition-transform duration-300" />
                            <img src="/UE.png" alt="Unia Europejska" className="h-8 md:h-10 object-contain hover:scale-125 transition-transform duration-300" />
                            <img src="/Uczelnie Przyszłości.png" alt="Uczelnie Przyszłości" className="h-8 md:h-10 object-contain hover:scale-125 transition-transform duration-300" />
                            <img src="/Warszawski_Uniwersytet_Medyczny.png" alt="Warszawski Uniwersytet Medyczny" className="h-8 md:h-10 object-contain hover:scale-125 transition-transform duration-300" />
                        </div>
                    </div>
                </section>
                
                <footer className="bg-gray-900 text-gray-400 py-4 text-center text-[10px] md:text-xs">
                    <div className="max-w-7xl mx-auto px-4 flex flex-col gap-3">
                        <div className="flex flex-wrap justify-center gap-4 text-gray-300 font-medium">
                            <a href="/regulamin-serwisu.pdf" download className="hover:text-white transition">Regulamin serwisu</a>
                            <a href="/polityka-prywatnosci.pdf" download className="hover:text-white transition">Polityka prywatności i cookies</a>
                            <a href="/regulamin-konkursu.pdf" download className="hover:text-white transition">Regulamin konkursu</a>
                            <a href="/dokumentacja-konkursowa.pdf" download className="hover:text-white transition">Dokumentacja konkursowa (RODO)</a>
                        </div>
                        <div className="text-gray-500">
                            <p>Administrator strony: Olivia Moritz | E-mail: <a href="mailto:s097260@student.wum.edu.pl" className="text-brand hover:text-brand-light">s097260@student.wum.edu.pl</a></p>
                            <p className="mt-1">&copy; 2026 Kampania Edukacyjna "Uwaga Kleszcz!". Wszelkie prawa zastrzeżone.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}