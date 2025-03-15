const quotes = {
    en: [
        "The only limit to our realization of tomorrow is our doubts of today.",
        "Believe you can and you're halfway there.",
        "I'm not a materialistic person, a simple hug can make me smile.",
        "I need someone to make me feel okay.",
        "Bad relationships change good people."
    ],
    hi: [
        "हमारी कल की प्राप्ति की एकमात्र सीमा हमारे आज के संदेह हैं।",
        "विश्वास करो कि तुम कर सकते हो और तुम आधे रास्ते पर हो।",
        "जो चीज वक़्त पर न मिले वो बाद में मिले ना मिले फर्क नही पड़ता।",
        "तस्वीर लेना भी जरूरी हैं जिंदगी में, आईने गुजरा हुआ वक्त नहीं बताया करते...!",
        "लोगों का खून जलाने के लिए हमारा हँसना ही काफी है।"
    ],
    pa: [
        "ਸਾਡੀ ਆਉਣ ਵਾਲੀ ਕੱਲ੍ਹ ਦੀ ਪ੍ਰਾਪਤੀ ਦੀ ਇਕੋ ਸੀਮਾ ਸਾਡੀਆਂ ਅੱਜ ਦੀਆਂ ਸ਼ੰਕਾਵਾਂ ਹਨ।",
        "ਵਿਸ਼ਵਾਸ ਕਰੋ ਕਿ ਤੁਸੀਂ ਕਰ ਸਕਦੇ ਹੋ ਅਤੇ ਤੁਸੀਂ ਅਧੇ ਰਸਤੇ 'ਤੇ ਹੋ।",
        "ਮੰਜਿਲ ਤੇ ਇਕ ਨਾਂ ਇਕ ਦਿਨ ਮਿਲ ਹੀ ਜਾੳਗੀ, ਪਰ ਸਾਥ ਕਿਸ ਕਿਸ ਨੇ ਦਿੱਤਾ, ਯਾਦ ਜ਼ਰੂਰ ਰਹੁਗਾ।",
        "ਫੁੱਲਾ ਵਰਗਾ ਸੁਭਾਅ ਏ ਫੱਕਰਾ ਦਾ, ਕੁਰਬਾਨ ਹੋ ਜਾਨੇ ਆ ਕਿਸੇ ਨੂੰ ਮਹਿਕਾਓੁਣ ਲਈ।",
        "ਘਾਟੇ ਮਿਲੇ ਜਮਾਨੇ ਤੋ ਪਰ ਦੁੱਗਣੇ ਮਿਲੇ ਤਜਰਬੇ।"
    ]
};

function generateQuote() {
    const language = document.getElementById("language").value;
    const langQuotes = quotes[language] || quotes.en; // Default to English if language is missing
    const randomIndex = Math.floor(Math.random() * langQuotes.length);
    const selectedQuote = langQuotes[randomIndex];

    document.getElementById("quote").textContent = selectedQuote;

    // Log details to the console
    console.log(`Language: ${language}`);
    console.log(`Generated Quote: ${selectedQuote}`);
}
