import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
const questions = [
  ['What is ByteMe CTF?', 'ByteMe CTF is a capture-the-flag cybersecurity competition built around practical problem-solving, exploration, and teamwork.'],
  ['Who can participate?', 'Participation details will be announced with registration. Keep an eye on the official event channels for eligibility information.'],
  ['How many people can be on a team?', 'Teams may contain 1–4 members.'],
  ['Do I need prior cybersecurity experience?', 'No. The challenge tracks are designed to reward curiosity as much as experience, with an approachable path for newer players.'],
  ['Is the event online or offline?', 'The event mode will be shared alongside the confirmed schedule.'],
  ['What tools are allowed?', 'Standard tools are welcome unless a specific challenge states otherwise. The final rulebook will list the full policy.'],
  ['How are winners determined?', 'Teams are ranked by flags solved and their associated challenge values, subject to the event rules.'],
  ['Where will the challenges be hosted?', 'Challenge-platform details will be shared with registered teams before the event begins.'],
]
export default function FAQ() { const [open, setOpen] = useState(0); return <section id="faq" className="faq section-shell"><div className="faq-heading reveal"><div className="section-kicker">06 / KNOW BEFORE YOU ENTER</div><h2>FREQUENTLY<br /><em>UNSEALED</em></h2></div><div className="faq-list reveal">{questions.map(([question, answer], index) => <article className={open === index ? 'faq-item open' : 'faq-item'} key={question}><h3><button aria-expanded={open === index} aria-controls={`faq-${index}`} onClick={() => setOpen(open === index ? -1 : index)}><span>{question}</span><ChevronDown size={18} /></button></h3><div id={`faq-${index}`} className="faq-answer" role="region"><p>{answer}</p></div></article>)}</div></section> }
