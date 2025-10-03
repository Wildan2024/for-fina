import { useState, useEffect, useRef } from "react";

const LoveLetterWebsite = () => {
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [showHearts, setShowHearts] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);

  // Ambil nama dari URL (?to=)
  const query = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const name = query.get("to") || "Kamu";

  // Setup audio once
  useEffect(() => {
    const audio = new Audio(
      "https://cdn.pixabay.com/download/audio/2022/10/26/audio_7b42b5f348.mp3?filename=romantic-piano-loop-11381.mp3"
    );
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;

    // try autoplay (may be blocked by some browsers)
    if (isPlaying) {
      audio.play().catch(() => {});
    }

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  // respond to isPlaying changes
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const paragraphs = [
    "Selamat malam dan selamat istirahat sayang, aku mau kasih tau kmu, i'm very lucky have you!",
    "Aku suka semua tentang kmu, aku suka banget kalo kamu marahin aku, aku suka kalo kamu ingetin aku buat makan dan selalu semangatin aku dalam segala hal, aku suka banget denger suara kamu yang selalu bikin aku tenang, pokoknya aku suka semuanya tentang kamu dan kamu gaperlu tanya lagi kalo aku sayang apa nggak sama kamu karna pasti jawabannya, iyaa, aku sayang sayang bnget sama kamu.",
    "Kamu orang yang aku butuhin sebelum tidur dan bakal jadi orang yang aku butuhin setiap hari. Aku bener-bener sayang sama kamu, aku gamau kehilangan kamu, aku gamau kamu pergi dari aku, aku gamau kamu hilang tanpa kabar, aku juga gamau kita lost contact.",
    "Maafin aku selalu buat masalah, maaff gara-gara aku kita jadi sering berantem, tapi masalah apapun yang terjadi jangan pergi ya? Aku tau kok aku salah, aku gak bisa ngertiin kamu aku selalu berlebihan selalu over thinking sama kamu, karena ya aku ga pernah se sayang ini sama orang.",
    "Aku minta maaf dan jujur, aku bersyukur dengan apa yang kamu kasih ke aku tapi sebaliknya, aku selalu buat kamu kecewa yaa? Pokok nya aku minta maaf lagi dan lagi sama kamu.",
    "Makasih udah selalu buat aku bahagia dengan perhatian perhatian kecil kamu kasih, aku bener-bener beruntung ketemu kamu, aku gamau kamu pergi dan aku ga dan aku ga ikhlas kalo kamu beneran pergi, aku janji aku bakal ada terus buat kamu.",
    "Kalo kamu lagi ada bangun tolong baca masalah cerita sama aku yaa? dan jangan pernah ngerasa kalo kamu sendirian yaaa? ada aku disini, yang bakal dengerin keluh kesah kamu.",
    "Sekali lagi mau bilang makasih sama kamu udah ada terus sama aku, seberuntung ini aku ketemu kamu, i love you, and you are always a favorite place in my heart.",
    "Don't ever feel like you're alone, okay? don't feel lonely either, there's me honey, i really love you, i won't be too bored to talk like that.",
    "Good night babee, sweet dreams, tomorrow is another day that I'll be loving u more. thank u for being here another day of u being in my life, ily"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentParagraph((prev) => (prev < paragraphs.length - 1 ? prev + 1 : prev));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const heartTimer = setTimeout(() => {
      setShowHearts(true);
    }, 2000);
    return () => clearTimeout(heartTimer);
  }, []);

  const handleHeartClick = () => {
    setShowHearts(true);
    setTimeout(() => setShowHearts(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 flex items-center justify-center p-4">
      <div className="relative max-w-2xl w-full">
        {/* Hearts Animation */}
        {showHearts && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute text-red-400 text-2xl animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: `${3 + Math.random() * 2}s`,
                }}
              >
                ❤️
              </div>
            ))}
          </div>
        )}

        {/* Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 border border-rose-200 transform hover:scale-105 transition-transform duration-300">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-lg text-rose-500 mb-2 font-medium">
              💌 Surat Cinta dari Wildan untuk Fina Wulansari
            </h2>
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-4xl text-white">💖</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              Untuk {name} yang Tersayang
            </h1>
            <p className="text-rose-500 mt-2">Scroll untuk membaca pesan cinta...</p>
          </div>

          {/* Content */}
          <div className="space-y-6 max-h-96 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-rose-300 scrollbar-track-rose-100">
            {paragraphs.map((paragraph, index) => (
              <div
                key={index}
                className={`transition-all duration-500 ${
                  index <= currentParagraph ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <p className="text-gray-700 text-lg leading-relaxed font-serif">
                  {paragraph}
                </p>
                {index < paragraphs.length - 1 && (
                  <div className="w-8 h-0.5 bg-rose-200 my-4 mx-auto"></div>
                )}
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="text-center mt-8 space-x-4">
            <button
              onClick={handleHeartClick}
              className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
            >
              ❤️ Kirim Cinta
            </button>
          </div>

          <div className="text-center mt-8 pt-6 border-t border-rose-100">
            <p className="text-rose-400 text-sm">Made with love • Forever Yours</p>
          </div>
        </div>

        {/* Decorative */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-rose-200 rounded-full opacity-20"></div>
        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-pink-200 rounded-full opacity-20"></div>

        {/* Small floating music control (minimal, semi-hidden) */}
        <button
          aria-label="toggle-music"
          onClick={() => setIsPlaying(!isPlaying)}
          className="fixed z-50 right-4 bottom-4 w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
          style={{ background: isPlaying ? "linear-gradient(90deg,#fb7185,#f43f5e)" : "white", color: isPlaying ? "white" : "#fb7185" }}
        >
          {isPlaying ? "🔇" : "🎵"}
        </button>
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #fecdd3;
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #fb7185;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default LoveLetterWebsite;
