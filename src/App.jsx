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
        client.fetch('*[_type == "article"] | order(_createdAt desc)')
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

    const quickLinks = [
        { id: 'knowledge', name: 'Baza Wiedzy', icon: '📖', color: 'bg-emerald-100 text-emerald-700' },
        { id: 'curiosities', name: 'Ciekawostki', icon: '🔍', color: 'bg-amber-100 text-amber-700' },
        { id: 'education', name: 'Strefa Edukacji', icon: '🎓', color: 'bg-blue-100 text-blue-700' },
        { id: 'map', name: 'Mapa Zachorowań', icon: '🗺️', color: 'bg-rose-100 text-rose-700' },
        { id: 'simulator', name: 'Symulator', icon: '▶️', color: 'bg-purple-100 text-purple-700' },
        { id: 'competition', name: 'Konkurs', icon: '🏆', color: 'bg-teal-100 text-teal-700' },
    ];

    return (
        <div className="flex flex-col bg-gray-50 pb-12 animate-fade-in">
            {/* Nowa Główna sekcja (Hero) wzorowana na nowym designie */}
            <div className="relative w-full h-[500px] flex flex-col justify-center px-6 md:px-12 py-16 bg-[#122217] overflow-hidden rounded-3xl shadow-xl mt-4">
                <div className="absolute inset-0 bg-[url('/las_main.jpg')] bg-cover bg-center opacity-40"></div>
                <div className="absolute inset-0 bg-black/30"></div>
                
                <div className="relative z-10 max-w-4xl mx-auto w-full text-center md:text-left">
                    <span className="text-[#d48b48] font-bold tracking-widest text-xs uppercase mb-4 block">
                        Projekt edukacyjny 2026
                    </span>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight mb-6">
                        Zauważ ryzyko, zanim kleszcz zauważy Ciebie
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 italic font-serif mb-10 max-w-2xl">
                        Edukujemy uczniów, wspieramy nauczycieli i dostarczamy interaktywne narzędzia do walki z chorobami odkleszczowymi.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                        <button 
                            onClick={() => changeView('quiz')} 
                            className="bg-[#EFA75D] hover:bg-[#d98b48] text-gray-900 px-8 py-3 rounded-full font-bold transition shadow-lg"
                        >
                            Rozwiąż Wielki Quiz
                        </button>
                        <button 
                            onClick={() => changeView('competition')} 
                            className="bg-transparent border border-gray-400 text-gray-200 px-8 py-3 rounded-full font-bold hover:bg-white/10 hover:border-white transition"
                        >
                            Weź udział w konkursie
                        </button>
                    </div>
                </div>
            </div>

            {/* Siatka odnośników */}
            <section className="py-12 px-2 max-w-7xl mx-auto w-full -mt-8 relative z-20">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {quickLinks.map((link) => (
                        <div 
                            key={link.id} 
                            onClick={() => changeView(link.id)}
                            className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-transform hover:-translate-y-1 flex flex-col items-center text-center gap-3 border border-gray-100 cursor-pointer"
                        >
                            <div className={`p-4 rounded-full text-2xl ${link.color}`}>
                                {link.icon}
                            </div>
                            <span className="font-bold text-gray-800 text-sm">{link.name}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Aktualności z Sanity */}
            <section className="py-8 px-4 max-w-7xl mx-auto w-full">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-brand inline-block pb-2">Aktualności leśne</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {articles.length > 0 ? (
                        articles.map((article) => (
                            <div 
                                key={article._id} 
                                onClick={() => setSelectedArticle(article)}
                                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition cursor-pointer flex flex-col group transform hover:-translate-y-1"
                            >
                                {article.mainImage && (
                                    <img src={urlFor(article.mainImage).width(600).height(400).url()} alt={article.title} className="w-full h-48 object-cover group-hover:scale-105 transition duration-500" />
                                )}
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="font-bold text-xl mb-3 text-gray-900">{article.title}</h3>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.content ? article.content.substring(0, 100) + '...' : ''}</p>
                                    <span className="text-brand font-bold text-sm mt-auto flex items-center gap-1 group-hover:text-brand-dark">
                                        Czytaj więcej &rarr;
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 italic col-span-3">Brak nowych wiadomości. Dodaj pierwszy artykuł w panelu Sanity!</p>
                    )}
                </div>
            </section>

            {/* Modal dla artykułu */}
            {selectedArticle && (
                <div 
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-fade-in"
                    onClick={() => setSelectedArticle(null)}
                >
                    <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative flex flex-col" onClick={e => e.stopPropagation()}>
                        {selectedArticle.mainImage && (
                            <div className="relative w-full h-64 sm:h-80 shrink-0">
                                <img src={urlFor(selectedArticle.mainImage).url()} alt={selectedArticle.title} className="w-full h-full object-cover rounded-t-2xl" />
                                <button onClick={() => setSelectedArticle(null)} className="absolute top-4 right-4 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 transition-colors">
                                    <CloseIcon />
                                </button>
                            </div>
                        )}
                        <div className="p-8 sm:p-10">
                            {!selectedArticle.mainImage && (
                                <div className="flex justify-end mb-4">
                                    <button onClick={() => setSelectedArticle(null)} className="text-gray-400 hover:text-gray-800 transition"><CloseIcon /></button>
                                </div>
                            )}
                            <h2 className="text-3xl font-extrabold text-gray-800 mb-6">{selectedArticle.title}</h2>
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
const CuriositiesView = () => {
    const [discoveredIds, setDiscoveredIds] = useState([]);
    const [activeFilter, setActiveFilter] = useState('Wszystkie');
    const [guessOpen, setGuessOpen] = useState(null); // ID karty z otwartym panelem zgadywania
    const [choices, setChoices] = useState({}); // Przechowuje wybory użytkownika: { cardId: optionIndex }
    const [scoredIds, setScoredIds] = useState([]); // ID kart, w których użytkownik zgadł poprawnie za pierwszym razem

    // Zaktualizowana baza danych o strukturę zgadywania
    const curiositiesData = [
        { 
            id: 1, category: 'Biologia kleszcza', title: 'Czy kleszcz jest owadem?', 
            answer: 'Nie. Kleszcze są pajęczakami. Dorosłe osobniki mają osiem odnóży, a larwy sześć.', 
            explanation: 'Kleszcze należą do pajęczaków (Arachnida), razem z pająkami i roztoczami. Owady mają trzy pary odnóży, a dorosłe kleszcze — cztery pary; larwa kleszcza ma dopiero trzy pary.', 
            meaning: 'Nie myl kleszczy z owadami — to wpływa na rozumienie ich biologii i sposobu żerowania.', 
            source: 'ECDC – disease vectors',
            guessOptions: ['Tak, to owad latający', 'Nie, to rodzaj skorupiaka', 'Nie, należą do pajęczaków'],
            correctGuessIndex: 2
        },
        { 
            id: 2, category: 'Biologia kleszcza', title: 'Czy kleszcze skaczą z drzew?', 
            answer: 'Nie. Kleszcze nie skaczą i nie latają. Zwykle oczekują na żywiciela na roślinności, wykorzystując zachowanie nazywane questing.', 
            explanation: 'Kleszcz wspięty na trawę lub krzew wyciąga przednie odnóża i czeka na kontakt z przechodzącym żywicielem (questing). Nie spada celowo z gałęzi drzew.', 
            meaning: 'Kontakt z trawą i krzewami prowadzi do ukłucia — kleszcz czeka właśnie tam, a nie na drzewie.', 
            source: 'ECDC – disease vectors',
            guessOptions: ['Nie — nie skaczą ani nie latają', 'Tak, czekają na gałęziach', 'Skaczą tylko dorosłe'],
            correctGuessIndex: 0
        },
        { 
            id: 3, category: 'Biologia kleszcza', title: 'Jak kleszcz wykrywa człowieka?', 
            answer: 'Wykorzystuje narządy zmysłowe, między innymi narząd Hallera na pierwszej parze odnóży, który pomaga odbierać bodźce środowiskowe.', 
            explanation: 'Narząd Hallera to struktura zmysłowa na przednich odnóżach kleszcza, odbierająca bodźce chemiczne i fizyczne z otoczenia. Pomaga kleszczowi namierzyć żywiciela bez wzroku.', 
            meaning: 'Kleszcz wykrywa żywiciela bez wzroku podobnego do ludzkiego — nie da się go „oszukać” samym cichym chodzeniem.', 
            source: 'ECDC – disease vectors',
            guessOptions: ['Wykorzystuje doskonały wzrok', 'Przez narząd Hallera (węch/temperatura)', 'Reaguje na hałas'],
            correctGuessIndex: 1
        },
        { 
            id: 4, category: 'Biologia kleszcza', title: 'Dlaczego małe kleszcze są trudne do zauważenia?', 
            answer: 'Są niezwykle małe (nimfy mają ok. 1-1.5 mm) i ich ukłucie jest bezbolesne dzięki substancjom znieczulającym.', 
            explanation: 'Ślina kleszcza zawiera koktajl substancji, w tym znieczulające, co sprawia, że moment wkłucia umyka naszej uwadze.', 
            meaning: 'Samo oglądanie ciała musi być bardzo dokładne, zwłaszcza w zgięciach stawów.', 
            source: 'WHO',
            guessOptions: ['Zmieniają kolor na taki jak skóra', 'Są bardzo małe, a ich ślina znieczula', 'Atakują tylko w nocy'],
            correctGuessIndex: 1
        },
        { 
            id: 5, category: 'Biologia kleszcza', title: 'Czy kleszcz rośnie podczas pobierania krwi?', 
            answer: 'Tak, jego objętość może wzrosnąć nawet stukrotnie.', 
            explanation: 'Samica kleszcza przed żerowaniem jest płaska, ale po kilkudniowym posiłku pęcznieje, przybierając kształt szarej fasolki.', 
            meaning: 'Duży, szary kleszcz oznacza, że przebywał w skórze co najmniej kilkadziesiąt godzin.', 
            source: 'PZH',
            guessOptions: ['Tak, pęcznieje i staje się szary', 'Nie, jego rozmiar się nie zmienia', 'Tak, ale tylko w ciągu pierwszej godziny'],
            correctGuessIndex: 0
        },
        { 
            id: 6, category: 'Kleszcze i środowisko', title: 'Dlaczego kleszcze lubią wilgotne miejsca?', 
            answer: 'Wysoka wilgotność jest im niezbędna do przetrwania; w suchym środowisku szybko tracą wodę.', 
            explanation: 'Kleszcze są bardzo wrażliwe na wysychanie (desykację). Dlatego w upalne, suche dni schodzą niżej do ściółki, gdzie jest wilgotniej.', 
            meaning: 'Zacienione, wilgotne lasy liściaste to miejsca o najwyższym ryzyku spotkania kleszcza.', 
            source: 'Lasy Państwowe',
            guessOptions: ['Łatwiej im tam pływać', 'Unikają słońca, bo je razi', 'Jest im niezbędna do przetrwania (szybko schną)'],
            correctGuessIndex: 2
        },
        { 
            id: 7, category: 'Kleszcze i środowisko', title: 'Jak długo żyje kleszcz?', 
            answer: 'Cykl życiowy kleszcza pospolitego w Polsce trwa zazwyczaj od 2 do 3 lat.', 
            explanation: 'Aby przejść przez wszystkie stadia (larwa, nimfa, dorosły osobnik), kleszcz musi znaleźć trzech żywicieli.', 
            meaning: 'Kleszcz, którego spotkasz, mógł już wcześniej żerować na mniejszych zwierzętach (np. gryzoniach), nabywając patogeny.', 
            source: 'ECDC',
            guessOptions: ['Od kilku tygodni do miesiąca', 'Od 2 do 3 lat w Polsce', 'Żyje tylko jeden sezon letni'],
            correctGuessIndex: 1
        },
        { 
            id: 8, category: 'Kleszcze i środowisko', title: 'Ile jaj może złożyć samica?', 
            answer: 'Najedzona samica kleszcza pospolitego składa od 2000 do 3000 jaj.', 
            explanation: 'Po złożeniu pakietu jaj w wilgotnej ściółce samica ginie. Z jaj wylęgają się sześcionożne larwy.', 
            meaning: 'Populacja kleszczy w sprzyjających warunkach może wzrastać lawinowo.', 
            source: 'PZH',
            guessOptions: ['Około 10-20', 'Kilkaset', 'Od 2000 do 3000'],
            correctGuessIndex: 2
        },
        { 
            id: 9, category: 'Kleszcze i środowisko', title: 'Czy kleszcze są aktywne tylko latem?', 
            answer: 'Nie, stają się aktywne, gdy temperatura przekracza 4-5°C.', 
            explanation: 'Ze względu na łagodne zimy, sezon aktywności kleszczy wydłuża się i obecnie mogą atakować nawet w grudniu czy styczniu.', 
            meaning: 'Zabezpieczaj siebie i zwierzęta domowe niemal przez cały rok, a nie tylko w wakacje.', 
            source: 'WHO',
            guessOptions: ['Tak, hibernują od września do maja', 'Nie, stają się aktywne już przy 4-5°C', 'Są aktywne tylko podczas deszczu'],
            correctGuessIndex: 1
        },
        { 
            id: 10, category: 'Fakty medyczne i naukowe', title: 'Czy KZM można zakazić się bez ukłucia?', 
            answer: 'Tak, rzadziej można zakazić się drogą pokarmową, np. pijąc niepasteryzowane mleko zakażonych kóz, owiec czy krów.', 
            explanation: 'Wirus Kleszczowego Zapalenia Mózgu może przenikać do mleka zakażonych zwierząt gospodarskich.', 
            meaning: 'Unikaj surowego, niepasteryzowanego mleka z niesprawdzonych źródeł.', 
            source: 'PZH',
            guessOptions: ['Tak, pijąc surowe mleko zakażonych zwierząt', 'Nie, zakażenie wymaga kontaktu krwi z krwią', 'Można zarazić się przez dotyk kleszcza'],
            correctGuessIndex: 0
        },
        { 
            id: 11, category: 'Fakty medyczne i naukowe', title: 'Ile gatunków kleszczy stwierdzono w Polsce?', 
            answer: 'W Polsce żyje na stałe około 19 gatunków kleszczy.', 
            explanation: 'Dla ludzi najgroźniejszy jest kleszcz pospolity (Ixodes ricinus) oraz kleszcz łąkowy (Dermacentor reticulatus), znany z przenoszenia babeszjozy u psów.', 
            meaning: 'Zagrożenie jest zróżnicowane w zależności od terenu i żywiciela.', 
            source: 'Narodowy Instytut Zdrowia Publicznego',
            guessOptions: ['Tylko jeden', 'Około 19 gatunków', 'Ponad 500'],
            correctGuessIndex: 1
        },
        { 
            id: 12, category: 'Fakty medyczne i naukowe', title: 'Jak naukowcy badają kleszcze w terenie?', 
            answer: 'Najczęściej używają metody "flagowania", przeciągając jasny, flanelowy materiał po roślinności.', 
            explanation: 'Kleszcze w postawie oczekującej przyczepiają się do przesuwanego materiału, co pozwala badaczom na ich zliczenie i zebranie do badań genetycznych.', 
            meaning: 'To udowadnia, że szczelny, gładki ubiór utrudnia kleszczom przyczepienie się do Ciebie.', 
            source: 'Lasy Państwowe',
            guessOptions: ['Metodą flagowania (jasny materiał po trawie)', 'Używają pułapek z pożywieniem', 'Łapią je w nocy z użyciem latarek UV'],
            correctGuessIndex: 0
        }
    ];

    const categories = ['Wszystkie', 'Biologia kleszcza', 'Kleszcze i środowisko', 'Fakty medyczne i naukowe'];
    
    // Filtrowanie i logika postępu
    const filteredData = activeFilter === 'Wszystkie' ? curiositiesData : curiositiesData.filter(c => c.category === activeFilter);
    const progressPercentage = (discoveredIds.length / curiositiesData.length) * 100;
    
    // Zliczanie dla przycisków filtrujących
    const getCategoryCount = (cat) => cat === 'Wszystkie' ? curiositiesData.length : curiositiesData.filter(c => c.category === cat).length;

    const openGuessPanel = (id) => {
        setGuessOpen(id);
    };

    const handleGuessPick = (id, optionIndex) => {
        const curiosity = curiositiesData.find(c => c.id === id);
        
        // Zapisujemy wybór użytkownika
        setChoices(prev => ({ ...prev, [id]: optionIndex }));
        
        // Zaznaczamy kartę jako odkrytą
        if (!discoveredIds.includes(id)) {
            setDiscoveredIds([...discoveredIds, id]);
        }
        
        // Zamykamy panel zgadywania
        setGuessOpen(null);
        
        // Jeśli odpowiedź jest poprawna, przyznajemy punkt
        if (optionIndex === curiosity.correctGuessIndex) {
            setScoredIds(prev => [...prev, id]);
        }
    };

    const handleRandomReveal = () => {
        const undiscovered = curiositiesData.filter(c => !discoveredIds.includes(c.id));
        if (undiscovered.length > 0) {
            const random = undiscovered[Math.floor(Math.random() * undiscovered.length)];
            openGuessPanel(random.id);
        }
    };

    const handleReset = () => {
        setDiscoveredIds([]);
        setScoredIds([]);
        setChoices({});
        setGuessOpen(null);
    };

    return (
        <div className="animate-fade-in bg-[#F8F9F5] min-h-screen pb-20">
            {/* Header / Hero Section (ciemne tło) */}
            <div className="bg-[#0F291E] w-full px-6 md:px-12 py-16 text-white text-center md:text-left">
                <div className="max-w-7xl mx-auto">
                    <span className="text-[#EFA75D] font-bold tracking-widest text-xs uppercase mb-4 block">Ciekawostki</span>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-4">
                        Czy wiesz, że...? 12 zaskakujących faktów o kleszczach
                    </h1>
                    <p className="text-gray-300 text-lg max-w-2xl">
                        Odkryj naukowe tajemnice kleszczy. Sprawdź, co jest faktem, a co tylko popularnym mitem.
                    </p>
                </div>
            </div>

            {/* Usunięto klasę -mt-8 aby komunikaty nie nachodziły na Hero */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 relative z-10">
                
                {/* Komunikaty ostrzegawcze (żółty i zielony box) */}
                <div className="space-y-4 mb-8">
                    <div className="bg-orange-50 border-l-4 border-orange-400 p-6 text-sm text-gray-800 rounded-r-lg shadow-sm">
                        <strong>Twoje postępy nie są zapisywane.</strong> Strona nie zapisuje żadnych danych — wyniki modułów i quizów są przechowywane wyłącznie w Twojej przeglądarce do momentu odświeżenia lub zamknięcia strony. Po odświeżeniu trzeba zacząć od nowa, dlatego przejdź wszystkie moduły i pobierz certyfikat podczas jednej wizyty.
                    </div>
                    <div className="bg-green-50 border-l-4 border-green-600 p-6 text-sm text-gray-800 rounded-r-lg shadow-sm">
                        Materiały udostępnione w serwisie „Uwaga Kleszcz!” mają charakter edukacyjny i informacyjny. Nie stanowią indywidualnej porady medycznej, diagnozy ani zaleceń terapeutycznych.<br/><br/>
                        W przypadku wystąpienia niepokojących objawów lub podejrzenia choroby odkleszczowej skontaktuj się z lekarzem. Nie opieraj decyzji dotyczących diagnostyki i leczenia wyłącznie na informacjach zamieszczonych na stronie.
                    </div>
                </div>

                {/* Panel Sterowania i Pasek Postępu */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
                        <div className="font-bold text-gray-800">
                            Odkryto {discoveredIds.length} z {curiositiesData.length} ciekawostek
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <button onClick={handleRandomReveal} className="px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition">Losuj ciekawostkę</button>
                            <button className="px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition">Tryb pełnoekranowy (dla nauczyciela)</button>
                            <button onClick={handleReset} className="px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition">Reset postępu</button>
                        </div>
                    </div>
                    {/* Pasek progressu */}
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-[#143B2A] h-2.5 rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
                    </div>
                    
                    {/* Kapsułki filtrowania */}
                    <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-100">
                        {categories.map(cat => (
                            <button 
                                key={cat}
                                onClick={() => setActiveFilter(cat)}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition ${activeFilter === cat ? 'bg-[#143B2A] text-white' : 'border border-gray-300 text-gray-600 hover:bg-gray-50'}`}
                            >
                                {cat === 'Wszystkie' ? 'Wszystkie' : cat} ({getCategoryCount(cat)})
                            </button>
                        ))}
                    </div>
                </div>

                {/* Siatka Kart Ciekawostek */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredData.map((item) => {
                        const isRevealed = discoveredIds.includes(item.id);
                        const isGuessing = guessOpen === item.id;
                        const userChoice = choices[item.id];
                        const isCorrect = userChoice === item.correctGuessIndex;

                        return (
                            <div key={item.id} className="bg-[#FCFDF9] border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col h-full transition-all hover:shadow-md">
                                <div className="flex justify-between items-start mb-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                                    <span className="flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                                        {item.category}
                                    </span>
                                    <span>#{item.id}</span>
                                </div>
                                <h3 className="text-xl font-serif font-bold text-gray-900 mb-6">{item.title}</h3>
                                
                                <div className="mt-auto flex-grow flex flex-col justify-end">
                                    
                                    {/* Stan 1: Zamknięta, nie zgaduje */}
                                    {!isRevealed && !isGuessing && (
                                        <button 
                                            onClick={() => openGuessPanel(item.id)}
                                            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-xl transition-colors mt-4"
                                        >
                                            Odkryj ciekawostkę
                                        </button>
                                    )}

                                    {/* Stan 2: Tryb zgadywania (Zgadnij zanim odkryjesz) */}
                                    {isGuessing && !isRevealed && (
                                        <div className="mt-4 animate-fade-in">
                                            <p className="text-sm font-bold text-gray-700 mb-3">Zgadnij, zanim odkryjesz:</p>
                                            <div className="space-y-2">
                                                {item.guessOptions.map((opt, i) => (
                                                    <button 
                                                        key={i} 
                                                        onClick={() => handleGuessPick(item.id, i)}
                                                        className="block w-full rounded-lg border border-gray-200 bg-white p-3 text-left text-sm hover:bg-gray-50 transition-colors"
                                                    >
                                                        {opt}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Stan 3: Odkryta - Odpowiedzi */}
                                    {isRevealed && (
                                        <div className="space-y-4 animate-fade-in text-sm text-gray-700 mt-4">
                                            <p><strong>Odpowiedź:</strong> {item.answer}</p>
                                            
                                            {userChoice !== undefined && (
                                                <div className={`font-medium text-xs ${isCorrect ? 'text-green-700' : 'text-red-600'}`}>
                                                    {isCorrect 
                                                        ? '✓ Zgadłeś za pierwszym razem — punkt!' 
                                                        : '✗ To nie ta odpowiedź — poprawna jest wyżej. Treść i tak została odkryta.'}
                                                </div>
                                            )}
                                            
                                            <p className="text-gray-600">{item.explanation}</p>
                                            
                                            <div className="bg-[#F0F4EC] p-4 rounded-lg border border-[#D5E3C8]">
                                                <p><strong>Co to znaczy dla Ciebie:</strong> {item.meaning}</p>
                                            </div>
                                            
                                            <p className="text-xs text-gray-500 underline underline-offset-2">Źródło: {item.source}</p>
                                            
                                            <div className="flex gap-2 pt-2">
                                                {scoredIds.includes(item.id) && (
                                                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold">+1 punkt</span>
                                                )}
                                                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold">✓ Poznane</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Sekcja blokady Miniquizu końcowego */}
                <div className="mt-16 mb-8 border-t border-gray-200 pt-10">
                    <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">Miniquiz końcowy</h2>
                    <p className="text-gray-600 text-lg">
                        Quiz odblokuje się po odkryciu wszystkich 12 ciekawostek (brakuje Ci {curiositiesData.length - discoveredIds.length}).
                    </p>
                </div>

            </div>
        </div>
    );
};
// --- WIDOKI NARZĘDZIOWE (MAPA I SYMULATOR) ---

const MapView = () => {
    const [selectedRegion, setSelectedRegion] = useState(null);

    // Symulacja danych z pliku zachorowania-2024.json
    const regionData = {
        "Mazowieckie": { borelioza: 3452, kzm: 18, risk: "Wysoki" },
        "Małopolskie": { borelioza: 2100, kzm: 25, risk: "Bardzo Wysoki" },
        "Śląskie": { borelioza: 1850, kzm: 12, risk: "Średni" },
        "Podlaskie": { borelioza: 1640, kzm: 85, risk: "Ekstremalny" },
        "Pomorskie": { borelioza: 2230, kzm: 14, risk: "Wysoki" },
        "Domyślne": { borelioza: "brak dokładnych danych", kzm: "brak", risk: "Nieznany" }
    };

    const regions = ["Mazowieckie", "Małopolskie", "Śląskie", "Podlaskie", "Pomorskie", "Wielkopolskie", "Dolnośląskie"];

    const currentStats = selectedRegion && regionData[selectedRegion] ? regionData[selectedRegion] : regionData["Domyślne"];

    return (
        <div className="space-y-8 animate-fade-in max-w-6xl mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-sm font-bold tracking-wide border border-rose-200">
                    Aktualizowane na rok 2024
                </span>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#122217] mt-6 mb-4">
                    Mapa Zachorowań Odkleszczowych
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Wybierz województwo, aby sprawdzić poziom zagrożenia. Pamiętaj, że kleszcze występują w całej Polsce, niezależnie od regionu.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Interaktywna lista województw (zamiast pliku SVG wojewodztwa-granice.json) */}
                <div className="md:col-span-2 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Wybierz region</h3>
                    <div className="flex flex-wrap gap-3">
                        {regions.map(woj => (
                            <button
                                key={woj}
                                onClick={() => setSelectedRegion(woj)}
                                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 border ${
                                    selectedRegion === woj
                                        ? "bg-rose-500 text-white border-rose-500 shadow-md transform scale-105"
                                        : "bg-gray-50 text-gray-700 hover:border-rose-300 hover:bg-rose-50"
                                }`}
                            >
                                {woj}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Panel statystyk */}
                <div className="bg-[#122217] rounded-2xl shadow-lg overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-white/10">
                        <h3 className="text-2xl font-serif font-bold text-white">
                            {selectedRegion || "Wybierz region"}
                        </h3>
                        <p className="text-gray-400 text-sm mt-1">
                            {selectedRegion ? "Szczegółowe dane statystyczne" : "Kliknij województwo na liście"}
                        </p>
                    </div>
                    
                    <div className="p-6 space-y-6 flex-grow bg-white">
                        {selectedRegion ? (
                            <>
                                <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 flex justify-between items-center">
                                    <div>
                                        <p className="text-sm text-gray-600 font-medium">Borelioza</p>
                                        <p className="text-3xl font-bold text-gray-900">{currentStats.borelioza}</p>
                                    </div>
                                    <span className="text-4xl">🦠</span>
                                </div>
                                <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 flex justify-between items-center">
                                    <div>
                                        <p className="text-sm text-gray-600 font-medium">KZM</p>
                                        <p className="text-3xl font-bold text-gray-900">{currentStats.kzm}</p>
                                    </div>
                                    <span className="text-4xl">🧠</span>
                                </div>
                                <div className="pt-4 border-t border-gray-100">
                                    <p className="text-sm text-gray-500 mb-2">Poziom zagrożenia:</p>
                                    <span className="px-4 py-1.5 bg-red-100 text-red-800 text-sm font-bold rounded-full uppercase tracking-wider">
                                        {currentStats.risk}
                                    </span>
                                </div>
                            </>
                        ) : (
                            <div className="h-full flex items-center justify-center text-gray-400 text-center py-12">
                                Wybierz województwo, aby wyświetlić statystyki zgłoszeń.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const SimulatorView = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isFinished, setIsFinished] = useState(false);
    const [score, setScore] = useState(0);

    const scenarios = [
        {
            question: "Wybierasz się do lasu. Jak się ubierasz?",
            options: [
                { text: "Krótkie spodenki i sandały (jest gorąco!)", correct: false, feedback: "Narażasz odsłoniętą skórę na bezpośredni kontakt z kleszczami." },
                { text: "Długie, jasne spodnie, skarpetki naciągnięte na nogawki", correct: true, feedback: "Świetnie! Jasny kolor ułatwi dostrzeżenie kleszcza, a zakryte nogi utrudnią mu dostęp." },
                { text: "Ciemny dres z krótkim rękawem", correct: false, feedback: "Na ciemnym ubraniu trudniej zauważyć kleszcza, a krótkie rękawy to ryzyko." }
            ]
        },
        {
            question: "Co zabierasz ze sobą do plecaka?",
            options: [
                { text: "Tylko butelkę wody", correct: false, feedback: "Woda jest ważna, ale zapomniałeś o ochronie chemicznej!" },
                { text: "Repelent z DEET lub Ikarydyną", correct: true, feedback: "Idealnie! Repelent to podstawa zabezpieczenia przed spacerem." },
                { text: "Krem z wysokim filtrem UV", correct: false, feedback: "Krem UV jest ważny latem, ale nie uchroni Cię przed pajęczakami." }
            ]
        },
        {
            question: "Wracasz z lasu do domu. Co robisz jako pierwsze?",
            options: [
                { text: "Kładę się na łóżku, żeby odpocząć", correct: false, feedback: "Kleszcz może przejść na pościel lub znaleźć na tobie miejsce do wkłucia!" },
                { text: "Piję gorącą herbatę", correct: false, feedback: "Herbata to świetny pomysł, ale dopiero po przebraniu się i umyciu." },
                { text: "Biorę prysznic i dokładnie sprawdzam całe ciało", correct: true, feedback: "Wzorowo! Szybki prysznic zmyje luźne kleszcze, a lustracja pozwoli usunąć te, które się wbiły." }
            ]
        }
    ];

    const currentScenario = scenarios[currentStep];

    const handleSelect = (idx) => {
        if (selectedOption !== null) return;
        setSelectedOption(idx);
        if (currentScenario.options[idx].correct) setScore(s => s + 1);
    };

    const nextStep = () => {
        if (currentStep < scenarios.length - 1) {
            setCurrentStep(c => c + 1);
            setSelectedOption(null);
        } else {
            setIsFinished(true);
        }
    };

    const restart = () => {
        setCurrentStep(0);
        setSelectedOption(null);
        setIsFinished(false);
        setScore(0);
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl animate-fade-in">
            <div className="text-center mb-10">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">▶️</div>
                <h1 className="text-4xl font-serif font-bold text-[#122217] mb-2">Symulator Spaceru</h1>
                <p className="text-gray-600">Podejmij właściwe decyzje i sprawdź, czy jesteś gotowy na bezpieczny spacer po lesie.</p>
            </div>

            {!isFinished ? (
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="h-2 w-full bg-gray-100">
                        <div 
                            className="h-full bg-purple-500 transition-all duration-500" 
                            style={{ width: `${((currentStep) / scenarios.length) * 100}%` }}
                        />
                    </div>
                    
                    <div className="p-8 md:p-12">
                        <div className="mb-4 text-sm font-bold text-purple-600 uppercase tracking-widest">
                            Krok {currentStep + 1} z {scenarios.length}
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 leading-tight">
                            {currentScenario.question}
                        </h2>

                        <div className="space-y-4">
                            {currentScenario.options.map((option, idx) => {
                                const isSelected = selectedOption === idx;
                                const isCorrect = option.correct;
                                const showResult = selectedOption !== null;
                                
                                let btnStyle = "bg-white border-2 border-gray-200 hover:border-purple-300 text-gray-700";
                                if (showResult) {
                                    if (isCorrect) btnStyle = "bg-green-50 border-2 border-green-500 text-green-900";
                                    else if (isSelected) btnStyle = "bg-red-50 border-2 border-red-500 text-red-900";
                                    else btnStyle = "bg-gray-50 border-2 border-gray-200 text-gray-400 opacity-50";
                                }

                                return (
                                    <button
                                        key={idx}
                                        onClick={() => handleSelect(idx)}
                                        disabled={showResult}
                                        className={`w-full p-5 rounded-xl text-left font-medium transition-all duration-300 ${btnStyle}`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-lg">{option.text}</span>
                                            {showResult && isCorrect && <span className="text-green-600 text-2xl">✓</span>}
                                            {showResult && isSelected && !isCorrect && <span className="text-red-600 text-2xl">✗</span>}
                                        </div>
                                        {showResult && (isSelected || isCorrect) && (
                                            <div className={`mt-3 pt-3 border-t text-sm ${isCorrect ? 'border-green-200 text-green-800' : 'border-red-200 text-red-800'}`}>
                                                {option.feedback}
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {selectedOption !== null && (
                            <div className="mt-8 flex justify-end animate-fade-in">
                                <button 
                                    onClick={nextStep}
                                    className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8 py-4 font-bold shadow-lg transition-transform hover:scale-105"
                                >
                                    {currentStep < scenarios.length - 1 ? 'Kolejny krok &rarr;' : 'Zakończ spacer'} 
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 text-center p-12">
                    <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-6 text-5xl">
                        {score === scenarios.length ? '🏆' : '⚠️'}
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Podsumowanie Spaceru</h2>
                    <div className="text-6xl font-black text-purple-600 mb-6">
                        {score} / {scenarios.length}
                    </div>
                    <p className="text-xl text-gray-600 mb-10 max-w-lg mx-auto">
                        {score === scenarios.length 
                            ? "Jesteś idealnie przygotowany! Złote zasady profilaktyki masz w małym palcu." 
                            : "Udało Ci się wrócić, ale popełniłeś kilka błędów. Pamiętaj o ubiorze, repelentach i oględzinach ciała!"}
                    </p>
                    <button onClick={restart} className="bg-gray-900 text-white rounded-full px-8 py-4 font-bold hover:bg-gray-800 transition">
                        Spróbuj ponownie
                    </button>
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
        { id: 'home', label: 'Start' },
        { id: 'knowledge', label: 'Baza Wiedzy' },
        { id: 'curiosities', label: 'Ciekawostki' },
        { id: 'education', label: 'Strefa Edukacji' },
        { id: 'teachers', label: 'Dla nauczycieli' },
        { id: 'map', label: 'Mapa' },
        { id: 'simulator', label: 'Symulator' },
        { id: 'competition', label: 'Konkurs' },
        { id: 'quiz', label: 'Quiz' },
    ];

    const renderView = () => {
        switch(currentView) {
            case 'home': return <HomeView changeView={setCurrentView} />;
            case 'knowledge': return <KnowledgeView />;
            case 'curiosities': return <CuriositiesView />;
            case 'education': return <EducationView />;
            case 'teachers': return <TeachersView />;
            case 'map': return <MapView />;
            case 'simulator': return <SimulatorView />;
            case 'competition': return <CompetitionView />;
            case 'quiz': return <QuizView />;
            case 'map': return <MapView />;
            case 'simulator': return <SimulatorView />;
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