export interface Topic {
  id: number;
  title: string;
  indicator: string;
  content: string;
  formula?: string;
  youtubeQuery: string;
}

export const chemistryTopics: Topic[] = [
  {
    id: 1,
    title: "Kesetimbangan Kimia",
    indicator: "Menentukan pergeseran kesetimbangan untuk memaksimalkan produk pada reaksi endoterm.",
    content: "Kesetimbangan kimia terjadi ketika laju reaksi maju sama dengan laju reaksi balik. Pada reaksi endoterm ($ \\Delta H > 0 $), panas dianggap sebagai reaktan. Menurut Azas Le Chatelier, jika suhu dinaikkan, kesetimbangan akan bergeser ke arah yang menyerap kalor (endoterm) untuk meminimalkan gangguan tersebut. Oleh karena itu, untuk memaksimalkan produk pada reaksi endoterm, suhu harus ditingkatkan.",
    formula: "K_c = \\frac{[Produk]^n}{[Reaktan]^m}",
    youtubeQuery: "pergeseran kesetimbangan reaksi endoterm"
  },
  {
    id: 2,
    title: "Isomer Posisi",
    indicator: "Menentukan isomer posisi dari senyawa alkohol",
    content: "Isomer posisi adalah senyawa yang memiliki rumus molekul sama dan gugus fungsi yang sama, tetapi posisi gugus fungsi pada rantai karbon berbeda. Contohnya pada alkohol (alkanol), posisi gugus $-OH$ dapat berpindah-pindah pada rantai utama.",
    formula: "C_n H_{2n+2} O",
    youtubeQuery: "isomer posisi alkohol kimia kelas 12"
  },
  {
    id: 3,
    title: "Kimia Lingkungan",
    indicator: "Menentukan senyawa kimia (freon/CFC) yang merusak lapisan ozon.",
    content: "Klorofluorokarbon (CFC) atau Freon adalah senyawa organik yang mengandung karbon, klorin, dan fluorin. Di stratosfer, radiasi UV memecah CFC melepaskan atom klorin radikal yang sangat reaktif. Satu atom klorin dapat merusak ribuan molekul ozon ($O_3$) melalui reaksi berantai.",
    formula: "Cl^\\bullet + O_3 \\rightarrow ClO^\\bullet + O_2",
    youtubeQuery: "dampak CFC terhadap lapisan ozon"
  },
  {
    id: 4,
    title: "Tata Nama Alkohol",
    indicator: "Menentukan nama IUPAC untuk senyawa alkohol bercabang",
    content: "Aturan IUPAC untuk alkohol: 1. Tentukan rantai karbon terpanjang yang mengandung gugus $-OH$. 2. Beri nomor dari ujung yang paling dekat dengan gugus $-OH$. 3. Nama rantai utama diganti akhiran -a menjadi -ol. 4. Tentukan posisi dan nama cabang.",
    formula: "R-OH",
    youtubeQuery: "tata nama iupac alkohol bercabang"
  },
  {
    id: 5,
    title: "Termokimia",
    indicator: "Menganalisis data perubahan suhu untuk menentukan reaksi yang bersifat endoterm (penurunan suhu).",
    content: "Reaksi endoterm adalah reaksi yang menyerap kalor dari lingkungan ke sistem. Ciri khasnya adalah terjadi penurunan suhu pada lingkungan sekitar karena energi panas diserap masuk ke dalam sistem reaksi.",
    formula: "q = m \\cdot c \\cdot \\Delta T",
    youtubeQuery: "reaksi endoterm dan eksoterm termokimia"
  },
  {
    id: 6,
    title: "Sel Volta (Korosi)",
    indicator: "Menentukan logam yang dapat memberikan perlindungan katodik pada besi berdasarkan data Eo.",
    content: "Perlindungan katodik dilakukan dengan menghubungkan besi dengan logam yang memiliki potensial reduksi standar ($E^o$) lebih negatif (lebih mudah teroksidasi) daripada besi. Logam ini akan bertindak sebagai anoda dikorbankan (sacrificial anode).",
    formula: "E^o_{sel} = E^o_{katoda} - E^o_{anoda}",
    youtubeQuery: "perlindungan katodik korosi besi"
  },
  {
    id: 7,
    title: "Stokiometri Gas",
    indicator: "Menghitung volume gas hasil reaksi berdasarkan hukum Gay-Lussac (perbandingan koefisien).",
    content: "Hukum Gay-Lussac menyatakan bahwa pada suhu dan tekanan yang sama, volume gas-gas yang bereaksi dan volume gas-gas hasil reaksi berbanding sebagai bilangan bulat sederhana, yang sesuai dengan koefisien reaksinya.",
    formula: "\\frac{V_1}{n_1} = \\frac{V_2}{n_2}",
    youtubeQuery: "hukum gay lussac stoikiometri gas"
  },
  {
    id: 8,
    title: "Redoks (Biloks)",
    indicator: "Menentukan perubahan bilangan oksidasi unsur Nitrogen (N) dalam reaksi kimia.",
    content: "Bilangan oksidasi (biloks) adalah muatan relatif suatu atom dalam molekul atau ion. Nitrogen memiliki variasi biloks dari -3 (dalam $NH_3$) hingga +5 (dalam $HNO_3$). Perubahan biloks menentukan apakah unsur tersebut mengalami oksidasi atau reduksi.",
    formula: "\\text{Biloks } N \\text{ dalam } NO_3^- = +5",
    youtubeQuery: "cara menentukan biloks nitrogen"
  },
  {
    id: 9,
    title: "Reaksi Esterifikasi",
    indicator: "Menentukan hasil reaksi antara alkohol primer dengan senyawa yang dapat membentuk senyawa ester",
    content: "Esterifikasi adalah reaksi antara asam karboksilat dengan alkohol menghasilkan ester dan air dengan bantuan katalis asam (biasanya $H_2SO_4$ pekat).",
    formula: "R-COOH + R'-OH \\rightleftharpoons R-COOR' + H_2O",
    youtubeQuery: "reaksi esterifikasi asam karboksilat dan alkohol"
  },
  {
    id: 10,
    title: "Jenis Reaksi Karbon",
    indicator: "Mengidentifikasi jenis reaksi senyawa karbon (Adisi dan Eliminasi) dari persamaan reaksi yang diberikan.",
    content: "Adisi: Pemutusan ikatan rangkap menjadi ikatan tunggal (penambahan atom). Eliminasi: Pembentukan ikatan rangkap dari ikatan tunggal (pelepasan atom).",
    formula: "C=C + X_2 \\rightarrow C(X)-C(X) \\text{ (Adisi)}",
    youtubeQuery: "reaksi adisi eliminasi substitusi senyawa karbon"
  },
  {
    id: 11,
    title: "Isomer Fungsi",
    indicator: "Menentukan pasangan senyawa yang saling berisomer fungsi",
    content: "Isomer fungsi adalah senyawa dengan rumus molekul sama tetapi memiliki gugus fungsi yang berbeda. Pasangan umum: Alkohol dengan Eter ($C_n H_{2n+2} O$), Aldehid dengan Keton ($C_n H_{2n} O$), Asam Karboksilat dengan Ester ($C_n H_{2n} O_2$).",
    formula: "C_n H_{2n+2} O \\rightarrow \\text{Alkohol \\& Eter}",
    youtubeQuery: "pasangan isomer fungsi kimia"
  },
  {
    id: 12,
    title: "Biokimia (Protein)",
    indicator: "Mengidentifikasi fungsi spesifik protein dalam tubuh (enzim dan pembentuk jaringan).",
    content: "Protein memiliki berbagai fungsi vital: Enzim (biokatalisator), Struktural (keratin, kolagen), Transpor (hemoglobin), Pertahanan (antibodi), dan Pengatur (hormon).",
    formula: "H_2N-CH(R)-COOH",
    youtubeQuery: "fungsi protein dalam tubuh biokimia"
  },
  {
    id: 13,
    title: "Kegunaan Benzena",
    indicator: "Mengidentifikasi kegunaan turunan benzena sebagai pengawet dan pewarna .",
    content: "Asam benzoat dan natrium benzoat digunakan sebagai pengawet makanan. Anilin digunakan sebagai bahan dasar pembuatan zat warna diazo.",
    formula: "C_6H_5-COOH \\text{ (Asam Benzoat)}",
    youtubeQuery: "kegunaan benzena dan turunannya"
  },
  {
    id: 14,
    title: "Kegunaan Eter",
    indicator: "Menentukan senyawa yang digunakan sebagai obat bius.",
    content: "Dietil eter ($C_2H_5-O-C_2H_5$) dahulu sering digunakan sebagai obat bius (anestesi) umum, meskipun sekarang sudah banyak digantikan oleh senyawa lain yang lebih aman.",
    formula: "R-O-R'",
    youtubeQuery: "kegunaan senyawa eter"
  },
  {
    id: 15,
    title: "Senyawa Formalin",
    indicator: "Mengidentifikasi rumus kimia senyawa aldehid yang terdapat dalam formalin bahan yang digunakan untuk mengawetkan preparat Biologi",
    content: "Formalin adalah larutan formaldehida (metanal) dalam air (sekitar 37-40%). Metanal adalah aldehida paling sederhana.",
    formula: "H-CHO",
    youtubeQuery: "senyawa formalin aldehid"
  },
  {
    id: 16,
    title: "Konfigurasi Elektron",
    indicator: "Menuliskan konfigurasi elektron berdasarkan notasi unsur .",
    content: "Konfigurasi elektron mengikuti prinsip Aufbau (energi rendah ke tinggi), larangan Pauli (spin berbeda), dan aturan Hund (isi sejajar dulu).",
    formula: "1s^2 2s^2 2p^6 3s^2 ...",
    youtubeQuery: "cara menulis konfigurasi elektron spdf"
  },
  {
    id: 17,
    title: "Tata Nama Alkana",
    indicator: "Memberikan nama IUPAC yang benar untuk struktur rantai karbon alkana bercabang.",
    content: "Alkana adalah hidrokarbon jenuh. Aturan: Cari rantai terpanjang, beri nomor dari yang terdekat dengan cabang, sebutkan posisi cabang, nama cabang, lalu nama rantai utama.",
    formula: "C_n H_{2n+2}",
    youtubeQuery: "tata nama alkana bercabang iupac"
  },
  {
    id: 18,
    title: "Polimer",
    indicator: "Mengidentifikasi pasangan polimer yang keduanya merupakan polimer sintetik.",
    content: "Polimer sintetik adalah polimer buatan manusia, contohnya: PVC, Polietilena, Nilon, Dakron, Bakelit, Polistirena.",
    formula: "n(CH_2=CH_2) \\rightarrow -(CH_2-CH_2)_n-",
    youtubeQuery: "polimer alam dan polimer sintetik"
  },
  {
    id: 19,
    title: "Nama Turunan Benzena",
    indicator: "Memberikan nama senyawa turunan benzena dengan substituen nitro dan hidroksi.",
    content: "Substituen nitro ($-NO_2$) dan hidroksi ($-OH$). Jika keduanya ada, $-OH$ memiliki prioritas lebih tinggi, sehingga namanya menjadi Nitrofenol.",
    formula: "C_6H_4(OH)(NO_2)",
    youtubeQuery: "tata nama turunan benzena 2 substituen"
  },
  {
    id: 20,
    title: "Nama IUPAC Alkohol",
    indicator: "Menentukan nama yang tepat untuk struktur alkohol.",
    content: "Mirip dengan tata nama alkana, tetapi akhiran diganti -ol dan posisi $-OH$ harus disebutkan dengan nomor terkecil.",
    formula: "CH_3-CH(OH)-CH_3 \\text{ (2-propanol)}",
    youtubeQuery: "tata nama alkohol iupac"
  },
  {
    id: 21,
    title: "Nama IUPAC Ester",
    indicator: "Menentukan nama IUPAC untuk senyawa ester .",
    content: "Ester (alkil alkanoat) dinamai dengan menyebutkan gugus alkil (dari alkohol) diikuti nama alkanoat (dari asam karboksilat).",
    formula: "R-COOR'",
    youtubeQuery: "tata nama ester alkil alkanoat"
  },
  {
    id: 22,
    title: "Nama IUPAC Eter",
    indicator: "Menentukan nama senyawa eter .",
    content: "Eter (alkoksi alkana) dinamai dengan menyebutkan gugus alkoksi (rantai pendek + oksi) diikuti nama alkana (rantai panjang).",
    formula: "R-O-R'",
    youtubeQuery: "tata nama eter alkoksi alkana"
  },
  {
    id: 23,
    title: "Haloalkana",
    indicator: "Menentukan tata nama senyawa haloalkana (kloro fluoro butana) sesuai aturan prioritas.",
    content: "Haloalkana mengandung atom halogen (F, Cl, Br, I). Prioritas penomoran berdasarkan abjad halogen jika posisi setara.",
    formula: "R-X \\text{ (X = Halogen)}",
    youtubeQuery: "tata nama haloalkana iupac"
  },
  {
    id: 24,
    title: "Posisi Substituen",
    indicator: "Menentukan nama turunan benzena dengan posisi orto, meta, atau para .",
    content: "Orto (1,2), Meta (1,3), Para (1,4). Digunakan untuk benzena dengan dua substituen.",
    formula: "1,2 \\rightarrow \\text{orto}, 1,3 \\rightarrow \\text{meta}, 1,4 \\rightarrow \\text{para}",
    youtubeQuery: "posisi orto meta para benzena"
  },
  {
    id: 25,
    title: "Elektrolisis(Anode)",
    indicator: "Menentukan reaksi oksidasi tembaga di anode pada elektrolisis CuSO4 dengan elektroda Cu.",
    content: "Jika elektroda aktif (seperti Cu) digunakan di anoda, maka elektroda itu sendiri yang akan teroksidasi.",
    formula: "Cu_{(s)} \\rightarrow Cu^{2+}_{(aq)} + 2e^-",
    youtubeQuery: "elektrolisis dengan elektroda aktif"
  },
  {
    id: 26,
    title: "Penyetaraan Redoks",
    indicator: "Menentukan koefisien reaksi (A, B, C) pada penyetaraan reaksi redoks dalam suasana asam.",
    content: "Gunakan metode setengah reaksi atau biloks. Dalam suasana asam, tambahkan $H_2O$ untuk setarakan O dan $H^+$ untuk setarakan H.",
    formula: "\\text{Setarakan atom } \\rightarrow \\text{ O (tambah } H_2O) \\rightarrow \\text{ H (tambah } H^+)",
    youtubeQuery: "penyetaraan redoks metode setengah reaksi asam"
  },
  {
    id: 27,
    title: "Bentuk Molekul",
    indicator: "Meramalkan bentuk molekul senyawa NH3 berdasarkan elektron valensi.",
    content: "NH3 memiliki 5 elektron valensi pada N. 3 berikatan dengan H, 1 pasang bebas (PEB). Berdasarkan VSEPR, bentuknya adalah Piramida Trigonal.",
    formula: "AX_3E",
    youtubeQuery: "bentuk molekul NH3 piramida trigonal"
  },
  {
    id: 28,
    title: "Elektrolisis Larutan",
    indicator: "Menganalisis hasil elektrolisis larutan Na2SO4 dengan elektroda grafit (inert).",
    content: "Di katoda: air tereduksi menjadi $H_2$ dan $OH^-$. Di anoda: air teroksidasi menjadi $O_2$ dan $H^+$.",
    formula: "2H_2O + 2e^- \\rightarrow H_2 + 2OH^- \\text{ (Katoda)}",
    youtubeQuery: "elektrolisis larutan Na2SO4 elektroda inert"
  },
  {
    id: 29,
    title: "Notasi Sel Volta",
    indicator: "Menentukan notasi sel yang berlangsung spontan berdasarkan data potensial elektroda Mg dan Al.",
    content: "Logam dengan $E^o$ lebih negatif menjadi anoda (oksidasi). Notasi: Anoda | Ion || Ion | Katoda.",
    formula: "Mg | Mg^{2+} || Al^{3+} | Al",
    youtubeQuery: "cara menulis notasi sel volta"
  },
  {
    id: 30,
    title: "Karbohidrat",
    indicator: "Mengidentifikasi kegunaan karbohidrat sebagai sumber energi utama dan cadangan energi.",
    content: "Glukosa adalah sumber energi utama. Glikogen (pada hewan) dan Pati/Amilum (pada tumbuhan) adalah cadangan energi.",
    formula: "(C_6H_{10}O_5)_n",
    youtubeQuery: "fungsi karbohidrat biokimia"
  },
  {
    id: 31,
    title: "Reaksi Benzena (Nitrasi)",
    indicator: "Menentukan produk reaksi substitusi benzena.",
    content: "Nitrasi benzena menggunakan campuran $HNO_3$ pekat dan $H_2SO_4$ pekat menghasilkan nitrobenzena.",
    formula: "C_6H_6 + HNO_3 \\xrightarrow{H_2SO_4} C_6H_5-NO_2 + H_2O",
    youtubeQuery: "reaksi nitrasi benzena"
  },
  {
    id: 32,
    title: "Gugus Fungsi",
    indicator: "Mengidentifikasi urutan gugus fungsi Alkanol, Alkoksi, dan Asam Alkanoat dari struktur yang diberikan.",
    content: "Alkanol ($-OH$), Alkoksi ($-O-$), Asam Alkanoat ($-COOH$).",
    formula: "-OH, -O-, -COOH",
    youtubeQuery: "identifikasi gugus fungsi senyawa karbon"
  },
  {
    id: 33,
    title: "Larutan Penyangga",
    indicator: "Menentukan larutan buffer berdasarkan tabel pengujian pH terhadap penambahan sedikit asam/basa.",
    content: "Larutan penyangga (buffer) ditandai dengan perubahan pH yang sangat kecil (relatif tetap) saat ditambah sedikit asam, basa, atau diencerkan.",
    formula: "pH = pK_a + \\log\\left(\\frac{[Garam]}{[Asam]}\\right)",
    youtubeQuery: "ciri ciri larutan penyangga buffer"
  },
  {
    id: 34,
    title: "Struktur & Fungsi Benzena",
    indicator: "Memasangkan rumus struktur turunan benzena dengan kegunaannya yang tepat.",
    content: "Fenol (desinfektan), TNT (peledak), Aspirin (obat), Parasetamol (obat).",
    formula: "C_6H_5-OH \\text{ (Fenol)}",
    youtubeQuery: "struktur dan kegunaan turunan benzena"
  },
  {
    id: 35,
    title: "Perhitungan pH",
    indicator: "Menghitung pH larutan asam kuat H2SO4 yang diketahui Molaritasnya.",
    content: "$H_2SO_4$ adalah asam kuat valensi 2. $[H^+] = 2 \\cdot M$. $pH = -\\log[H^+]$.",
    formula: "[H^+] = n \\cdot M_a",
    youtubeQuery: "cara menghitung ph asam kuat H2SO4"
  },
  {
    id: 36,
    title: "Mekanisme Polimerisasi",
    indicator: "Menentukan pasangan polimer yang terbentuk melalui mekanisme adisi.",
    content: "Polimerisasi adisi terjadi pada monomer yang memiliki ikatan rangkap. Contoh: Polietilena, PVC, Polipropilena, Teflon.",
    formula: "n(Monomer) \\rightarrow \\text{Polimer}",
    youtubeQuery: "polimerisasi adisi dan kondensasi"
  },
  {
    id: 37,
    title: "Oksidasi Alkohol",
    indicator: "Menentukan struktur senyawa yang terbentuk dari hasil oksidasi sempurna dari alkohol primer.",
    content: "Alkohol primer dioksidasi menjadi aldehid, kemudian dioksidasi lanjut menjadi asam karboksilat.",
    formula: "R-CH_2OH \\rightarrow R-CHO \\rightarrow R-COOH",
    youtubeQuery: "oksidasi alkohol primer sekunder tersier"
  },
  {
    id: 38,
    title: "Reaksi Substitusi",
    indicator: "Mengidentifikasi contoh reaksi substitusi pada senyawa alkohol dengan PCl3.",
    content: "Gugus $-OH$ pada alkohol dapat disubstitusi oleh atom halogen menggunakan pereaksi seperti $PCl_3, PCl_5,$ atau $SOCl_2$.",
    formula: "3R-OH + PCl_3 \\rightarrow 3R-Cl + H_3PO_3",
    youtubeQuery: "reaksi substitusi alkohol dengan PCl3"
  },
  {
    id: 39,
    title: "Kegunaan Aseton",
    indicator: "Menentukan fungsi praktis senyawa aseton.",
    content: "Aseton (propanon) paling banyak digunakan sebagai pelarut organik, misalnya pembersih cat kuku (kutek).",
    formula: "CH_3-CO-CH_3",
    youtubeQuery: "kegunaan senyawa aseton"
  },
  {
    id: 40,
    title: "Hukum Faraday I",
    indicator: "Menghitung waktu penyepuhan (t) menggunakan arus listrik dan massa endapan emas",
    content: "Massa endapan berbanding lurus dengan muatan listrik yang mengalir. $w = \\frac{e \\cdot i \\cdot t}{96500}$.",
    formula: "w = \\frac{Ar}{n} \\cdot \\frac{i \\cdot t}{96500}",
    youtubeQuery: "perhitungan hukum faraday 1 penyepuhan"
  }
];
