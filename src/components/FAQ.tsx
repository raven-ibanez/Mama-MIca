
const faqs: Array<{ question: string; answer: string }> = [
  {
    question: 'How much is the shipping fee?',
    answer: 'The shipping fee is $45 (around ₱2,622.15 at a rate of ₱58.21 = $1). This covers up to four (4) boxes only/up to 3 peptides + 1 BAC water.',
  },
  {
    question: 'How long does delivery usually take?',
    answer: 'The turnaround time from the factory to the Philippines is usually 2-3 weeks. Sometimes it can be shorter, sometimes longer, depending on customs and shipping flow.',
  },
  {
    question: 'Who are you partnered with?',
    answer: 'I\'ve been working with a trusted gray market vendor for a long time now. The difference if you order through me is: I guide and update you until you receive your package. You can pay easily through UnionBank, GoTyme, SeaBank, or BPI. You avoid Bitcoin or PayPal payments that usually add 5-10% handling fees. I have support groups who are all Filipinos — one that\'s open to everyone and an exclusive one for verified buyers. You are 100% guaranteed safe from scams. You\'ll have access to the site where to track your order.',
  },
  {
    question: 'Do you have a COA (Certificate of Analysis)?',
    answer: 'Yes, my vendor has up-to-date COAs which I can send upon request. I also plan to get my own COA testing by next month and will post it on my TikTok once available. Please note, testing is expensive (around $300 just for one vial of one peptide), so I need to save up. UPDATE: Our COA is already in the works. We just shipped our Tirz to the lab for third-party testing.',
  },
  {
    question: 'Are your peptides safe and do you use them yourself?',
    answer: 'Yes. I personally use all of my peptides — not just tirzepatide. I\'m into biohacking for weight loss, longevity, immune strength, beauty, hair, and skin. This is the only vendor I order from now, though I\'ve transacted with four other vendors in the past.',
  },
  {
    question: 'Do the peptides come with bacteriostatic water?',
    answer: 'No. Since you\'re sourcing directly from the factory, bacteriostatic water is not included. You\'ll need to buy it separately: 10 ml (10 vials) costs $35, 3 ml (10 vials) costs $30. Tip: Just divide the price by 10 to know the cost per vial.',
  },
  {
    question: 'Do you have these on hand?',
    answer: 'No, I don\'t keep stock for selling. The ones I have are for my personal use (weight loss, longevity, focus, skin, etc.). But if you\'d like to order, I can help you place it directly with my source so it\'s safe, no scams, and fewer extra fees.',
  },
  {
    question: 'What\'s the peptide\'s shelf life?',
    answer: 'Lyophilized (freeze-dried) peptides and bacteriostatic water usually last 18-24 months if sealed and stored properly in a cool, dry place (best in the fridge or freezer). Once reconstituted with bacteriostatic water, they are good for up to 28 days in the fridge. Always check for changes in color or clarity before use.',
  },
  {
    question: 'Do you have a minimum order?',
    answer: 'No. Whether it\'s for an individual buy or group buy, there\'s no minimum.',
  },
  {
    question: 'What if my package gets confiscated or held by customs?',
    answer: 'I will re-ship if it gets held by customs.',
  },
  {
    question: 'Kasama na po ba yung dosing guide, syringe, label at alcohol pads?',
    answer: 'No po. Even other supplies like alcohol pads are not included kasi direct kayo umuorder from the factory. Hindi nila sinasama yung mga ganung items. Usually, resellers lang ang naglalagay ng mga extras like dosing guidelines, labels, syringes or pads. Kaya kailangan niyo pong bilhin separately. That is also why it is very important to do thorough research before buying from the grey market. You can buy this from the orange app. I personally use Embecta BD Ultra-fine insulin syringe 6mm.',
  },
  {
    question: 'What are the syringe brands do you recommend?',
    answer: 'Embecta BD Ultra-fine insulin syringe 6mm, Sure Guard Insulin Syringe',
  },
  {
    question: 'How do I track my order?',
    answer: 'Once your order is placed, I\'ll send your tracking number once your order is shipped and the link to our freight forwarder\'s tracking page. We use a third-party freight forwarder, not public carriers like LBC, DHL, or UPS, so tracking will only show on the forwarder\'s site. Tracking can take 24-48 hours to update after the label is created.',
  },
  {
    question: 'Pwede po bang iba-iba ang laman ng isang box?',
    answer: 'Hindi po. Since direct from factory tayo, naka-pack ang bawat box sa 10 vials ng isang peptide para organized at madaling i-check. Pwede kayong umorder ng iba\'t ibang peptide, pero hiwa-hiwalay na box sila (tig-10 vials per box).',
  },
  {
    question: 'Will I get a COA after I receive my orders?',
    answer: 'We provide a digital COA that you can verify electronically. For example, Janoshik includes a QR code you can scan to confirm the batch. We don\'t include printed COAs because orders are direct from the factory. Printed inserts are usually added by resellers. If you need the COA file, it\'s located at COA 7/2025 & 8/2025.',
  },
  {
    question: 'Can I use sterile water?',
    answer: 'No. We do not use sterile water po for multi-use vials because bacterial growth can grow po doon. We use bacteriostatic water as it is meant for multi-use while sterile water is meant for one time use only. Kaya kapag multi-use vial (like tirzepatide, peptides, or HCG), ang ginagamit talaga is bacteriostatic water.',
  },
  {
    question: 'So, should I choose group buy or individual buy?',
    answer: 'You can buy any number of vials you want (1, 2, 3... not the whole box). Shipping is shared you only pay about ₱750, which already covers: your share of the international shipping fee and local shipping from my house to your house. UPDATE: Shipping is now ₱500 per address. Local shipping is now FREE! For individual buys, you\'ll get your own tracking number and label so you can follow your shipment yourself. The wait time is about the same usually ~2 weeks for individual and ~3 weeks for group buy. The only real difference is that group buy saves you from having to buy a whole box at once and keeps shipping costs low.',
  },
  {
    question: 'What is Mica\'s current stack?',
    answer: 'I biohack for weight loss, longevity, aesthetics, and ADHD support. Here\'s my weekly routine: Mondays - Tirzepatide (AM or mid-day), Thursdays and Sundays - Thymosin Alpha-1, Mon-Fri mornings - NAD+ (25-50 mg), Selank, GHK-Cu topical (mixed with Nature Republic aloe gel), Mon-Fri evenings - Tesamorelin, DSIP, GLOW.',
  },
  {
    question: 'Is this the same with my current Tirzepatide provider?',
    answer: 'Hey! Just to clarify, in the U.S., there are only two FDA-approved tirzepatide brands for Type 2 diabetes and obesity: Mounjaro and Zepbound. Everything else you\'ll see out there is usually sourced from China and isn\'t part of those two approved brands.',
  },
  {
    question: 'Why does shipping feel expensive? Why is the standard rate $45?',
    answer: 'In the grey market, most vendors start shipping fees at around $45. Some charge a flat rate of $70, while others have different structures. The vendor I work with partners with a freight forwarder who doesn\'t charge per batch but instead bases the cost on size and weight. This is why the total can add up. I always recommend checking and comparing with other grey market vendors so you can see what the standard shipping rates really are when buying peptides.',
  },
];

