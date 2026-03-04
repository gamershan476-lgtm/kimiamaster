/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  BrainCircuit, 
  MessageSquare, 
  Youtube, 
  ChevronRight, 
  Search, 
  Menu, 
  X,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Send,
  Sparkles,
  Trophy,
  RefreshCw,
  Music,
  Play,
  Pause,
  Volume2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { chemistryTopics, Topic } from './topics';
import { ChemistryMarkdown, MathRenderer } from './components/MathRenderer';
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

type View = 'dashboard' | 'topic' | 'quiz' | 'chat';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { role: 'ai', text: 'Halo! Saya asisten AI KimiaMaster. Ada yang bisa saya bantu terkait materi kimia hari ini?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Quiz State
  const [quizTopic, setQuizTopic] = useState<Topic | null>(null);
  const [quizQuestion, setQuizQuestion] = useState<any>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizTotal, setQuizTotal] = useState(0);
  const [quizFeedback, setQuizFeedback] = useState<{ correct: boolean, message: string } | null>(null);
  const [isGeneratingQuestion, setIsGeneratingQuestion] = useState(false);
  const [isExpandingContent, setIsExpandingContent] = useState(false);
  const [detailedContent, setDetailedContent] = useState<string | null>(null);
  const [activeMusic, setActiveMusic] = useState<'none' | 'iofi' | 'laufey'>('none');

  const musicSources = {
    iofi: "https://www.youtube.com/embed/5qap5aO4i9A?autoplay=1",
    laufey: "https://www.youtube.com/embed/nUALouCrfRw?autoplay=1"
  };

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDetailedContent(null);
  }, [selectedTopic]);

  const expandContent = async (topic: Topic) => {
    setIsExpandingContent(true);
    try {
      const prompt = `Berikan pembahasan yang SANGAT AMAT LUAS, MENDALAM, DAN LENGKAP tentang topik kimia: "${topic.title}". 
      Indikator: "${topic.indicator}".
      
      ATURAN FORMATTING (WAJIB):
      - Susun jawaban dalam PARAGRAF yang rapi dan terstruktur.
      - Gunakan Heading (##, ###) untuk memisahkan setiap bagian besar.
      - Jangan biarkan teks menumpuk tanpa jeda; berikan baris kosong antar paragraf.
      - Gunakan poin-poin (bullet points) hanya jika diperlukan untuk daftar.
      - Gunakan LaTeX untuk SEMUA rumus dan simbol kimia (misal $H_2O$, $\\Delta H$, dll).
      - Gunakan pecahan yang jelas dengan LaTeX (\\frac{a}{b}).
      - Jangan gunakan simbol aneh atau karakter yang tidak perlu.

      Pembahasan harus mencakup:
      1. Pendahuluan dan Sejarah Penemuan secara naratif.
      2. Konsep Dasar dan Teori Fundamental yang dijelaskan per paragraf.
      3. Mekanisme Reaksi secara mendetail (step-by-step) dengan penjelasan naratif di setiap langkah.
      4. Semua Rumus yang berkaitan dengan penurunan rumusnya yang rapi.
      5. Contoh Soal dan Pembahasan yang sangat kompleks.
      6. Aplikasi dalam Kehidupan Sehari-hari dan Industri secara luas.
      7. Hubungan dengan topik kimia lainnya.
      
      Pastikan penjelasan SANGAT PANJANG, MENDETAIL, DAN KOMPREHENSIF.`;

      const result = await genAI.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: [{ parts: [{ text: prompt }] }],
      });

      setDetailedContent(result.text || "Gagal memuat pembahasan mendalam.");
    } catch (error) {
      console.error(error);
      setDetailedContent("Terjadi kesalahan saat memperluas materi. Silakan coba lagi.");
    } finally {
      setIsExpandingContent(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const filteredTopics = chemistryTopics.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.indicator.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMsg = inputMessage;
    setInputMessage('');
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const model = genAI.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: [{ parts: [{ text: `Anda adalah pakar kimia yang sangat pintar. Bantu pengguna dengan pertanyaan kimia berikut. 
        
        ATURAN JAWABAN:
        1. Susun jawaban dalam PARAGRAF yang rapi. Jangan biarkan teks berantakan atau menumpuk.
        2. Gunakan baris kosong untuk memisahkan antar paragraf agar enak dibaca.
        3. Gunakan LaTeX untuk rumus kimia (misal $H_2O$) dan simbol matematika.
        4. Jelaskan secara mendalam namun tetap mudah dimengerti.
        5. Jika ada langkah-langkah, jelaskan setiap langkah dalam paragraf tersendiri.

        Pertanyaan: ${userMsg}` }] }],
      });
      
      const result = await model;
      const response = result.text || "Maaf, saya tidak bisa memproses permintaan tersebut.";
      setChatMessages(prev => [...prev, { role: 'ai', text: response }]);
    } catch (error) {
      setChatMessages(prev => [...prev, { role: 'ai', text: "Terjadi kesalahan koneksi. Silakan coba lagi." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const generateQuestion = async (topic: Topic) => {
    setIsGeneratingQuestion(true);
    setQuizFeedback(null);
    try {
      const prompt = `Buatlah 1 soal pilihan ganda kimia yang menantang tentang topik "${topic.title}" berdasarkan indikator "${topic.indicator}". 
      Berikan respon dalam format JSON:
      {
        "question": "teks soal",
        "options": ["A", "B", "C", "D"],
        "answer": 0, // index jawaban benar
        "explanation": "penjelasan mendalam mengapa jawaban itu benar"
      }
      Pastikan soal menggunakan bahasa Indonesia yang baik dan benar. Gunakan LaTeX untuk rumus kimia.`;

      const result = await genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [{ parts: [{ text: prompt }] }],
        config: { responseMimeType: "application/json" }
      });

      const data = JSON.parse(result.text || "{}");
      setQuizQuestion(data);
      setQuizTopic(topic);
      setCurrentView('quiz');
    } catch (error) {
      console.error(error);
    } finally {
      setIsGeneratingQuestion(false);
    }
  };

  const handleAnswer = (index: number) => {
    if (quizFeedback) return;
    
    const isCorrect = index === quizQuestion.answer;
    setQuizFeedback({
      correct: isCorrect,
      message: quizQuestion.explanation
    });
    
    if (isCorrect) {
      setQuizScore(prev => prev + 1);
    }
    setQuizTotal(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-slate-900 font-sans">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
              <BrainCircuit size={24} />
            </div>
            <h1 className="font-bold text-xl tracking-tight">KimiaMaster</h1>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          <button 
            onClick={() => { setCurrentView('dashboard'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${currentView === 'dashboard' ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <BookOpen size={20} />
            <span>Materi Belajar</span>
          </button>
          <button 
            onClick={() => { setCurrentView('chat'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${currentView === 'chat' ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <MessageSquare size={20} />
            <span>Asisten AI</span>
          </button>
          <div className="pt-4 pb-2 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
            Statistik Belajar
          </div>
          <div className="px-4 py-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-slate-500">Skor Latihan</span>
              <span className="text-sm font-bold text-emerald-600">{quizScore}/{quizTotal}</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-500 h-full transition-all duration-500" 
                style={{ width: `${quizTotal > 0 ? (quizScore / quizTotal) * 100 : 0}%` }}
              />
            </div>
          </div>

          <div className="pt-6 pb-2 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
            Musik Belajar
          </div>
          <div className="px-4 space-y-2">
            <button 
              onClick={() => setActiveMusic(activeMusic === 'iofi' ? 'none' : 'iofi')}
              className={`w-full flex items-center justify-between px-4 py-2 rounded-xl text-sm transition-all ${activeMusic === 'iofi' ? 'bg-pink-50 text-pink-700 border border-pink-100' : 'bg-slate-50 text-slate-600 border border-transparent hover:bg-slate-100'}`}
            >
              <div className="flex items-center gap-2">
                <Music size={16} />
                <span>Iofi Chill</span>
              </div>
              {activeMusic === 'iofi' ? <Pause size={14} /> : <Play size={14} />}
            </button>
            <button 
              onClick={() => setActiveMusic(activeMusic === 'laufey' ? 'none' : 'laufey')}
              className={`w-full flex items-center justify-between px-4 py-2 rounded-xl text-sm transition-all ${activeMusic === 'laufey' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' : 'bg-slate-50 text-slate-600 border border-transparent hover:bg-slate-100'}`}
            >
              <div className="flex items-center gap-2">
                <Music size={16} />
                <span>Laufey Jazz</span>
              </div>
              {activeMusic === 'laufey' ? <Pause size={14} /> : <Play size={14} />}
            </button>
          </div>
        </nav>

        {activeMusic !== 'none' && (
          <div className="fixed bottom-4 left-4 z-[100] opacity-0 pointer-events-none">
            <iframe 
              width="1" 
              height="1" 
              src={musicSources[activeMusic]} 
              allow="autoplay"
            />
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-72 min-h-screen flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
              <Menu size={20} />
            </button>
            {currentView !== 'dashboard' && (
              <button onClick={() => setCurrentView('dashboard')} className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
                <ArrowLeft size={20} />
              </button>
            )}
            <h2 className="font-semibold text-lg capitalize">
              {currentView === 'dashboard' ? 'Dashboard Materi' : currentView}
            </h2>
          </div>
          
          {currentView === 'dashboard' && (
            <div className="relative hidden md:block w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Cari materi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-100 border-transparent focus:bg-white focus:border-emerald-500 rounded-xl text-sm transition-all outline-none"
              />
            </div>
          )}
        </header>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          <AnimatePresence mode="wait">
            {currentView === 'dashboard' && (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
              >
                {filteredTopics.map((topic) => (
                  <div 
                    key={topic.id}
                    onClick={() => { setSelectedTopic(topic); setCurrentView('topic'); }}
                    className="cursor-pointer group bg-white p-5 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-500/5 transition-all text-left flex flex-col h-full"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">Topik {topic.id}</span>
                      <ChevronRight className="text-slate-300 group-hover:text-emerald-500 transition-colors" size={20} />
                    </div>
                    <h3 className="font-bold text-slate-800 mb-2 group-hover:text-emerald-700 transition-colors">{topic.title}</h3>
                    <p className="text-sm text-slate-500 line-clamp-2 flex-1">{topic.indicator}</p>
                    <div className="mt-4 flex gap-2">
                      <button 
                        onClick={(e) => { e.stopPropagation(); generateQuestion(topic); }}
                        className="flex-1 py-2 bg-slate-50 hover:bg-emerald-600 hover:text-white text-slate-600 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2"
                      >
                        <BrainCircuit size={14} />
                        Latihan Soal
                      </button>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {currentView === 'topic' && selectedTopic && (
              <motion.div 
                key="topic"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-4xl mx-auto space-y-8"
              >
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">Topik {selectedTopic.id}</span>
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">{selectedTopic.title}</h1>
                  </div>
                  
                  <div className="p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-xl mb-8">
                    <h4 className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">Indikator Ujian</h4>
                    <p className="text-amber-900 font-medium italic">{selectedTopic.indicator}</p>
                  </div>

                  <div className="space-y-6 text-slate-700 leading-relaxed">
                    <ChemistryMarkdown content={selectedTopic.content} />
                    
                    {!detailedContent && !isExpandingContent && (
                      <button 
                        onClick={() => expandContent(selectedTopic)}
                        className="w-full py-4 border-2 border-dashed border-emerald-200 rounded-2xl text-emerald-600 font-bold hover:bg-emerald-50 transition-all flex items-center justify-center gap-2 group"
                      >
                        <Sparkles className="group-hover:animate-pulse" size={20} />
                        Perluas Pembahasan (Deep Dive AI)
                      </button>
                    )}

                    {isExpandingContent && (
                      <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                        <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                        <p className="font-bold text-slate-700">AI sedang menyusun pembahasan super lengkap...</p>
                        <p className="text-sm text-slate-400 italic">Ini mungkin memakan waktu beberapa detik karena materinya sangat luas</p>
                      </div>
                    )}

                    {detailedContent && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-8 pt-8 border-t border-slate-100"
                      >
                        <div className="flex items-center gap-2 mb-6 text-emerald-600">
                          <Sparkles size={20} />
                          <h3 className="font-bold uppercase tracking-widest text-sm">Pembahasan Mendalam AI</h3>
                        </div>
                        <ChemistryMarkdown content={detailedContent} />
                      </motion.div>
                    )}
                    
                    {selectedTopic.formula && (
                      <div className="my-8 p-6 bg-slate-900 rounded-2xl text-white overflow-x-auto">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Rumus Utama</h4>
                        <div className="text-2xl py-4 flex justify-center">
                          <MathRenderer math={selectedTopic.formula} block />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-12 pt-8 border-t border-slate-100 flex flex-wrap gap-4">
                    <button 
                      onClick={() => generateQuestion(selectedTopic)}
                      className="flex-1 min-w-[200px] py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-3"
                    >
                      <BrainCircuit size={20} />
                      Mulai Latihan Soal
                    </button>
                    <a 
                      href={`https://www.youtube.com/results?search_query=${encodeURIComponent(selectedTopic.youtubeQuery + ' tutorial kimia')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 min-w-[200px] py-4 bg-red-50 hover:bg-red-100 text-red-600 rounded-2xl font-bold transition-all flex items-center justify-center gap-3"
                    >
                      <Youtube size={20} />
                      Cari di YouTube
                    </a>
                  </div>
                </div>

                {/* Relevant Image Placeholder */}
                <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200">
                  <img 
                    src={`https://picsum.photos/seed/${selectedTopic.title.replace(/\s/g, '')}/1200/600`} 
                    alt={selectedTopic.title}
                    className="w-full h-64 object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="p-4 bg-white text-xs text-slate-400 italic text-center">
                    Ilustrasi visual untuk {selectedTopic.title}
                  </div>
                </div>
              </motion.div>
            )}

            {currentView === 'quiz' && quizQuestion && (
              <motion.div 
                key="quiz"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-2xl mx-auto"
              >
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Latihan Soal</h4>
                      <h2 className="text-xl font-bold text-slate-800">{quizTopic?.title}</h2>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-black text-emerald-600">{quizScore}</span>
                      <span className="text-slate-300 mx-1">/</span>
                      <span className="text-slate-400">{quizTotal}</span>
                    </div>
                  </div>

                  <div className="mb-8 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <ChemistryMarkdown content={quizQuestion.question} />
                  </div>

                  <div className="space-y-3">
                    {quizQuestion.options.map((option: string, idx: number) => (
                      <button 
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        disabled={!!quizFeedback}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between group ${
                          quizFeedback 
                            ? idx === quizQuestion.answer 
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-700' 
                              : quizFeedback.correct === false && idx === quizQuestion.answer 
                                ? 'border-emerald-500 bg-emerald-50'
                                : 'border-slate-100 opacity-50'
                            : 'border-slate-100 hover:border-emerald-500 hover:bg-emerald-50'
                        }`}
                      >
                        <span className="font-medium">{option}</span>
                        {quizFeedback && idx === quizQuestion.answer && <CheckCircle2 className="text-emerald-500" size={20} />}
                      </button>
                    ))}
                  </div>

                  {quizFeedback && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mt-8 p-6 rounded-2xl ${quizFeedback.correct ? 'bg-emerald-50 border border-emerald-100' : 'bg-red-50 border border-red-100'}`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {quizFeedback.correct ? <Trophy className="text-emerald-600" size={20} /> : <AlertCircle className="text-red-600" size={20} />}
                        <h4 className={`font-bold ${quizFeedback.correct ? 'text-emerald-700' : 'text-red-700'}`}>
                          {quizFeedback.correct ? 'Jawaban Benar!' : 'Kurang Tepat'}
                        </h4>
                      </div>
                      <div className="text-sm leading-relaxed text-slate-600">
                        <ChemistryMarkdown content={quizFeedback.message} />
                      </div>
                      <button 
                        onClick={() => quizTopic && generateQuestion(quizTopic)}
                        className="mt-6 w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                      >
                        <RefreshCw size={18} />
                        Soal Berikutnya
                      </button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {currentView === 'chat' && (
              <motion.div 
                key="chat"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-4xl mx-auto h-[calc(100vh-180px)] flex flex-col bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden"
              >
                <div className="p-4 bg-emerald-600 text-white flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold">Asisten AI KimiaMaster</h3>
                    <p className="text-xs text-emerald-100">Siap membantu 24/7</p>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-4 rounded-2xl ${msg.role === 'user' ? 'bg-emerald-600 text-white rounded-tr-none' : 'bg-slate-100 text-slate-800 rounded-tl-none'}`}>
                        <ChemistryMarkdown content={msg.text} />
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none flex gap-1">
                        <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" />
                        <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                        <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                <div className="p-4 border-t border-slate-100 bg-slate-50">
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Tanyakan apa saja tentang kimia..."
                      className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-emerald-500 transition-all"
                    />
                    <button 
                      onClick={handleSendMessage}
                      disabled={isTyping || !inputMessage.trim()}
                      className="p-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:opacity-50 transition-all"
                    >
                      <Send size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Loading Overlay for Quiz Generation */}
      {isGeneratingQuestion && (
        <div className="fixed inset-0 z-[100] bg-white/80 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="font-bold text-slate-700">Menyiapkan Soal Latihan...</p>
            <p className="text-sm text-slate-400">AI sedang meramu pertanyaan terbaik untukmu</p>
          </div>
        </div>
      )}
    </div>
  );
}
