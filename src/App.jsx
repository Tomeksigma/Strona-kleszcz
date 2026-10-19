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
                <button className="inline-block bg-brand hover:bg-brand-dark text-white font-bold py-3 px-8 rounded-lg shadow-md transition-transform transform hover:scale-105">
                    Pobierz formularz zgłoszeniowy (PDF)
                </button>
            </div>
        </div>
    </div>
);

const SurveyView = () => (
    <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
        <div className="bg-white p-10 rounded-2xl shadow-lg max-w-xl w-full border-t-4 border-brand-accent">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Ankieta Badawcza</h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
                Twoja opinia jest dla nas bardzo ważna! Prosimy o wypełnienie krótkiej ankiety dotyczącej świadomości zagrożeń związanych z kleszczami. Wyniki pomogą nam ulepszyć materiały edukacyjne.
            </p>
            <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLScXXxr2TyR4qYtIfAi6pi89OYarsqzaCtVKkM_Yp70kAm5i-g/viewform" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-brand hover:bg-brand-dark text-white text-lg font-bold py-4 px-8 rounded-full shadow-md transition-transform transform hover:scale-105"
            >
                Przejdź do formularza Google &rarr;
            </a>
            <p className="text-sm text-gray-400 mt-6">Ankieta jest całkowicie anonimowa. Wypełnienie zajmuje ok. 3 minuty.</p>
        </div>
    </div>
);

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
        { id: 'survey', label: 'Ankieta' },
    ];

    const renderView = () => {
        switch(currentView) {
            case 'home': return <HomeView changeView={setCurrentView} />;
            case 'knowledge': return <KnowledgeView />;
            case 'education': return <EducationView />;
            case 'competition': return <CompetitionView />;
            case 'survey': return <SurveyView />;
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
            <div className="fixed bottom-0 left-0 w-full z-50 shadow-[0_-5px_15px_-3px_rgba(0,0,0,0.1)]">
                
                {/* Sekcja patronatów */}
                <section className="bg-white py-1.5 md:py-2 border-t border-gray-200">
                    <div className="max-w-5xl mx-auto px-4 text-center">
                        <h3 className="text-gray-400 font-bold uppercase tracking-widest mb-1 text-[10px]">
                            Patronaty Honorowe i Partnerzy
                        </h3>
                        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                            {/* Logo Lasy Państwowe */}
                            <img 
                                src="/LogoLP.svg" 
                                alt="Lasy Państwowe" 
                                className="h-10 md:h-14 object-contain hover:scale-125 transition-transform duration-300"
                            />
                            {/* Logo Państwowa Inspekcja Sanitarna */}
                            <img 
                                src="/PANSTWOWA-INSPEKCJA-SANIT.webp" 
                                alt="Państwowa Inspekcja Sanitarna" 
                                className="h-16 md:h-24 object-contain hover:scale-125 transition-transform duration-300"
                            />
                        </div>
                    </div>
                </section>

                {/* Stopka serwisu */}
                <footer className="bg-gray-900 text-gray-400 py-1.5 md:py-2 text-center text-[10px]">
                    &copy; 2026 Kampania Edukacyjna "Uwaga Kleszcz!". Wszelkie prawa zastrzeżone. {/*[cite: 3] */}
                </footer>
            </div>
        </div>
    );
}

           