export default function FAQ(): JSX.Element {
  return (
    <main className="min-h-screen bg-gradient-purple-light">
      {/* Brand bar */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-purple-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-purple-300 bg-gradient-purple">
              <img src="/logo.png" alt="Mama Mica GLW" className="w-full h-full object-cover" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
            </div>
            <div>
              <div className="text-xl font-bold text-gradient-purple">Mama Mica GLW</div>
              <div className="text-xs text-purple-600 font-medium">Peptide FAQ</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gradient-purple mb-4">Frequently Asked Questions</h1>
          <p className="text-purple-600 text-lg">Everything you need to know about our peptide services and ordering process.</p>
        </header>

        <section className="space-y-4">
          {faqs.map((item, idx) => (
            <details key={idx} className="group rounded-2xl border-2 border-purple-200 bg-white p-5 shadow-purple">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                <span className="text-xl font-semibold text-neutral-900 group-open:text-purple-700">
                  {item.question}
                </span>
                <span className="shrink-0 rounded-full bg-purple-100 px-3 py-1 text-sm font-bold text-purple-700 group-open:bg-purple-600 group-open:text-white">
                  {idx + 1}
                </span>
              </summary>
              <div className="mt-3 text-neutral-700 leading-relaxed">
                {item.answer}
              </div>
            </details>
          ))}
        </section>

        <footer className="mt-14 text-center text-sm text-neutral-500">
          © {new Date().getFullYear()} Mama Mica GLW • Last updated {new Date().toLocaleDateString()}
        </footer>
      </div>
    </main>
  );
}


