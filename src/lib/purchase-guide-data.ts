import type { Lang } from "./translations";

interface Step {
  number: string;
  title: string;
  color: string;
  accent: string;
  items: string[];
}

interface TaxRow {
  label: string;
  value: string;
}

interface TaxSection {
  title: string;
  badge: string;
  badgeColor: string;
  note?: string;
  rows: TaxRow[];
}

interface AnnualTax {
  label: string;
  value: string;
  example: string;
}

interface PurchaseGuideData {
  steps: Step[];
  taxSections: TaxSection[];
  annualTaxes: AnnualTax[];
}

const data: Record<Lang, PurchaseGuideData> = {
  en: {
    steps: [
      {
        number: "01",
        title: "Arrival & Initial Meeting",
        color: "bg-blue-50 border-blue-100",
        accent: "text-blue-600",
        items: [
          "Our team welcomes you at the airport upon arrival in North Cyprus.",
          "Project areas are toured and sample apartments/villas are shown.",
          "Reservation is made for the selected property (typically £2,000 – £5,000).",
        ],
      },
      {
        number: "02",
        title: "Legal Procedure",
        color: "bg-indigo-50 border-indigo-100",
        accent: "text-indigo-600",
        items: [
          "Lawyer Selection — Foreign buyers must engage an independent lawyer. The lawyer verifies the title deed, company documents, and project status with state institutions.",
          "Sales Contract — Prepared by the lawyer and signed by both parties.",
          "Land Registry Registration — The contract is entered into state records, making the buyer's right official.",
          "Council of Ministers Permit — Required for all foreign buyers. Application is filed by the lawyer; the process takes 6–12 months. The buyer may use the property during this period.",
        ],
      },
      {
        number: "03",
        title: "Construction & Payment Process",
        color: "bg-violet-50 border-violet-100",
        accent: "text-violet-600",
        items: [
          "First payment (30%) is made at the time of signing the sales contract.",
          "Remaining payments are made as construction progresses or according to an agreed installment plan.",
          "The client is regularly informed at each stage of the construction process.",
        ],
      },
      {
        number: "04",
        title: "Habitation Permit & Title Deed",
        color: "bg-emerald-50 border-emerald-100",
        accent: "text-emerald-600",
        items: [
          "Habitation Permit — Issued by the municipality once the project is completed, certifying the property is legally livable.",
          "Title Deed Transfer — After the Council of Ministers permit is granted, the title deed is officially transferred to the buyer at the Land Registry Office.",
        ],
      },
      {
        number: "05",
        title: "Usage & Subscriptions",
        color: "bg-teal-50 border-teal-100",
        accent: "text-teal-600",
        items: [
          "After the title deed and habitation permit are finalised, electricity, water, and internet subscriptions are opened in the buyer's name.",
          "The property is now fully owned by the buyer — to live in, rent out, or keep as an investment.",
        ],
      },
    ],
    taxSections: [
      {
        title: "New Project Purchase",
        badge: "New Build",
        badgeColor: "bg-blue-100 text-blue-700",
        rows: [
          { label: "VAT", value: "5% of sale price" },
          { label: "Title Deed Transfer Fee", value: "6% (3% for first-time buyers)" },
          { label: "Stamp Duty", value: "0.5% of contract price" },
          { label: "Infrastructure Contribution", value: "Transformer + connections (electricity, water, telephone). Avg. £1,500 – £3,000" },
        ],
      },
      {
        title: "Resale – Title Deed Transferred",
        badge: "Resale",
        badgeColor: "bg-amber-100 text-amber-700",
        rows: [
          { label: "VAT", value: "Not applicable (property already registered to individual)" },
          { label: "Title Deed Transfer Fee", value: "3–6% of sale price" },
          { label: "Withholding Tax", value: "Paid by seller, sometimes shared with buyer" },
          { label: "Stamp Duty", value: "0.5% of contract price" },
        ],
      },
      {
        title: "Resale – Title Deed Not Transferred",
        badge: "Special Case",
        badgeColor: "bg-orange-100 text-orange-700",
        note: "If the first buyer did not obtain the title deed, the property remains registered to the developer. In this case, the second buyer follows the same process as a new project purchase.",
        rows: [
          { label: "VAT", value: "5% of sale price" },
          { label: "Title Deed Transfer Fee", value: "3–6% of sale price" },
          { label: "Stamp Duty", value: "0.5% of contract price" },
        ],
      },
    ],
    annualTaxes: [
      { label: "Property Tax", value: "£0.1–0.2 per m² / year", example: "e.g. 100 m² apartment ≈ £10–20 / year" },
      { label: "Garbage & Cleaning Tax", value: "£50–100 / year", example: "Paid to the municipality" },
    ],
  },
  tr: {
    steps: [
      {
        number: "01",
        title: "Varış ve İlk Görüşme",
        color: "bg-blue-50 border-blue-100",
        accent: "text-blue-600",
        items: [
          "Ekibimiz, Kuzey Kıbrıs'a varışınızda havalimanında sizi karşılar.",
          "Proje alanları gezilir ve örnek daireler/villalar gösterilir.",
          "Seçilen mülk için rezervasyon yapılır (genellikle £2.000 – £5.000).",
        ],
      },
      {
        number: "02",
        title: "Hukuki Prosedür",
        color: "bg-indigo-50 border-indigo-100",
        accent: "text-indigo-600",
        items: [
          "Avukat Seçimi — Yabancı alıcıların bağımsız bir avukat tutması zorunludur. Avukat, tapu senedi, şirket belgelerini ve projenin durumunu devlet kurumlarıyla doğrular.",
          "Satış Sözleşmesi — Avukat tarafından hazırlanır ve her iki tarafça imzalanır.",
          "Tapu Dairesine Kayıt — Sözleşme devlet kayıtlarına işlenerek alıcının hakkı resmiyet kazanır.",
          "Bakanlar Kurulu İzni — Tüm yabancı alıcılar için zorunludur. Başvuru avukat tarafından yapılır; süreç 6–12 ay sürer. Alıcı bu süre zarfında mülkü kullanabilir.",
        ],
      },
      {
        number: "03",
        title: "İnşaat ve Ödeme Süreci",
        color: "bg-violet-50 border-violet-100",
        accent: "text-violet-600",
        items: [
          "İlk ödeme (%30), satış sözleşmesinin imzalanması sırasında yapılır.",
          "Kalan ödemeler inşaat ilerledikçe veya mutabık kalınan taksit planına göre gerçekleştirilir.",
          "Müşteri, inşaat sürecinin her aşamasında düzenli olarak bilgilendirilir.",
        ],
      },
      {
        number: "04",
        title: "İskân İzni ve Tapu Senedi",
        color: "bg-emerald-50 border-emerald-100",
        accent: "text-emerald-600",
        items: [
          "İskân İzni — Proje tamamlandığında belediye tarafından verilir; mülkün yasal olarak oturulabilir olduğunu belgeler.",
          "Tapu Devri — Bakanlar Kurulu izni alındıktan sonra tapu, Tapu Dairesi'nde resmi olarak alıcıya devredilir.",
        ],
      },
      {
        number: "05",
        title: "Kullanım ve Abonelikler",
        color: "bg-teal-50 border-teal-100",
        accent: "text-teal-600",
        items: [
          "Tapu ve iskân izni tamamlandıktan sonra elektrik, su ve internet abonelikleri alıcı adına açılır.",
          "Mülk artık tamamen alıcıya ait — yaşamak, kiraya vermek veya yatırım olarak tutmak için.",
        ],
      },
    ],
    taxSections: [
      {
        title: "Yeni Proje Alımı",
        badge: "Yeni Yapı",
        badgeColor: "bg-blue-100 text-blue-700",
        rows: [
          { label: "KDV", value: "Satış bedelinin %5'i" },
          { label: "Tapu Devir Ücreti", value: "%6 (ilk kez alıcılar için %3)" },
          { label: "Damga Vergisi", value: "Sözleşme bedelinin %0,5'i" },
          { label: "Altyapı Katkısı", value: "Trafo + bağlantılar (elektrik, su, telefon). Ort. £1.500 – £3.000" },
        ],
      },
      {
        title: "İkinci El – Tapu Devredilmiş",
        badge: "İkinci El",
        badgeColor: "bg-amber-100 text-amber-700",
        rows: [
          { label: "KDV", value: "Uygulanmaz (mülk zaten bireysel kayıtlı)" },
          { label: "Tapu Devir Ücreti", value: "Satış bedelinin %3–6'sı" },
          { label: "Stopaj Vergisi", value: "Satıcı tarafından ödenir, bazen alıcıyla paylaşılır" },
          { label: "Damga Vergisi", value: "Sözleşme bedelinin %0,5'i" },
        ],
      },
      {
        title: "İkinci El – Tapu Devredilmemiş",
        badge: "Özel Durum",
        badgeColor: "bg-orange-100 text-orange-700",
        note: "İlk alıcı tapuyu almamışsa mülk müteahhit adına kayıtlı kalır. Bu durumda ikinci alıcı, yeni proje alımıyla aynı süreci izler.",
        rows: [
          { label: "KDV", value: "Satış bedelinin %5'i" },
          { label: "Tapu Devir Ücreti", value: "Satış bedelinin %3–6'sı" },
          { label: "Damga Vergisi", value: "Sözleşme bedelinin %0,5'i" },
        ],
      },
    ],
    annualTaxes: [
      { label: "Emlak Vergisi", value: "m² başına yılda £0,1–0,2", example: "Örn. 100 m² daire ≈ yılda £10–20" },
      { label: "Çöp ve Temizlik Vergisi", value: "Yılda £50–100", example: "Belediyeye ödenir" },
    ],
  },
  ru: {
    steps: [
      {
        number: "01",
        title: "Прибытие и первая встреча",
        color: "bg-blue-50 border-blue-100",
        accent: "text-blue-600",
        items: [
          "Наша команда встречает вас в аэропорту по прибытии на Северный Кипр.",
          "Проводится экскурсия по проектным зонам и показ образцов квартир/вилл.",
          "Оформляется резервация выбранного объекта (как правило, £2 000 – £5 000).",
        ],
      },
      {
        number: "02",
        title: "Юридическая процедура",
        color: "bg-indigo-50 border-indigo-100",
        accent: "text-indigo-600",
        items: [
          "Выбор адвоката — Иностранные покупатели обязаны привлечь независимого адвоката. Адвокат проверяет право собственности, документы компании и статус проекта в государственных органах.",
          "Договор купли-продажи — Составляется адвокатом и подписывается обеими сторонами.",
          "Регистрация в реестре — Договор вносится в государственные записи, что придаёт праву покупателя официальный статус.",
          "Разрешение Совета министров — Требуется всем иностранным покупателям. Заявление подаётся адвокатом; процесс занимает 6–12 месяцев. В этот период покупатель вправе пользоваться недвижимостью.",
        ],
      },
      {
        number: "03",
        title: "Строительство и процесс оплаты",
        color: "bg-violet-50 border-violet-100",
        accent: "text-violet-600",
        items: [
          "Первый платёж (30%) производится при подписании договора купли-продажи.",
          "Оставшиеся платежи вносятся по мере строительства или согласно согласованному плану рассрочки.",
          "Клиент регулярно информируется о каждом этапе строительного процесса.",
        ],
      },
      {
        number: "04",
        title: "Разрешение на проживание и право собственности",
        color: "bg-emerald-50 border-emerald-100",
        accent: "text-emerald-600",
        items: [
          "Разрешение на проживание — Выдаётся муниципалитетом после завершения проекта, подтверждая законную пригодность объекта для проживания.",
          "Передача права собственности — После получения разрешения Совета министров право собственности официально переходит к покупателю в реестре.",
        ],
      },
      {
        number: "05",
        title: "Использование и подписки",
        color: "bg-teal-50 border-teal-100",
        accent: "text-teal-600",
        items: [
          "После оформления права собственности и разрешения на проживание на имя покупателя оформляются подписки на электричество, воду и интернет.",
          "Недвижимость теперь полностью принадлежит покупателю — для проживания, сдачи в аренду или хранения как инвестиции.",
        ],
      },
    ],
    taxSections: [
      {
        title: "Покупка нового проекта",
        badge: "Новостройка",
        badgeColor: "bg-blue-100 text-blue-700",
        rows: [
          { label: "НДС", value: "5% от цены продажи" },
          { label: "Пошлина за передачу права собственности", value: "6% (3% для первичных покупателей)" },
          { label: "Гербовый сбор", value: "0,5% от суммы договора" },
          { label: "Взнос на инфраструктуру", value: "Трансформатор + подключения (электр., вода, тел.). Ср. £1 500 – £3 000" },
        ],
      },
      {
        title: "Вторичная продажа — право передано",
        badge: "Вторичный рынок",
        badgeColor: "bg-amber-100 text-amber-700",
        rows: [
          { label: "НДС", value: "Не применяется (объект уже зарегистрирован на физлицо)" },
          { label: "Пошлина за передачу права собственности", value: "3–6% от цены продажи" },
          { label: "Налог у источника", value: "Оплачивается продавцом, иногда делится с покупателем" },
          { label: "Гербовый сбор", value: "0,5% от суммы договора" },
        ],
      },
      {
        title: "Вторичная продажа — право не передано",
        badge: "Особый случай",
        badgeColor: "bg-orange-100 text-orange-700",
        note: "Если первый покупатель не оформил право собственности, объект остаётся зарегистрированным на застройщика. В этом случае второй покупатель следует той же процедуре, что и при покупке нового проекта.",
        rows: [
          { label: "НДС", value: "5% от цены продажи" },
          { label: "Пошлина за передачу права собственности", value: "3–6% от цены продажи" },
          { label: "Гербовый сбор", value: "0,5% от суммы договора" },
        ],
      },
    ],
    annualTaxes: [
      { label: "Налог на недвижимость", value: "£0,1–0,2 за м² в год", example: "напр., квартира 100 м² ≈ £10–20 в год" },
      { label: "Налог на уборку мусора", value: "£50–100 в год", example: "Уплачивается в муниципалитет" },
    ],
  },
};

export function getPurchaseGuideData(lang: Lang): PurchaseGuideData {
  return data[lang];
}
